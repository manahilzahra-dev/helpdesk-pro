"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { HelpCircle, Mail, Plus, ChevronDown,  } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How do I create a new ticket?", a: "Go to the Tickets page and click the '+ Add New Ticket' button. Fill in the subject, customer name, and priority, then submit." },
    { q: "How can I check my ticket status?", a: "You can view all your tickets on the Tickets page. The status (Open, In Progress, Resolved) is displayed next to each ticket." },
    { q: "Who can resolve my ticket?", a: "Only Admins have the permission to update ticket statuses and resolve them." },
    { q: "How do I know if my issue is high priority?", a: "High priority tickets are highlighted in red and are automatically sorted to the top of the table." },
    { q: "Can I delete a ticket?", a: "Only Admins can delete tickets. If you need a ticket removed, please contact support." },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="mx-auto w-full max-w-[1000px] px-6 py-8 md:px-10">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <HelpCircle size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Help & Support</h1>
            <p className="mt-2 text-slate-500">Find answers to common questions or get in touch with our team.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-2">Need technical help?</h3>
              <p className="text-sm text-slate-500 mb-4">Create a new support ticket and our team will get back to you.</p>
              <Link href="/tickets" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                <Plus size={16} /> Create New Ticket
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-2">Contact Us Directly</h3>
              <p className="text-sm text-slate-500 mb-4">Send us an email and we&apos;ll respond within 24 hours.</p>
              <a href="mailto:support@helpdeskpro.com" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <Mail size={16} /> support@helpdeskpro.com
              </a>
            </div>
          </div>

          {/* FAQs */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 p-6 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between text-left font-medium text-slate-800"
                  >
                    {faq.q}
                    <ChevronDown size={20} className={`transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === index && (
                    <p className="mt-3 text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}