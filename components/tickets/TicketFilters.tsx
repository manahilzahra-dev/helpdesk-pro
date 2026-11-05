
"use client";

import { Search } from "lucide-react";

type TicketFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
};

export default function TicketFilters({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
}: TicketFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
        />
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
       className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800"
      >
        <option value="All">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
       className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800"
      >
        <option value="All">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}
