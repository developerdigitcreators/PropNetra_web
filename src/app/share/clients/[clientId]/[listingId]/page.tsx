import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PropertyDetail } from "@/components/PropertyDetail";
import { fetchSharedListing } from "@/lib/api";
import { listingJsonLd, listingShareMetadata, organizationJsonLd } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clientId: string; listingId: string }>;
}): Promise<Metadata> {
  const { clientId, listingId } = await params;
  try {
    const data = await fetchSharedListing(clientId, listingId);
    return listingShareMetadata(
      data.item,
      `/share/clients/${clientId}/${listingId}`,
      data.og,
      await resolveSiteUrl(),
    );
  } catch {
    return { title: "Property" };
  }
}

export default async function SharedListingPage({
  params,
}: {
  params: Promise<{ clientId: string; listingId: string }>;
}) {
  const { clientId, listingId } = await params;
  const data = await fetchSharedListing(clientId, listingId);
  const path = `/share/clients/${clientId}/${listingId}`;

  return (
    <div className="min-h-dvh bg-[#f4f4f4]">
      <JsonLd data={[organizationJsonLd(), listingJsonLd(data.item, path)]} />
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] bg-white">
        <PropertyDetail item={data.item} backHref={`/share/clients/${clientId}`} />
      </div>
    </div>
  );
}
