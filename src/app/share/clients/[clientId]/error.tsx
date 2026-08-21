"use client";

import { AppShell } from "@/components/AppShell";

export default function SharedError() {
  return (
    <AppShell title="PropNetra">
      <div className="pt-10 text-center">
        <p className="text-[18px] font-bold">Could not load list</p>
        <p className="mt-2 text-[14px] text-[#8b8b8b]">
          Check that the backend is running and API_BASE_URL is set.
        </p>
      </div>
    </AppShell>
  );
}
