
from __future__ import annotations

import base64
import os
from io import BytesIO
from urllib.parse import quote, urlencode

import qrcode
from fastapi import APIRouter
from pydantic import BaseModel, Field

UPI_ID = os.getenv("UPI_ID", "myselfsathyaprasadnayakmyname-1@okhdfcbank")
UPI_NAME = os.getenv("UPI_NAME", "Satyaprasad Nayak")
NOTE = "Donation to PDF Rodder"

MIN_AMOUNT = 1
MAX_AMOUNT = 100_000

router = APIRouter(prefix="/api/donate", tags=["donate"])


class QrRequest(BaseModel):
    amount: float = Field(ge=MIN_AMOUNT, le=MAX_AMOUNT, description="Donation amount in INR")


@router.post("/qr")
def create_qr(body: QrRequest) -> dict[str, object]:
    amount = round(body.amount, 2)


    params = {
        "pa": UPI_ID,
        "pn": UPI_NAME,
        "am": f"{amount:.2f}",
        "cu": "INR",
        "tn": NOTE,
    }
    upi_url = "upi://pay?" + urlencode(params, quote_via=quote, safe="@")

    image = qrcode.make(upi_url, box_size=8, border=2)
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    qr_base64 = base64.b64encode(buffer.getvalue()).decode("ascii")

    return {
        "amount": amount,
        "upi_id": UPI_ID,
        "upi_url": upi_url,
        "qr": qr_base64,
    }
