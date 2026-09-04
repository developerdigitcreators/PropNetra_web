import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata = {
  title: "PropNetra - High-End Residential Design",
  description: "Luxury architectural design and building services.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/apple-touch-icon.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-cropped.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "192x192", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
