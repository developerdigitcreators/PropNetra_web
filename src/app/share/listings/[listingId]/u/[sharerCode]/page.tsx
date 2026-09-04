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
    `/share/listings/${listingId}/u/${sharerCode}`,
    sharerCode,
  );
}

export default async function SharedListingBySharerPage({
  params,
  searchParams,
}: PageProps) {
  const { listingId, sharerCode } = await params;
  const showPrice = parseShowPrice((await searchParams).price);
  return (
    <ListingCardScreen
      listingId={listingId}
      showPrice={showPrice}
      path={`/share/listings/${listingId}/u/${sharerCode}`}
      sharerCode={sharerCode}
    />
  );
}
