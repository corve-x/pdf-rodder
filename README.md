# PDF Rodder — Frontend

A modern React + TypeScript frontend for **PDF Rodder**, a free PDF utility web application focused on simple document conversion and PDF merging.

The frontend provides the user interface for uploading files, tracking conversion progress, handling errors, and downloading generated PDFs.

## Features

- Convert supported files into PDF
- Merge multiple files into a single PDF
- Drag-and-drop file upload UI
- Reorder files before merging
- Upload progress tracking
- Client-side routing
- No user account required

## Supported Formats

### Convert into PDF

- DOC/DOCX/PPT/PPTX/XLS/XLSX/JPG/JPEG/PNG/TXT

### Merge into PDF

All of the above formats plus:

- PDF

The merge operation supports **2–20 files**.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React

## API Connection

The frontend communicates with the PDF Rodder backend through:

```text
VITE_API_BASE_URL
```

Create a `.env` file in the frontend root if the backend is running separately:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

For production:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

If the variable is not provided, the frontend falls back to:

```text
/api
```

## Backend API Used

### Convert

```http
POST /api/convert
```

Multipart form field:

```text
file
```

Returns:

```text
application/pdf
```

### Merge

```http
POST /api/merge
```

Multipart form field:

```text
files
```

The files are sent in the same order selected by the user.

Returns:

```text
application/pdf
```

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "status": "ok",
  "service": "pdf-rodder"
}
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the backend URL

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3. Start the development server

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Start the Vite development server.

```bash
npm run build
```

Type-check and create a production build.

```bash
npm run typecheck
```

Run TypeScript checks without starting the development server.

```bash
npm run preview
```

Preview the production build locally.

## Production Build

Run:

```bash
npm run build
```

The generated production files are placed in:

```text
dist/
```

The frontend can be deployed to platforms such as Vercel or other static hosting providers.

## Important Notes

- The frontend does not perform document conversion itself.
- Actual conversion and merging are handled by the FastAPI backend.
- The browser uploads files directly to the configured backend API.
- The frontend does not contain conversion API keys or other backend secrets.
- Upload progress is tracked in the browser using `XMLHttpRequest`.
- The backend currently limits individual uploads to 50 MB.

## License

This project is currently developed as a personal/open-source project. Add the final license here when the project license is decided.
