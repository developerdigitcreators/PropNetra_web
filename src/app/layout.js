import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata = {
  title: "PropNetra - High-End Residential Design",
  description: "Luxury architectural design and building services.",
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
