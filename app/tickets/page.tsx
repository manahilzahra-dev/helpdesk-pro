"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TicketTable from "@/components/tickets/TicketTable";
import type { Ticket } from "@/types/ticket";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Role localStorage se nikalenge
  const [userRole] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userRole") || "user";
    }
    return "user";
  });

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setIsLoaded(true);
    }
  };

    useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const res = await fetch("/api/tickets");
        const data = await res.json();
        if (isMounted) {
          setTickets(data);
        }
      } catch (error) {
        console.error("Failed to fetch tickets", error);
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddTicket = async (data: Pick<Ticket, "subject" | "customer" | "priority">) => {
    try {
      const newTicket = {
        ...data,
        status: "Open",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      };
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });
      if (res.ok) await fetchTickets();
    } catch (error) {
      console.error("Failed to add ticket", error);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Ticket["status"]) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) await fetchTickets();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDeleteTicket = async (id: string) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, { method: "DELETE" });
      if (res.ok) await fetchTickets();
    } catch (error) {
      console.error("Failed to delete ticket", error);
    }
  };

  if (!isLoaded) {
    return <div className="flex min-h-screen items-center justify-center text-slate-500">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="mx-auto w-full max-w-[1400px] px-6 py-8 md:px-10">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-slate-800">All Tickets</h1>
            <p className="mt-2 text-sm text-slate-500">Manage all support requests here.</p>
          </div>
          
          <TicketTable 
            tickets={tickets}
            userRole={userRole}
            onAddTicket={handleAddTicket}
            onUpdateStatus={handleUpdateStatus}
            onDeleteTicket={handleDeleteTicket}
          />
        </div>
      </main>
    </div>
  );
}