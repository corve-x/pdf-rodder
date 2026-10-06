# PDF Rodder — Backend

The backend API for **PDF Rodder**, a free and self-hostable PDF conversion service built with FastAPI.

It handles document conversion, image-to-PDF conversion, text-to-PDF conversion, PDF merging, and donation QR generation.

## Tech Stack

- Python
- FastAPI
- Uvicorn
- LibreOffice
- pypdf
- Pillow
- ReportLab
- qrcode (help page)

## API Endpoints

### Convert a File

```http
POST /api/convert
```

Multipart field:

```text
file
```

Example using cURL:

```bash
curl -X POST http://localhost:8000/api/convert   -F "file=@example.docx"   --output example.pdf
```

Successful response:

```text
application/pdf
```

### Merge Files

```http
POST /api/merge
```

Multipart field:

```text
files
```

Example:

```bash
curl -X POST http://localhost:8000/api/merge   -F "files=@one.pdf"   -F "files=@two.jpg"   --output merged.pdf
```

The files are merged in the order they are received.

### Generate Donation QR

#### It currently has my UPI ID

```http
POST /api/donate/qr
```

Request:

```json
{
  "amount": 100
}
```

The endpoint returns:

- Donation amount
- UPI ID
- UPI payment URL
- Base64-encoded QR image

Allowed donation amount:

```text
₹1 – ₹100,000
```

## Local Development

### Requirements

Install:

- Python 3.12+
- LibreOffice

LibreOffice must be available on the system PATH unless `LIBREOFFICE_PATH` is configured.

### Windows

From the project root:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Configure the frontend origin:

```powershell
$env:FRONTEND_ORIGINS="http://localhost:5173"
```

Start the API:

```powershell
uvicorn app.main:app --reload --port 8000
```

The API will be available at:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

## Environment Variables

### FRONTEND_ORIGINS

Allowed frontend origins for CORS.

Example:

```env
FRONTEND_ORIGINS=http://localhost:5173
```

Production:

```env
FRONTEND_ORIGINS=https://your-frontend.vercel.app
```

Multiple origins can be separated with commas.

### LIBREOFFICE_PATH

Optional path to the LibreOffice executable.

Example:

```env
LIBREOFFICE_PATH=/usr/bin/soffice
```

On Windows this can point to the installed `soffice.exe`.

## Docker

The backend includes a Dockerfile with LibreOffice installed inside the image, so the host machine does not need LibreOffice when running the container.

Build:

```bash
docker build -t pdf-rodder-backend ./backend
```

Run:

```bash
docker run --rm   -p 8000:8000   -e FRONTEND_ORIGINS=http://localhost:5173   pdf-rodder-backend
```

On Windows PowerShell:

```powershell
docker run --rm -p 8000:8000 -e FRONTEND_ORIGINS=http://localhost:5173 pdf-rodder-backend
```

## Security / Limits

The API includes several basic protections:

- 50 MB maximum upload size per file
- Supported extension validation
- Sanitized filenames
- Temporary working directories
- Temporary directory cleanup
- Encrypted/password-protected PDFs are rejected during merge
- CORS restrictions through `FRONTEND_ORIGINS`
- No permanent file storage is required

For a public production deployment, additional protections such as rate limiting, request quotas, stronger content validation, and abuse prevention should be considered.

## Dependencies

Install Python dependencies with:

```bash
pip install -r requirements.txt
```

Main dependencies are listed in the requirements.txt file.

LibreOffice is installed separately in the Docker image because it is a system dependency rather than a Python package.

## License

This project is currently developed as a personal/open-source project. Add the final license here when the project license is decided.
