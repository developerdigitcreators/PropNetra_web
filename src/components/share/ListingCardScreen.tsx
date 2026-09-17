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
  const origin = await resolveSiteUrl();
  try {
    const data = await fetchPublicListing(listingId, showPrice, sharerCode);
    return listingShareMetadata(
      data.item,
      withPriceQuery(path, showPrice),
      data.og,
      origin,
    );
  } catch {
    // Still emit og:image (logo) so WhatsApp does not drop the card entirely
    // when the API is briefly unavailable during scrape.
    return listingShareMetadata(
      {
        id: listingId,
        displayTitle: "Property",
        statusLabel: "",
        category: null,
        buildingType: null,
        propertyType: null,
        location: null,
        micromarket: null,
        city: null,
        locationLine: "",
        bhk: null,
        bhkLabel: null,
        area: { size: null, unit: null },
        imageUrl: null,
        savedAt: "",
        showContact: false,
      },
      withPriceQuery(path, showPrice),
      null,
      origin,
    );
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
