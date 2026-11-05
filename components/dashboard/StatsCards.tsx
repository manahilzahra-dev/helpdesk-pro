import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
};

export default function StatsCard({ title, value, description, icon: Icon, iconColor, iconBg }: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className={`rounded-2xl p-4 transition-transform group-hover:scale-110 ${iconBg}`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1 rounded-md bg-green-50 px-1.5 py-0.5 text-green-600">
          <ArrowUpRight size={12} /> +2%
        </span>
        <span>{description}</span>
      </div>
    </div>
  );
}