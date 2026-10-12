# PDF Rodder — Backend

The backend API for **PDF Rodder**, a free and self-hostable PDF conversion service built with FastAPI.

It handles document conversion, image-to-PDF conversion, text-to-PDF conversion, PDF merging, and donation QR generation.

## Local Development

### Requirements

Install:

- Python 3.12+

## Security / Limits

The API includes several basic protections:

- 50 MB maximum upload size per file
- Supported extension validation
- Sanitized filenames
- Temporary directory for working and cleanup
- Encrypted conversion
- No permanent file storage is required

## Dependencies

Install Python dependencies with:

```bash
pip install -r requirements.txt
```
