# PDF Rodder — Frontend

A modern React + TypeScript frontend for **PDF Rodder**, a free PDF utility web application for document conversion and PDF merging.

## Features

- Convert supported files into PDF
- Merge multiple files into a single PDF
- Drag-and-drop file uploads
- Reorder files before merging
- Upload progress tracking
- Client-side routing
- No user account required

## Supported Formats

### Convert into PDF

DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, JPEG, PNG, TXT

### Merge into PDF

All supported conversion formats plus PDF.

**Limit:** 2–20 files per merge.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React

## Backend API

The frontend communicates with the FastAPI backend using:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Production:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

If not specified, the frontend uses `/api`.

### Endpoints

| Method | Endpoint       | Purpose               |
| ------ | -------------- | --------------------- |
| `POST` | `/api/convert` | Convert a file to PDF |
| `POST` | `/api/merge`   | Merge multiple files  |
| `GET`  | `/api/health`  | Backend health check  |

## Getting Started

```bash
npm install
npm run dev
```

The development server runs on:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

Other available commands:

```bash
npm run typecheck
npm run preview
```

## Deployment

The frontend is deployed on **Vercel** and the source code is maintained on **GitHub**.

The backend is deployed separately on **Render**.

```text
GitHub → Vercel → Frontend
             ↓
          Render → FastAPI Backend
```

The production backend URL is configured in Vercel through:

```text
VITE_API_BASE_URL
```

The frontend deployment was completed after fixing the TypeScript/build issues and updating the API service layer to communicate with the actual backend.

## Important Notes

- File conversion is handled by the FastAPI backend.
- Files are uploaded directly from the browser to the backend.
- The frontend contains no backend secrets.
- Maximum individual upload size is currently **50 MB**.

## License

Personal/open-source project. Final license to be added.
