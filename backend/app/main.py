from __future__ import annotations

import os
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Annotated

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pypdf import PdfReader, PdfWriter
from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from .donate import router as donate_router

MAX_FILE_SIZE = 50 * 1024 * 1024
MAX_MERGE_FILES = 20
SUPPORTED = {"pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "jpg", "jpeg", "png", "txt"}
OFFICE_EXTENSIONS = {"doc", "docx", "ppt", "pptx", "xls", "xlsx"}
IMAGE_EXTENSIONS = {"jpg", "jpeg", "png"}


app = FastAPI(title="PDF Rodder API", version="1.0.0")
app.include_router(donate_router)

origins = [o.strip() for o in os.getenv("FRONTEND_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def ext(name: str) -> str:
    return Path(name).suffix.lower().lstrip(".")


def safe_name(name: str) -> str:
    name = Path(name or "file").name
    return "".join(c if c.isalnum() or c in " ._-" else "_" for c in name).strip() or "file"


def libreoffice_binary() -> str:
    configured = os.getenv("LIBREOFFICE_PATH")
    if configured:
        return configured
    for candidate in ("soffice", "libreoffice"):
        found = shutil.which(candidate)
        if found:
            return found
    raise RuntimeError("LibreOffice is not installed or is not on PATH.")


def write_upload(upload: UploadFile, directory: Path) -> Path:
    filename = safe_name(upload.filename or "file")
    suffix = Path(filename).suffix.lower()
    target = directory / f"input{suffix}"
    total = 0
    with target.open("wb") as out:
        while True:
            chunk = upload.file.read(1024 * 1024)
            if not chunk:
                break
            total += len(chunk)
            if total > MAX_FILE_SIZE:
                raise HTTPException(413, detail={"message": "File exceeds the 50 MB limit.", "file": upload.filename})
            out.write(chunk)
    return target


def copy_pdf(source: Path, target: Path) -> None:
    reader = PdfReader(str(source))
    if not reader.pages:
        raise ValueError("The PDF has no pages.")
    shutil.copyfile(source, target)


def image_to_pdf(source: Path, target: Path) -> None:
    with Image.open(source) as image:
        if image.width == 0 or image.height == 0:
            raise ValueError("The image is empty.")
        image = image.convert("RGB")
        image.save(target, "PDF", resolution=150.0)


def text_to_pdf(source: Path, target: Path) -> None:
    c = canvas.Canvas(str(target), pagesize=A4)
    width, height = A4
    left, top, bottom = 42, height - 42, 42
    y = top
    c.setFont("Helvetica", 10)
    with source.open("r", encoding="utf-8", errors="replace") as f:
        for raw in f:
            line = raw.rstrip("\n\r")
            # Keep the simple converter deterministic and safe for arbitrary text.
            while len(line) > 105:
                c.drawString(left, y, line[:105])
                line = line[105:]
                y -= 14
                if y < bottom:
                    c.showPage(); c.setFont("Helvetica", 10); y = top
            c.drawString(left, y, line)
            y -= 14
            if y < bottom:
                c.showPage(); c.setFont("Helvetica", 10); y = top
    c.save()


def office_to_pdf(source: Path, output_dir: Path) -> Path:
    binary = libreoffice_binary()
    profile = Path(tempfile.mkdtemp(prefix="lo-profile-"))
    try:
        cmd = [
            binary,
            "--headless",
            "--convert-to", "pdf",
            "--outdir", str(output_dir),
            f"-env:UserInstallation=file://{profile}",
            str(source),
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
        output = output_dir / f"{source.stem}.pdf"
        if result.returncode != 0 or not output.exists():
            detail = (result.stderr or result.stdout or "LibreOffice conversion failed.").strip()
            raise RuntimeError(detail[:500])
        return output
    finally:
        shutil.rmtree(profile, ignore_errors=True)


def convert_file(source: Path, original_name: str, workdir: Path) -> Path:
    extension = ext(original_name)
    if extension not in SUPPORTED:
        raise ValueError(f"Unsupported file type: .{extension or 'unknown'}")
    target = workdir / f"{source.stem}-converted.pdf"
    if extension == "pdf":
        copy_pdf(source, target)
        return target
    if extension in IMAGE_EXTENSIONS:
        image_to_pdf(source, target)
        return target
    if extension == "txt":
        text_to_pdf(source, target)
        return target
    if extension in OFFICE_EXTENSIONS:
        generated = office_to_pdf(source, workdir)
        if generated != target:
            shutil.copyfile(generated, target)
        return target
    raise ValueError("Unsupported file type.")


def merge_pdfs(pdf_paths: list[Path], output: Path) -> None:
    writer = PdfWriter()
    for path in pdf_paths:
        reader = PdfReader(str(path))
        if reader.is_encrypted:
            raise ValueError("Encrypted/password-protected PDFs are not supported.")
        for page in reader.pages:
            writer.add_page(page)
    with output.open("wb") as f:
        writer.write(f)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "pdf-rodder"}


@app.post("/api/convert")
def convert(file: Annotated[UploadFile, File(...)]) -> FileResponse:
    filename = file.filename or "file"
    if ext(filename) not in SUPPORTED - {"pdf"}:
        raise HTTPException(415, detail={"message": "This file type is not supported.", "file": filename})
    workdir = Path(tempfile.mkdtemp(prefix="pdfrodder-"))
    try:
        source = write_upload(file, workdir)
        output = convert_file(source, filename, workdir)
        return FileResponse(output, media_type="application/pdf", filename=f"{Path(filename).stem}.pdf", background=_cleanup(workdir))
    except HTTPException:
        shutil.rmtree(workdir, ignore_errors=True)
        raise
    except Exception as exc:
        shutil.rmtree(workdir, ignore_errors=True)
        raise HTTPException(422, detail={"message": "The file could not be converted.", "file": filename}) from exc


@app.post("/api/merge")
def merge(files: Annotated[list[UploadFile], File(...)]) -> FileResponse:
    if not 2 <= len(files) <= MAX_MERGE_FILES:
        raise HTTPException(422, detail={"message": f"Merge requires 2 to {MAX_MERGE_FILES} files."})
    workdir = Path(tempfile.mkdtemp(prefix="pdfrodder-merge-"))
    try:
        pdfs: list[Path] = []
        for index, upload in enumerate(files):
            filename = upload.filename or f"file-{index + 1}"
            if ext(filename) not in SUPPORTED:
                raise HTTPException(415, detail={"message": "This file type is not supported.", "file": filename})
            source_dir = workdir / f"source-{index}"
            source_dir.mkdir()
            source = write_upload(upload, source_dir)
            pdfs.append(convert_file(source, filename, source_dir))
        output = workdir / "merged.pdf"
        merge_pdfs(pdfs, output)
        return FileResponse(output, media_type="application/pdf", filename="merged.pdf", background=_cleanup(workdir))
    except HTTPException:
        shutil.rmtree(workdir, ignore_errors=True)
        raise
    except Exception as exc:
        shutil.rmtree(workdir, ignore_errors=True)
        raise HTTPException(422, detail={"message": "One or more files could not be processed."}) from exc


def _cleanup(path: Path):
    from starlette.background import BackgroundTask
    return BackgroundTask(shutil.rmtree, path, ignore_errors=True)
