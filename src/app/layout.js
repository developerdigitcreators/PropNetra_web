import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata = {
  title: "PropNetra - High-End Residential Design",
  description: "Luxury architectural design and building services.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=9", sizes: "48x48", type: "image/x-icon" },
      { url: "/logo-cropped.png?v=9", type: "image/png" },
      { url: "/apple-touch-icon.png?v=9", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=9", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico?v=9",
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
