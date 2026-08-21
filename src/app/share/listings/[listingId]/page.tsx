import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { PropertyCard } from "@/components/PropertyCard";
import { fetchPublicListing } from "@/lib/api";
import { listingJsonLd, listingShareMetadata, organizationJsonLd } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ listingId: string }>;
}): Promise<Metadata> {
  const { listingId } = await params;
  try {
    const data = await fetchPublicListing(listingId);
    return listingShareMetadata(
      data.item,
      `/share/listings/${listingId}`,
      data.og,
      await resolveSiteUrl(),
    );
  } catch {
    return { title: "Property" };
  }
}

export default async function SharedSingleListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;
  const data = await fetchPublicListing(listingId);
  const path = `/share/listings/${listingId}`;

  return (
    <AppShell title="Property" beige>
      <JsonLd data={[organizationJsonLd(), listingJsonLd(data.item, path)]} />
      <PropertyCard item={data.item} />
    </AppShell>
  );
}
