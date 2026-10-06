const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(
    /\/$/,
    "",
  ) ?? "/api";

export const MIN_DONATION = 1;
export const MAX_DONATION = 100_000;

export interface DonationQr {
  amount: number;
  upiId: string;
  /** upi://pay?... link. Opens the user's UPI app when tapped on a phone. */
  upiUrl: string;
  /** Ready to use as an <img src>. */
  qrImage: string;
}

interface DonationQrResponse {
  amount: number;
  upi_id: string;
  upi_url: string;
  qr: string;
}

export async function createDonationQr(
  amount: number,
  signal?: AbortSignal,
): Promise<DonationQr> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/donate/qr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw error;
    throw new Error(
      "We couldn't reach the donation service. Please try again in a moment.",
    );
  }

  if (response.status === 422) {
    throw new Error(
      `Please enter an amount between ₹${MIN_DONATION} and ₹${MAX_DONATION.toLocaleString("en-IN")}.`,
    );
  }
  if (!response.ok)
    throw new Error("We couldn't create the QR code. Please try again.");

  const data = (await response.json()) as DonationQrResponse;
  return {
    amount: data.amount,
    upiId: data.upi_id,
    upiUrl: data.upi_url,
    qrImage: `data:image/png;base64,${data.qr}`,
  };
}
