"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {  Mail, Shield, Calendar, Loader2 } from "lucide-react";

// ✅ User ka type define kiya
interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function CustomersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users. Make sure you are an Admin.");
        }
        const data = await res.json();
        if (isMounted) setUsers(data);
      } catch (err) {
        if (isMounted) setError((err as Error).message);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    };
    fetchUsers();
    return () => { isMounted = false; };
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="mx-auto w-full max-w-[1400px] px-6 py-8 md:px-10">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
            <p className="mt-2 text-sm text-slate-500">Manage all registered users in your workspace.</p>
          </div>

          {error ? (
            <div className="rounded-xl bg-red-50 p-4 text-red-600 border border-red-200">
              {error}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Joined On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-sm font-bold text-white shadow-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-slate-800">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-slate-400" />
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                            user.role === "admin" 
                              ? "bg-purple-100 text-purple-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            <Shield size={12} />
                            {user.role === "admin" ? "Admin" : "User"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-slate-400" />
                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric"
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}