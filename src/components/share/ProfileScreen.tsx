/* eslint-disable @next/next/no-img-element */
import { Inter } from "next/font/google";
import { BadgeCheck, Home, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import type { ReactNode } from "react";
import type { PublicProfile } from "@/lib/api";
import styles from "./ProfileScreen.module.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

function initialsFromName(raw: string) {
  const parts = String(raw || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "A";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/** Same as the app's formatPhoneNumber. */
function formatPhoneNumber(value?: string | null) {
  const raw = String(value || "").replace(/[^\d+]/g, "");
  if (!raw) return "";
  const digits = raw.replace(/^\+?91/, "");
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  return raw.startsWith("+") ? raw : `+91 ${raw}`;
}

/** The API's default cover is this site's own /profile-cover.png; serve it same-origin. */
function coverSrc(url?: string | null) {
  const text = String(url || "").trim();
  if (!text || /\/profile-cover\.png(\?|$)/.test(text)) return "/profile-cover.png";
  return text;
}

function telHref(value?: string | null) {
  const raw = String(value || "").replace(/[^\d+]/g, "");
  if (raw.startsWith("+")) return `tel:${raw}`;
  const digits = raw.replace(/^91(?=\d{10}$)/, "");
  return `tel:+91${digits}`;
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function PartnerBadge({ badge }: { badge: NonNullable<PublicProfile["partnerBadge"]> }) {
  const tierClass =
    badge.tier === "elite"
      ? styles.badgeElite
      : badge.tier === "pro"
        ? styles.badgePro
        : styles.badgeNetwork;
  const logo =
    badge.tier === "elite"
      ? "/badges/elite-logo.png"
      : badge.tier === "pro"
        ? "/badges/pro-logo.png"
        : null;
  return (
    <span className={`${styles.badge} ${tierClass}`}>
      {logo ? <img src={logo} alt="" className={styles.badgeLogo} /> : null}
      <span className={styles.stud} />
      <span>{badge.label}</span>
      <span className={styles.stud} />
    </span>
  );
}

type ContactRow = { icon: ReactNode; label: string; value: string; href?: string };

export function ProfileScreen({ profile }: { profile: PublicProfile }) {
  const name = String(profile.name || "").trim();
  const location = [profile.city, profile.state].filter(Boolean).join(", ");
  const phone = formatPhoneNumber(profile.contact);
  const email = String(profile.email || "").trim();
  const office = [String(profile.address || "").trim(), profile.city]
    .filter(Boolean)
    .join(", ");
  const bio = String(profile.bio || "").trim();

  const rows = [
    phone
      ? { icon: <Phone size={15} />, label: "PHONE:", value: phone, href: telHref(profile.contact) }
      : null,
    email ? { icon: <Mail size={15} />, label: "EMAIL:", value: email, href: `mailto:${email}` } : null,
    office ? { icon: <Home size={15} />, label: "OFFICE:", value: office } : null,
    bio ? { icon: <MessageSquare size={15} />, label: "BIO", value: `"${bio}"` } : null,
  ].filter(Boolean) as ContactRow[];

  return (
    <main className={`${inter.className} ${styles.page}`}>
      <img src={coverSrc(profile.coverImageUrl)} alt="" className={styles.cover} />
      {profile.partnerBadge ? (
        <div className={styles.header}>
          <PartnerBadge badge={profile.partnerBadge} />
        </div>
      ) : null}

      <div className={styles.content}>
        <section className={styles.heroCard}>
          <div className={styles.heroGlowClip}>
            <div className={styles.heroGlow} />
          </div>
          <div className={styles.avatar}>
            {profile.profilePhotoUrl ? (
              <img src={profile.profilePhotoUrl} alt={name} className={styles.avatarImage} />
            ) : (
              <span className={styles.avatarInitials}>{initialsFromName(name)}</span>
            )}
          </div>

          <div className={styles.heroInfo}>
            <div className={styles.nameRow}>
              <div className={styles.nameWrap}>
                {name ? <h1 className={styles.heroName}>{name}</h1> : null}
                {profile.verified ? (
                  <BadgeCheck size={16} className={styles.verified} aria-label="Verified" />
                ) : null}
              </div>
              {profile.linkedinUrl ? (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkedin}
                >
                  <LinkedInIcon />
                  LinkedIn Profile
                </a>
              ) : null}
            </div>
            {profile.designation ? (
              <p className={styles.designation}>{profile.designation}</p>
            ) : null}
            {profile.companyName ? (
              <p className={styles.company}>{profile.companyName}</p>
            ) : null}
            {location ? (
              <div className={styles.location}>
                <MapPin size={12} color="#FF5A00" fill="#FF5A00" stroke="#fff" />
                <span>{location}</span>
              </div>
            ) : null}
          </div>
        </section>

        {rows.length ? (
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>
              Contact <span className={styles.cardTitleAccent}>Information</span>
            </h2>
            {rows.map((row) => (
              <div key={row.label} className={styles.contactRow}>
                <span className={styles.contactIcon}>{row.icon}</span>
                <span className={styles.contactLabel}>{row.label}</span>
                {row.href ? (
                  <a href={row.href} className={styles.contactValue}>
                    {row.value}
                  </a>
                ) : (
                  <span className={styles.contactValue}>{row.value}</span>
                )}
              </div>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}
