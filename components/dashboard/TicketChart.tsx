"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { Ticket } from "@/types/ticket";

export default function TicketChart({ tickets }: { tickets: Ticket[] }) {
  const openCount = tickets.filter((t) => t.status === "Open").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;

  const data = [
    { name: "Open", value: openCount, color: "#3b82f6" },       // Bright Blue
    { name: "In Progress", value: inProgressCount, color: "#f59e0b" }, // Amber/Orange
    { name: "Resolved", value: resolvedCount, color: "#10b981" },   // Emerald Green
  ];

  if (tickets.length === 0) {
    return (
         <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm h-full">
        No data available for chart.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Tickets Overview</h3>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} 
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}