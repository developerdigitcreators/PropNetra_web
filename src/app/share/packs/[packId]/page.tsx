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
  return sharePackMetadata(packId, `/share/packs/${packId}`);
}

/** Client multi-listing WhatsApp pack on the share host. */
export default async function SharePackPage({ params }: PageProps) {
  const { packId } = await params;
  return (
    <PackListScreen
      packId={packId}
      path={`/share/packs/${packId}`}
      listingPath={(item) =>
        `/share/listings/${encodeURIComponent(item.shareCode || item.id)}`
      }
    />
  );
}
