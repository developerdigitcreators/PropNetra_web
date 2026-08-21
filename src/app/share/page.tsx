import { redirect } from "next/navigation";
import { DEFAULT_SHARE_CLIENT_ID } from "@/lib/domains";

export default function ShareHomePage() {
  redirect(`/share/clients/${DEFAULT_SHARE_CLIENT_ID}?og=3&n=5`);
}
