"use client";

import { useState } from "react";
import TicketFilters from "./TicketFilters";
import TicketForm from "./TicketForm";
import TicketViewModal from "./TicketViewModal"; // ✅ Modal Import
import type { Ticket } from "@/types/ticket";
import { Trash2, Eye } from "lucide-react"; // ✅ Sirf ek baar import kiya

type TicketWithId = Ticket & { _id?: string };

interface TicketTableProps {
  tickets: Ticket[];
  userRole: string;
  onAddTicket: (data: Pick<Ticket, "subject" | "customer" | "priority">) => void;
  onUpdateStatus: (id: string, status: Ticket["status"]) => void;
  onDeleteTicket: (id: string) => void;
}

export default function TicketTable({ tickets, userRole, onAddTicket, onUpdateStatus, onDeleteTicket }: TicketTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // ✅ Naya state selected ticket ke liye
  const [selectedTicket, setSelectedTicket] = useState<TicketWithId | null>(null);

  const handleFormSubmit = (data: Pick<Ticket, "subject" | "customer" | "priority">) => {
    onAddTicket(data);
    setIsFormOpen(false);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(search.toLowerCase()) || ticket.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || ticket.status === status;
    const matchesPriority = priority === "All" || ticket.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });
 // Sorting Logic: High > Medium > Low admin dekh pae ga
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm mt-8">
      <div className="p-5 border-b border-slate-200 bg-slate-50/50">
        <TicketFilters
          search={search} setSearch={setSearch}
          status={status} setStatus={setStatus}
          priority={priority} setPriority={setPriority}
        />
      </div>

      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Recent Tickets</h2>
          <p className="mt-1 text-sm text-slate-500">Latest customer support requests</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          + Add New Ticket
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4">Ticket</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Priority</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
              {userRole === "admin" && <th className="px-5 py-4 text-right">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
              {sortedTickets.length > 0 ? (
              sortedTickets.map((ticket, index) => {
                const t = ticket as TicketWithId;
                const ticketId = t._id || t.id || index.toString();
                const displayId = t._id ? t._id.slice(-6).toUpperCase() : t.id;

                return (
                  <tr key={ticketId} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="text-xs font-medium text-blue-600">#{displayId}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{t.subject}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{t.customer}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        t.priority === "High" ? "bg-red-100 text-red-700" : 
                        t.priority === "Medium" ? "bg-orange-100 text-orange-700" : 
                        "bg-green-100 text-green-700"
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    
                    <td className="px-5 py-4">
                      {userRole === "admin" ? (
                        <select
                          value={t.status}
                          onChange={(e) => onUpdateStatus(ticketId, e.target.value as Ticket["status"])}
                          className={`rounded-full px-3 py-1 text-xs font-semibold outline-none cursor-pointer ${
                            t.status === "Open" ? "bg-blue-100 text-blue-700" :
                            t.status === "In Progress" ? "bg-purple-100 text-purple-700" :
                            "bg-green-100 text-green-700"
                          }`}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      ) : (
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          t.status === "Open" ? "bg-blue-100 text-blue-700" :
                          t.status === "In Progress" ? "bg-purple-100 text-purple-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {t.status}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">{t.date}</td>
                    
               {/*  Ab har user ko View ka button dikhega, par Delete sirf Admin ko */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedTicket(t)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        title="View Ticket"
                      >
                        <Eye size={18} />
                      </button>

                      {userRole === "admin" && (
                        <button
                          onClick={() => onDeleteTicket(ticketId)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                          title="Delete Ticket"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={userRole === "admin" ? 6 : 5} className="px-5 py-8 text-center text-slate-500">No tickets found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <TicketForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/*  View Modal Render */}
      {selectedTicket && (
        <TicketViewModal 
          ticket={selectedTicket} 
          onClose={() => setSelectedTicket(null)} 
           userRole={userRole}
        />
      )}
    </div>
  );
}