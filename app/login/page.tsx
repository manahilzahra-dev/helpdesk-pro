"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ticket, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // ✅ Splash Screen ke liye state
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 1.5 second baad splash screen hata do
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Login failed");
        return;
      }

      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userRole", data.user.role);

      router.push("/");
      router.refresh();
    } catch {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Splash Screen Render
  if (showSplash) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 animate-in fade-in duration-500">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-500/50 mb-6 animate-bounce">
          <Ticket size={40} />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-widest animate-pulse">
          HelpDesk Pro
        </h1>
      </div>
    );
  }

  // ✅ Actual Login Form
  return (
    <div className="flex min-h-screen bg-slate-950">
      
      {/* Left Side: Branding (Laptop pe dikhega) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-blue-900 to-slate-900 p-12 text-white relative overflow-hidden">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-600/30 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
              <Ticket size={28} />
            </div>
            <span className="text-2xl font-bold">HelpDesk Pro</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Manage your support <br /> like a pro.
          </h2>
          <p className="text-blue-200 text-lg max-w-md">
            The all-in-one platform to track tickets, resolve issues, and keep your customers happy.
          </p>
        </div>
        
        <p className="relative z-10 text-sm text-blue-300">
          © 2026 HelpDesk Pro. Developed by Manahil Zahra.
        </p>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="mb-2 text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mb-8 text-slate-400">Please enter your details to sign in.</p>

          {message && (
            <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pl-12 pr-12 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                {/* ✅ Show/Hide Password Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-70"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-blue-400 hover:text-blue-300">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}