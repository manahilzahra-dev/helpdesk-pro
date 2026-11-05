"use client";

import { X, Calendar, User, AlertCircle, Clock, CheckCircle2, Star } from "lucide-react";
import type { Ticket } from "@/types/ticket";
import { useState } from "react";

type TicketWithId = Ticket & { _id?: string; rating?: number };

interface TicketViewModalProps {
  ticket: TicketWithId | null;
  onClose: () => void;
  userRole: string; // ✅ Naya prop: Role check karne ke liye
}

export default function TicketViewModal({ ticket, onClose, userRole }: TicketViewModalProps) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [currentRating, setCurrentRating] = useState(ticket?.rating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!ticket) return null;

  const displayId = ticket._id ? ticket._id.slice(-6).toUpperCase() : ticket.id;
  const isResolved = ticket.status === "Resolved";

  const handleRatingSubmit = async (rating: number) => {
    setCurrentRating(rating);
    setIsSubmitting(true);
    try {
      await fetch(`/api/tickets/${ticket._id || ticket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
    } catch (error) {
      console.error("Failed to submit rating", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h3 className="text-lg font-bold text-slate-800">Ticket Details</h3>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-xs font-semibold text-blue-600 mb-1">#{displayId}</p>
            <h4 className="text-xl font-bold text-slate-800">{ticket.subject}</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><User size={12}/> Customer</p>
              <p className="text-sm font-semibold text-slate-800">{ticket.customer}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Calendar size={12}/> Date</p>
              <p className="text-sm font-semibold text-slate-800">{ticket.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              ticket.status === "Open" ? "bg-blue-100 text-blue-700" :
              ticket.status === "In Progress" ? "bg-purple-100 text-purple-700" :
              "bg-green-100 text-green-700"
            }`}>
              {ticket.status === "Open" ? <AlertCircle size={14}/> : ticket.status === "In Progress" ? <Clock size={14}/> : <CheckCircle2 size={14}/>}
              {ticket.status}
            </div>
            <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              ticket.priority === "High" ? "bg-red-100 text-red-700" : 
              ticket.priority === "Medium" ? "bg-orange-100 text-orange-700" : 
              "bg-green-100 text-green-700"
            }`}>
              {ticket.priority} Priority
            </div>
          </div>

          {/* ✅ Feedback Section */}
          {isResolved && (
            <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-center">
              
              {/* Agar USER hai, toh rating de sake */}
              {userRole === "user" ? (
                <>
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    {currentRating > 0 ? "Your Rating" : "How was your support experience?"}
                  </p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => handleRatingSubmit(star)}
                        disabled={isSubmitting}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          size={28}
                          className={`${
                            star <= (hoveredStar || currentRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {currentRating > 0 && (
                    <p className="mt-2 text-xs font-medium text-green-600">Thank you for your feedback!</p>
                  )}
                </>
              ) : (
                /* Agar ADMIN hai, toh sirf user ki di hui rating dekhe */
                <>
                  <p className="mb-2 text-sm font-semibold text-slate-700">Customer Rating</p>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        className={`${
                          star <= (ticket.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  {ticket.rating && ticket.rating > 0 ? (
                    <p className="mt-2 text-xs font-medium text-slate-500">User gave {ticket.rating} stars.</p>
                  ) : (
                    <p className="mt-2 text-xs font-medium text-slate-500">No rating given yet.</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 p-4 flex justify-end">
          <button onClick={onClose} className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-900">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}