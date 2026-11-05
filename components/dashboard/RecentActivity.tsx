import { CheckCircle2, Ticket } from "lucide-react";
import type { Ticket as TicketType } from "@/types/ticket";

// ✅ Type define kiya taake 'any' na lage
type TicketWithId = TicketType & { _id?: string };

export default function RecentActivity({ tickets }: { tickets: TicketType[] }) {
  // ✅ Real data se latest 4 tickets uthao
  const recentTickets = [...tickets].slice(0, 4);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-full">
      <h3 className="mb-5 text-lg font-bold text-slate-800">Recent Activity</h3>
      
      {recentTickets.length === 0 ? (
        <p className="text-sm text-slate-500">No recent activity yet.</p>
      ) : (
        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-100">
          {recentTickets.map((ticket, index) => {
            // ✅ Type assertion use kiya
            const t = ticket as TicketWithId;
            const isResolved = t.status === "Resolved";
            const ticketId = t._id || t.id || index.toString();
            
            return (
              <div key={ticketId} className="relative flex items-start gap-4">
                <div className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white ${
                  isResolved ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                }`}>
                  {isResolved ? <CheckCircle2 size={18} /> : <Ticket size={18} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {isResolved ? "Ticket resolved: " : "New ticket created: "} 
                    <span className="font-semibold text-blue-600">{t.subject}</span>
                  </p>
                  <p className="text-xs text-slate-500">By {t.customer}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}