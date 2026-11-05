"use client";

import {
  LayoutDashboard,
  Ticket,
  Users,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  
  const [userRole] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userRole") || "user";
    }
    return "user";
  });

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["admin", "user"] },
    { name: "Tickets", href: "/tickets", icon: Ticket, roles: ["admin", "user"] },
    { name: "Customers", href: "/customers", icon: Users, roles: ["admin"] }, 
  ];

  return (
    <>
      {/* ✅ Mobile Overlay (background dark) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 md:hidden" 
          onClick={onClose} 
        />
      )}

      {/* ✅ Sidebar (Mobile pe fixed, Desktop pe sticky) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white p-5 transition-transform duration-300
        md:sticky md:top-0 md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* Mobile Close Button */}
        <button 
          onClick={onClose} 
          className="md:hidden absolute right-4 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
            <Ticket size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">HelpDesk Pro</h1>
            <p className="text-xs text-slate-400">Support Management</p>
          </div>
        </div>

        {/* Navigation */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            if (!item.roles.includes(userRole)) return null;

            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose} // ✅ Mobile pe click karte hi band ho jaye
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="mt-auto space-y-2">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <HelpCircle size={20} />
            Help & Support
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Settings size={20} />
            Settings
          </Link>
        </div>
      </aside>
    </>
  );
}