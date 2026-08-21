import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { baseMetadata, organizationJsonLd } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";
import "../share/share.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-share-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  return baseMetadata(await resolveSiteUrl());
}

export const viewport = {
  themeColor: "#F26A21",
};

export default function BrokerListingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${sans.variable} ${sans.className} share-root antialiased`}>
      <JsonLd data={organizationJsonLd()} />
      {children}
    </div>
  );
}
