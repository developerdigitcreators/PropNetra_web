import { notFound } from "next/navigation";
import type {
  ApiEnvelope,
  SharedDetailResponse,
  SharedListResponse,
  SharedSingleListingResponse,
} from "./types";

function apiBase() {
  return (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:3000/api/v1"
  ).replace(/\/$/, "");
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "1",
    },
  });

  let body: ApiEnvelope<T> | null = null;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    body = null;
  }

  if (res.status === 404) notFound();
  if (!res.ok || !body?.success) {
    const message = body?.error?.message || "Unable to load this shared list.";
    throw new Error(message);
  }
  return body.data;
}

export function fetchSharedList(clientId: string, showPrice = false, limit = 100) {
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 100));
  // Do not send `price` — ClientListingsQueryDto forbids unknown fields and
  // public share uses the client's stored show_price flag.
  void showPrice;
  return getJson<SharedListResponse>(
    `/share/clients/${clientId}?limit=${safeLimit}`,
  );
}

export function fetchSharedListing(
  clientId: string,
  listingId: string,
  showPrice = false,
) {
  void showPrice;
  return getJson<SharedDetailResponse>(
    `/share/clients/${clientId}/listings/${listingId}`,
  );
}

export function fetchPublicListing(
  listingId: string,
  showPrice = false,
  sharerCode?: string | null,
) {
  void showPrice;
  const by = String(sharerCode || "").trim();
  const path = by
    ? `/share/listings/${listingId}/u/${encodeURIComponent(by)}`
    : `/share/listings/${listingId}`;
  return getJson<SharedSingleListingResponse>(path);
}
