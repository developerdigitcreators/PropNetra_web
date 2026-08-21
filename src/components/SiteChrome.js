import { headers } from "next/headers";
import ConditionalLayout from "@/components/ConditionalLayout";
import SmoothScroll from "@/components/SmoothScroll";
import { isShareHost } from "@/lib/domains";

export default async function SiteChrome({ children }) {
  const headerStore = await headers();
  const isShareSite =
    headerStore.get("x-propnetra-site") === "share" ||
    isShareHost(headerStore.get("host"));

  if (isShareSite) {
    return children;
  }

  return (
    <SmoothScroll>
      <ConditionalLayout>{children}</ConditionalLayout>
    </SmoothScroll>
  );
}
