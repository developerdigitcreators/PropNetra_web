import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PropertyDetail } from "@/components/PropertyDetail";
import { fetchSharedListing } from "@/lib/api";
import { parseShowPrice, withPriceQuery } from "@/lib/price";
import { listingJsonLd, listingShareMetadata, organizationJsonLd } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ clientId: string; listingId: string }>;
  searchParams: Promise<{ price?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { clientId, listingId } = await params;
  const showPrice = parseShowPrice((await searchParams).price);
  try {
    const data = await fetchSharedListing(clientId, listingId, showPrice);
    return listingShareMetadata(
      data.item,
      withPriceQuery(`/share/clients/${clientId}/${listingId}`, showPrice),
      data.og,
      await resolveSiteUrl(),
    );
  } catch {
    return { title: "Property" };
  }
}

export default async function SharedListingPage({ params, searchParams }: PageProps) {
  const { clientId, listingId } = await params;
  const showPrice = parseShowPrice((await searchParams).price);
  const origin = await resolveSiteUrl();
  const data = await fetchSharedListing(clientId, listingId, showPrice);
  const path = withPriceQuery(`/share/clients/${clientId}/${listingId}`, showPrice);

  return (
    <div className="min-h-dvh bg-[#f4f4f4]">
      <JsonLd data={[organizationJsonLd(origin), listingJsonLd(data.item, path, origin)]} />
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] bg-white">
        <PropertyDetail
          item={data.item}
          backHref={withPriceQuery(`/share/clients/${clientId}`, showPrice)}
        />
      </div>
    </div>
  );
}
