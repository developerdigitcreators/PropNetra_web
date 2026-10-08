import { notFound } from "next/navigation";
import type {
  ApiEnvelope,
  SharedDetailResponse,
  SharedListResponse,
  SharedPackResponse,
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

export type SharedCompareItem = {
  id: string;
  title: string;
  image: string | null;
  location: string;
  buildingType: string | null;
  propertyType: string | null;
  price: string | null;
  projectStatus: string | null;
  possession: string | null;
  bhkTypes: string[];
  area: string | null;
  units: number | null;
  towers: number | null;
  openSpace: string | null;
  reraNumber: string | null;
  amenities: string[];
  developer: { id: string; name: string | null; logoUrl: string | null } | null;
};

export type SharedCompareResponse = {
  expired: boolean;
  items?: SharedCompareItem[];
  message?: string;
};

/** Agent-shared developer project comparison (`/v/{code}`). */
export function fetchSharedCompare(code: string) {
  return getJson<SharedCompareResponse>(
    `/share/compare/${encodeURIComponent(code)}`,
  );
}

export type SharedDeveloperProjectCard = {
  id: string;
  shareCode: string | null;
  title: string;
  imageUrl: string | null;
  location: string | null;
  priceLabel: string | null;
  status: string | null;
  developerName: string | null;
};

export type SharedDeveloperProject = {
  id: string;
  shareCode: string | null;
  title: string;
  buildingType: string | null;
  propertyType: string | null;
  location: {
    name: string | null;
    micromarket: string | null;
    city: string | null;
    label: string;
  };
  geo: { lat: number; lng: number } | null;
  header: { images: string[]; videos: string[]; youtube: string[] };
  priceRange: {
    min: number | null;
    max: number | null;
    minLabel: string | null;
    maxLabel: string | null;
  };
  projectStatus: string | null;
  possession: string | null;
  about: string | null;
  stats: {
    units: number | null;
    towers: number | null;
    openSpace: string | number | null;
    bhkTypes: string[];
    area: string | number | null;
  };
  reraNumber: string | null;
  floorPlans: {
    name: string;
    imageUrl: string | null;
    bedrooms: number | null;
    price: number | null;
    priceLabel: string | null;
    area: string | number | null;
  }[];
  gallery: { images: string[]; videos: string[]; youtube: string[] };
  amenities: { value: string; label: string; iconUrl: string | null }[];
  locationAdvantage: { tab: string; places: unknown[] }[];
  developer: {
    id: string;
    name: string | null;
    companyName: string | null;
    companyLogoUrl: string | null;
    profilePhotoUrl: string | null;
    badge: string | null;
  } | null;
  otherProjects: SharedDeveloperProjectCard[];
  similarProjects: { autoslideMs: number; items: SharedDeveloperProjectCard[] };
};

export type SharedDeveloperProjectResponse = {
  expired: boolean;
  message?: string;
  item?: SharedDeveloperProject;
  og?: { title: string; description: string; imageUrl: string | null };
};

/** Shared developer project page (`/d/{code}`). */
export function fetchSharedDeveloperProject(code: string) {
  return getJson<SharedDeveloperProjectResponse>(
    `/share/developer/${encodeURIComponent(code)}`,
  );
}

export type PublicProfile = {
  code: string;
  name: string;
  appRole: string;
  profilePhotoUrl: string | null;
  coverImageUrl: string | null;
  designation: string | null;
  companyName: string | null;
  companyLogoUrl: string | null;
  city: string | null;
  state: string | null;
  linkedinUrl: string | null;
  partnerBadge: { tier: "elite" | "pro" | "network"; label: string } | null;
  verified: boolean;
  contact: string | null;
  email: string | null;
  address: string | null;
  bio: string | null;
  associatedDevelopers?: { id: string; name: string; logoUrl: string | null }[];
  experience?: { years: number; months: number } | null;
  profileUrl: string | null;
  og: {
    title: string;
    description: string;
    imageUrl: string;
    host: string;
    messageBody: string;
    initials: string;
    siteName: string;
  };
};

/** Shared agent profile page (`/u/{code}`). */
export function fetchPublicProfile(code: string) {
  return getJson<PublicProfile>(
    `/public/profiles/${encodeURIComponent(code)}`,
  );
}

/** Multi-select own-listings share pack (client + broker WhatsApp preview). */
export function fetchSharePack(packId: string, limit = 100) {
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 100));
  return getJson<SharedPackResponse>(
    `/share/packs/${encodeURIComponent(packId)}?limit=${safeLimit}`,
  );
}
