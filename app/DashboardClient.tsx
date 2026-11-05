'use client'
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatsGrid from "@/components/dashboard/StatsGrid";
import WelcomePanel from "@/components/dashboard/WelcomePanel";
import TicketChart from "@/components/dashboard/TicketChart";
import RecentActivity from "@/components/dashboard/RecentActivity"; // ✅ Naya Import
import type { Ticket } from "@/types/ticket";

export default function DashboardClient({ userRole }: { userRole: string }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const res = await fetch("/api/tickets");
        const data = await res.json();
        if (isMounted) setTickets(data);
      } catch (error) {
        console.error("Failed to fetch tickets", error);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  if (!isLoaded) {
    return <div className="flex min-h-screen items-center justify-center text-slate-500">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="mx-auto w-full max-w-[1400px] px-6 py-8 md:px-10">
          
          {/* 1. Welcome Panel */}
          <WelcomePanel />

          {/* 2. Stats Grid */}
          <div className="mt-7">
            <StatsGrid tickets={tickets} />
          </div>

          {/* 3. Chart & Recent Activity (Grid Layout) */}
          <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TicketChart tickets={tickets} />
            </div>
            <div className="lg:col-span-1">
               <RecentActivity tickets={tickets} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}