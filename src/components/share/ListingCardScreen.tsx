import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { PropertyCard } from "@/components/PropertyCard";
import { fetchPublicListing } from "@/lib/api";
import { withPriceQuery } from "@/lib/price";
import { listingJsonLd, listingShareMetadata, organizationJsonLd } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";

export async function listingCardMetadata(
  listingId: string,
  showPrice: boolean,
  path: string,
  sharerCode?: string | null,
) {
  try {
    const data = await fetchPublicListing(listingId, showPrice, sharerCode);
    return listingShareMetadata(
      data.item,
      withPriceQuery(path, showPrice),
      data.og,
      await resolveSiteUrl(),
    );
  } catch {
    return { title: "Property" };
  }
}

export async function ListingCardScreen({
  listingId,
  showPrice,
  path,
  sharerCode,
}: {
  listingId: string;
  showPrice: boolean;
  path: string;
  sharerCode?: string | null;
}) {
  const origin = await resolveSiteUrl();
  const data = await fetchPublicListing(listingId, showPrice, sharerCode);
  const sharePath = withPriceQuery(path, showPrice);

  return (
    <AppShell title="Property" beige>
      <JsonLd data={[organizationJsonLd(origin), listingJsonLd(data.item, sharePath, origin)]} />
      <PropertyCard item={data.item} sharePath={sharePath} />
    </AppShell>
  );
}
