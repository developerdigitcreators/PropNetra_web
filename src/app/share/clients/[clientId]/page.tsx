import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { GroupedListings } from "@/components/GroupedListings";
import { JsonLd } from "@/components/JsonLd";
import { fetchSharedList } from "@/lib/api";
import { parseShowPrice, withPriceQuery } from "@/lib/price";
import { clientListMetadata, organizationJsonLd } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ clientId: string }>;
  searchParams: Promise<{ price?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { clientId } = await params;
  const showPrice = parseShowPrice((await searchParams).price);
  const origin = await resolveSiteUrl();
  try {
    const data = await fetchSharedList(clientId, showPrice);
    return clientListMetadata({
      clientName: data.clientName,
      total: data.total,
      path: withPriceQuery(`/share/clients/${clientId}`, showPrice),
      og: data.og,
      origin,
    });
  } catch {
    return { title: "Shared properties" };
  }
}

export default async function SharedClientPage({ params, searchParams }: PageProps) {
  const { clientId } = await params;
  const showPrice = parseShowPrice((await searchParams).price);
  const origin = await resolveSiteUrl();
  const data = await fetchSharedList(clientId, showPrice);
  const groups = data.groups?.length
    ? data.groups
    : [
        {
          key: "all",
          label: "All",
          count: data.items.length,
          items: data.items,
        },
      ];

  return (
    <AppShell title="Saved Properties" beige>
      <JsonLd data={organizationJsonLd(origin)} />
      <p className="mb-3 text-[15px] font-semibold text-[#111]">
        {data.clientName}
        <span className="ml-2 text-[13px] font-normal text-[#8b8b8b]">
          · {data.total} {data.total === 1 ? "property" : "properties"}
        </span>
      </p>
      <GroupedListings clientId={clientId} groups={groups} showPrice={showPrice} />
    </AppShell>
  );
}
