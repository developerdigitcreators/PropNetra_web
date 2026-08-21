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

export function fetchSharedList(clientId: string, showPrice = false) {
  return getJson<SharedListResponse>(
    `/share/clients/${clientId}?limit=100&price=${showPrice ? "1" : "0"}`,
  );
}

export function fetchSharedListing(
  clientId: string,
  listingId: string,
  showPrice = false,
) {
  return getJson<SharedDetailResponse>(
    `/share/clients/${clientId}/listings/${listingId}?price=${showPrice ? "1" : "0"}`,
  );
}

export function fetchPublicListing(listingId: string, showPrice = false) {
  return getJson<SharedSingleListingResponse>(
    `/share/listings/${listingId}?price=${showPrice ? "1" : "0"}`,
  );
}
