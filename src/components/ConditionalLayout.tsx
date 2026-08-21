'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import AgentFloatingActions from "@/components/AgentFloatingActions";

// Routes that use their own full-page layout (no global Header/Footer)
const NO_LAYOUT_ROUTES = ['/agent/notifications', '/share', '/p'];

// Routes that hide only the footer
const AGENT_ROUTES = ['/agent', '/real-estate-agents'];

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();
    const hideLayout = NO_LAYOUT_ROUTES.some(route => pathname.startsWith(route));
    const isAgentRoute = AGENT_ROUTES.some(route => pathname.startsWith(route));

    if (hideLayout) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="flex-1">{children}</main>
            {!isAgentRoute && <Footer />}
            {isAgentRoute ? <AgentFloatingActions /> : <FloatingActions />}
        </>
    );
}
