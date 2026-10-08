import type { Metadata } from "next";
import { ProfileScreen } from "@/components/share/ProfileScreen";
import { fetchPublicProfile } from "@/lib/api";
import { profileMetadata } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const origin = await resolveSiteUrl();
  try {
    const profile = await fetchPublicProfile(code);
    return profileMetadata({
      og: profile.og,
      fallbackDescription:
        [profile.designation, profile.companyName].filter(Boolean).join(" · ") ||
        "PropNetra profile",
      path: `/u/${code}`,
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
