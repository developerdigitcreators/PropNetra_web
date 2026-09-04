import type { Metadata } from "next";
import { ListingCardScreen, listingCardMetadata } from "@/components/share/ListingCardScreen";
import { parseShowPrice } from "@/lib/price";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ listingId: string; sharerCode: string }>;
  searchParams: Promise<{ price?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { listingId, sharerCode } = await params;
  const showPrice = parseShowPrice((await searchParams).price);
  return listingCardMetadata(
    listingId,
    showPrice,
    `/p/${listingId}/u/${sharerCode}`,
    sharerCode,
  );
}

/** Broker share of an agent's own listing — OG uses the sharer's companyName + bio. */
export default async function BrokerListingBySharerPage({
  params,
  searchParams,
}: PageProps) {
  const { listingId, sharerCode } = await params;
  const showPrice = parseShowPrice((await searchParams).price);
  return (
    <ListingCardScreen
      listingId={listingId}
      showPrice={showPrice}
      path={`/p/${listingId}/u/${sharerCode}`}
      sharerCode={sharerCode}
    />
  );
}
