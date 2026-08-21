import { AppShell } from "@/components/AppShell";

export default function ShareHomePage() {
  return (
    <AppShell
      title={
        <>
          Prop<span className="text-[#f26a21]">Netra</span>
        </>
      }
    >
      <div className="pt-10 text-center">
        <p className="text-[18px] font-bold text-[#111]">Open a shared list</p>
        <p className="mt-2 text-[14px] leading-relaxed text-[#8b8b8b]">
          This page shows properties an agent saved for a client. Use the link they
          sent — it looks like{" "}
          <span className="font-medium text-[#555]">/share/clients/…</span>
        </p>
      </div>
    </AppShell>
  );
}
