import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { PropertyCard } from "@/components/PropertyCard";
import { fetchPublicListing } from "@/lib/api";
import { parseShowPrice, withPriceQuery } from "@/lib/price";
import { listingJsonLd, listingShareMetadata, organizationJsonLd } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ listingId: string }>;
  searchParams: Promise<{ price?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { listingId } = await params;
  const showPrice = parseShowPrice((await searchParams).price);
  try {
    const data = await fetchPublicListing(listingId, showPrice);
    return listingShareMetadata(
      data.item,
      withPriceQuery(`/share/listings/${listingId}`, showPrice),
      data.og,
      await resolveSiteUrl(),
    );
  } catch {
    return { title: "Property" };
  }
}

export default async function SharedSingleListingPage({ params, searchParams }: PageProps) {
  const { listingId } = await params;
  const showPrice = parseShowPrice((await searchParams).price);
  const origin = await resolveSiteUrl();
  const data = await fetchPublicListing(listingId, showPrice);
  const path = withPriceQuery(`/share/listings/${listingId}`, showPrice);

  return (
    <AppShell title="Property" beige>
      <JsonLd data={[organizationJsonLd(origin), listingJsonLd(data.item, path, origin)]} />
      <PropertyCard item={data.item} sharePath={path} />
    </AppShell>
  );
}
