import type { Metadata } from "next";
import {
  PackListScreen,
  sharePackMetadata,
} from "@/components/share/PackListScreen";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ packId: string; sharerCode: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { packId, sharerCode } = await params;
  return sharePackMetadata(
    packId,
    `/p/packs/${packId}/u/${encodeURIComponent(sharerCode)}`,
  );
}

/** Broker pack share with sharer code in the path (referral / OG URL). */
export default async function BrokerPackBySharerPage({ params }: PageProps) {
  const { packId, sharerCode } = await params;
  return (
    <PackListScreen
      packId={packId}
      path={`/p/packs/${packId}/u/${encodeURIComponent(sharerCode)}`}
      listingPath={(item) =>
        `/p/${encodeURIComponent(item.shareCode || item.id)}/u/${encodeURIComponent(sharerCode)}`
      }
      title="Shared Properties"
    />
  );
}
