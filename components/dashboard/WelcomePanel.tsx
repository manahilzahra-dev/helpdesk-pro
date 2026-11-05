import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function WelcomePanel() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
      {/* Background Gradients */}
      <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl"></div>
      <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-purple-600/30 blur-3xl"></div>

      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
            <Sparkles size={14} className="text-yellow-400" />
            <span>Welcome back, Admin</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Manage your tickets <br className="hidden md:block" /> with ease.</h2>
          <p className="mt-3 max-w-md text-sm text-slate-300">
            Your support team is doing great. You have new tickets waiting for your response.
          </p>
        </div>

        <Link 
          href="/tickets" 
          className="group flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-blue-50 hover:shadow-lg hover:shadow-white/20"
        >
          Explore Tickets
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}