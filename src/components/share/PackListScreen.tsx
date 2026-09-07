import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { GroupedListings } from "@/components/GroupedListings";
import { JsonLd } from "@/components/JsonLd";
import { fetchSharePack } from "@/lib/api";
import { clientListMetadata, organizationJsonLd } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";
import type { SharedPropertyCard } from "@/lib/types";

export const dynamic = "force-dynamic";

type PackScreenProps = {
  packId: string;
  /** Public path used for canonical + OG url (client or broker). */
  path: string;
  /** How card taps open a single listing. */
  listingPath: (item: SharedPropertyCard) => string;
  title?: string;
};

export async function sharePackMetadata(
  packId: string,
  path: string,
): Promise<Metadata> {
  const origin = await resolveSiteUrl();
  try {
    const data = await fetchSharePack(packId);
    const label =
      data.agent?.companyName ||
      data.agent?.name ||
      data.og?.title ||
      "Shared properties";
    return clientListMetadata({
      clientName: label,
      total: data.total,
      path,
      og: data.og,
      origin,
    });
  } catch {
    return { title: "Shared properties" };
  }
}

export async function PackListScreen({
  packId,
  path: _path,
  listingPath,
  title = "Shared Properties",
}: PackScreenProps) {
  void _path;
  const origin = await resolveSiteUrl();
  const data = await fetchSharePack(packId);
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
  const heading =
    data.agent?.companyName ||
    data.agent?.name ||
    data.og?.title ||
    "Properties";

  return (
    <AppShell title={title} beige>
      <JsonLd data={organizationJsonLd(origin)} />
      <p className="mb-3 text-[15px] font-semibold text-[#111]">
        {heading}
        <span className="ml-2 text-[13px] font-normal text-[#8b8b8b]">
          · {data.total} {data.total === 1 ? "property" : "properties"}
        </span>
      </p>
      <GroupedListings
        clientId={packId}
        groups={groups}
        showPrice={data.showPrice !== false}
        hrefForItem={(item) => listingPath(item)}
      />
    </AppShell>
  );
}
