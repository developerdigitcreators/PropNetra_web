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
  searchParams: Promise<{ price?: string; og?: string; n?: string }>;
};

function parseLimit(raw?: string | string[] | null) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 100;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { clientId } = await params;
  const query = await searchParams;
  const showPrice = parseShowPrice(query.price);
  const origin = await resolveSiteUrl();
  try {
    const data = await fetchSharedList(clientId, showPrice, parseLimit(query.n));
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
  const query = await searchParams;
  const showPrice = parseShowPrice(query.price);
  const origin = await resolveSiteUrl();
  const data = await fetchSharedList(clientId, showPrice, parseLimit(query.n));
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
