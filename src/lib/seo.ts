import type { Metadata } from "next";
import type { ShareOg, SharedPropertyCard, SharedPropertyDetail } from "./types";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_LOGO_PATH,
  SITE_URL,
  absoluteImageUrl,
  proxiedOgImageUrl,
  siteLogoUrl,
  siteUrl,
} from "./site";

function listingDescription(item: SharedPropertyCard) {
  return [
    item.propertyType,
    item.locationLine,
    item.areaLabel,
    item.furnishing,
    item.statusLabel,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function baseMetadata(origin = SITE_URL): Metadata {
  const logo = siteLogoUrl(origin);
  return {
    metadataBase: new URL(origin),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_TAGLINE,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: origin }],
    keywords: ["PropNetra", "property", "real estate", "India"],
    icons: {
      icon: [{ url: SITE_LOGO_PATH, type: "image/png" }],
      apple: [{ url: SITE_LOGO_PATH, type: "image/png" }],
      shortcut: SITE_LOGO_PATH,
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_TAGLINE,
      url: origin,
      locale: "en_IN",
    },
    twitter: {
      card: "summary",
      title: SITE_NAME,
      description: SITE_TAGLINE,
    },
    other: {
      "og:logo": logo,
    },
  };
}

export function listingShareMetadata(
  item: SharedPropertyCard | SharedPropertyDetail,
  path: string,
  og?: ShareOg | null,
  origin = SITE_URL,
): Metadata {
  const title = og?.title || item.displayTitle || "Property";
  const description =
    og?.description ||
    [item.locationLine, item.priceLabel, "Click more"].filter(Boolean).join(" | ") ||
    SITE_TAGLINE;
  const url = siteUrl(path, origin);
  const image = proxiedOgImageUrl(og?.imageUrl, origin);
  const hasImage = !!image;

  return {
    title,
    description,
    metadataBase: new URL(origin),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: "en_IN",
      images: hasImage
        ? [{
            url: image as string,
            secureUrl: image as string,
            width: 1200,
            height: 630,
            alt: title,
            type: "image/jpeg",
          }]
        : undefined,
    },
    twitter: {
      card: hasImage ? "summary_large_image" : "summary",
      title,
      description,
      images: hasImage && image ? [image] : undefined,
    },
  };
}

export function clientListMetadata(args: {
  clientName: string;
  total: number;
  path: string;
  og?: ShareOg | null;
  origin?: string;
}): Metadata {
  const origin = args.origin || SITE_URL;
  const title = args.og?.title || `${args.clientName}'s properties`;
  const description =
    args.og?.description ||
    `${args.total} ${args.total === 1 ? "property" : "properties"} | Click more`;
  const url = siteUrl(args.path, origin);
  const image = proxiedOgImageUrl(args.og?.imageUrl, origin);
  const hasImage = !!image;

  return {
    title,
    description,
    metadataBase: new URL(origin),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: "en_IN",
      images: hasImage
        ? [{
            url: image as string,
            secureUrl: image as string,
            width: 1200,
            height: 630,
            alt: title,
            type: "image/jpeg",
          }]
        : undefined,
    },
    twitter: {
      card: hasImage ? "summary_large_image" : "summary",
      title,
      description,
      images: hasImage && image ? [image] : undefined,
    },
  };
}

export function organizationJsonLd(origin = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: origin,
    logo: siteLogoUrl(origin),
  };
}

export function listingJsonLd(
  item: SharedPropertyCard | SharedPropertyDetail,
  path: string,
  origin = SITE_URL,
) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: item.displayTitle,
    description: listingDescription(item),
    url: siteUrl(path, origin),
    image: absoluteImageUrl(item.imageUrl, origin),
    address: item.locationLine || undefined,
    publisher: organizationJsonLd(origin),
  };
}
