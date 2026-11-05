import {
  Ticket as TicketIcon,
  AlertCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";

import StatsCard from "./StatsCards";
import type { Ticket } from "@/types/ticket";

interface StatsGridProps {
  tickets: Ticket[];
}

export default function StatsGrid({ tickets }: StatsGridProps) {
  // Calculations directly inside StatsGrid
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;

  const statsData = [
    {
      title: "Total Tickets",
      value: total,
      description: "All support tickets",
      icon: TicketIcon,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      title: "Open Tickets",
      value: open,
      description: "Waiting for support",
      icon: AlertCircle,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
    },
    {
      title: "In Progress",
      value: inProgress,
      description: "Currently being handled",
      icon: Clock,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      title: "Resolved",
      value: resolved,
      description: "Successfully completed",
      icon: CheckCircle2,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          iconColor={stat.iconColor}
          iconBg={stat.iconBg}
        />
      ))}
    </div>
  );
}