"use client";

import { Bell, LogOut, CheckCircle, Menu, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useSyncExternalStore } from "react";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ Hydration error aur ESLint warning fix
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // ✅ Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // ✅ LocalStorage se data
  const [userName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userName") || "User";
    }
    return "User";
  });

  const [userRole] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userRole") || "user";
    }
    return "user";
  });

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur-md dark:bg-slate-800/80 dark:border-slate-700 md:px-8">
      
      {/* Left Side: Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <Menu size={24} />
        </button>

        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 md:text-2xl">
            Dashboard
          </h2>
          <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            Welcome back,{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {isMounted ? userName : "..."}
            </span>{" "}
            👋
          </p>
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        <button 
          onClick={toggleDarkMode}
          className="rounded-full p-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-full p-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <Bell size={20} />
            <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
            </span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl z-50 dark:bg-slate-800 dark:border-slate-700">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Notifications</p>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">1 New</span>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-blue-50/50 p-3 text-sm text-slate-700 dark:bg-slate-700/50 dark:text-slate-300">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
                <p>Welcome to HelpDesk Pro! Your account is active.</p>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>

        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 rounded-full transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-sm font-bold text-white shadow-sm">
              {isMounted ? userName.charAt(0).toUpperCase() : "?"}
            </div>
            <div className="block text-left">
              <p className="text-xs font-semibold text-slate-800 sm:text-sm truncate max-w-[100px] sm:max-w-[150px] dark:text-slate-100">
                {isMounted ? userName : "..."}
              </p>
              <p className="text-[10px] text-slate-500 sm:text-xs dark:text-slate-400">
                {isMounted ? (userRole === "admin" ? "Administrator" : "User") : "..."}
              </p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 dark:bg-slate-800 dark:border-slate-700">
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-900/20"
              >
                <LogOut size={16} />
                {isLoggingOut ? "Logging out..." : "Sign out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}