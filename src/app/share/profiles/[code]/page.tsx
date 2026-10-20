import type { Metadata } from "next";
import { ProfileScreen } from "@/components/share/ProfileScreen";
import { fetchPublicProfile } from "@/lib/api";
import { profileMetadata } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ v?: string | string[] }>;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const { v } = await searchParams;
  const version = (Array.isArray(v) ? v[0] : v)?.replace(/[^A-Za-z0-9_-]/g, "");
  const origin = await resolveSiteUrl();
  try {
    const profile = await fetchPublicProfile(code);
    return profileMetadata({
      og: profile.og,
      fallbackDescription: profile.designation || "PropNetra profile",
      // WhatsApp caches by og:url; keep ?v= so a new version gets a fresh preview.
      path: version ? `/u/${code}?v=${version}` : `/u/${code}`,
      origin,
    });
  } catch {
    return { title: "Profile" };
  }
}

/** Public agent profile shared from the app (`/u/{code}`). */
export default async function ShareProfilePage({ params }: PageProps) {
  const { code } = await params;
  const profile = await fetchPublicProfile(code);
  return <ProfileScreen profile={profile} />;
}
