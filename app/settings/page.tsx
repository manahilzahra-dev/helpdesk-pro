"use client";

import { useState, useSyncExternalStore } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { User, Mail, Shield, LogOut, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [userName] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("userName") || "User";
    return "User";
  });

  const [userEmail] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("userEmail") || "Not provided";
    return "Not provided";
  });

  const [userRole] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("userRole") || "user";
    return "user";
  });

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.clear();
    router.push("/login");
    router.refresh();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* ✅ Yahan Header bina kisi prop ke hai */}
        

        <div className="mx-auto w-full max-w-[800px] px-6 py-8 md:px-10">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Account Settings</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage your profile and preferences.</p>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Profile Information</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-xl font-bold text-white shadow-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{userName}</h3>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    userRole === "admin" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}>
                    <Shield size={12} /> {userRole === "admin" ? "Administrator" : "User"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50">
                  <User size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Full Name</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{userName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50">
                  <Mail size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Email Address</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{userEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Preferences</h2>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
                <div className="flex items-center gap-3">
                  {typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? <Moon size={20} className="text-slate-600 dark:text-slate-300"/> : <Sun size={20} className="text-slate-600 dark:text-slate-300"/>}
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Dark Mode</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Toggle theme from the header.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                <button 
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}