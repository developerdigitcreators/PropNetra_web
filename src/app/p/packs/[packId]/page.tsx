import type { Metadata } from "next";
import {
  PackListScreen,
  sharePackMetadata,
} from "@/components/share/PackListScreen";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ packId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { packId } = await params;
  return sharePackMetadata(packId, `/k/${packId}`);
}

/** Broker multi-listing WhatsApp pack on propnetra.devsol.in. */
export default async function BrokerPackPage({ params }: PageProps) {
  const { packId } = await params;
  return (
    <PackListScreen
      packId={packId}
      path={`/k/${packId}`}
      listingPath={(item) =>
        `/p/${encodeURIComponent(item.shareCode || item.id)}`
      }
      title="Shared Properties"
    />
  );
}
