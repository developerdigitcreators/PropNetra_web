import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { GroupedListings } from "@/components/GroupedListings";
import { JsonLd } from "@/components/JsonLd";
import { fetchSharedList } from "@/lib/api";
import { clientListMetadata, organizationJsonLd } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clientId: string }>;
}): Promise<Metadata> {
  const { clientId } = await params;
  try {
    const data = await fetchSharedList(clientId);
    return clientListMetadata({
      clientName: data.clientName,
      total: data.total,
      path: `/share/clients/${clientId}`,
      og: data.og,
      origin: await resolveSiteUrl(),
    });
  } catch {
    return { title: "Shared properties" };
  }
}

export default async function SharedClientPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const data = await fetchSharedList(clientId);
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
      <JsonLd data={organizationJsonLd()} />
      <p className="mb-3 text-[15px] font-semibold text-[#111]">
        {data.clientName}
        <span className="ml-2 text-[13px] font-normal text-[#8b8b8b]">
          · {data.total} {data.total === 1 ? "property" : "properties"}
        </span>
      </p>
      <GroupedListings clientId={clientId} groups={groups} />
    </AppShell>
  );
}
