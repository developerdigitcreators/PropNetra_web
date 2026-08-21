import { AppShell } from "@/components/AppShell";

export default function BrokerListingNotFound() {
  return (
    <AppShell title="PropNetra">
      <div className="pt-10 text-center">
        <p className="text-[18px] font-bold">Property not found</p>
        <p className="mt-2 text-[14px] text-[#8b8b8b]">
          This shared link is invalid or the listing is no longer live.
        </p>
      </div>
    </AppShell>
  );
}
