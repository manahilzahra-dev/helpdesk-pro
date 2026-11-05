
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {Ticket} from "@/types/ticket"

type TicketFormProps = {
  onClose: () => void;
  onSubmit: (data: Pick<Ticket, "subject" | "customer" | "priority">) => void;
};

export default function TicketForm({ onClose, onSubmit }: TicketFormProps) {
  const [subject, setSubject] = useState("");
  const [customer, setCustomer] = useState("");
  const [priority, setPriority] = useState("Medium");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            Create New Ticket
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

      <form
  onSubmit={(e) => {
    e.preventDefault();

    if (!subject.trim() || !customer.trim()) {
      return;
    }

    onSubmit({
      subject: subject.trim(),
      customer: customer.trim(),
      priority: priority as Ticket["priority"],
    });
  }}
  className="space-y-4"
>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Ticket Subject
            </label>

            <input
              value={subject} required
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter ticket subject"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Customer Name
            </label>

            <input
              value={customer} required
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="Enter customer name"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
