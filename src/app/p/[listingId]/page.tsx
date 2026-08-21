import type { Metadata } from "next";
import { ListingCardScreen, listingCardMetadata } from "@/components/share/ListingCardScreen";
import { parseShowPrice } from "@/lib/price";

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
  return listingCardMetadata(listingId, showPrice, `/p/${listingId}`);
}

/** Broker share of an agent's own listing on propnetra.devsol.in. Same card as /share/listings. */
export default async function BrokerListingPage({ params, searchParams }: PageProps) {
  const { listingId } = await params;
  const showPrice = parseShowPrice((await searchParams).price);
  return (
    <ListingCardScreen
      listingId={listingId}
      showPrice={showPrice}
      path={`/p/${listingId}`}
    />
  );
}
