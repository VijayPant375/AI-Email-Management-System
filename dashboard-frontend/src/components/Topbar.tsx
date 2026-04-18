"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarMobileToggle } from "./SidebarToggle";
import { ThemeToggle } from "./ThemeToggle";
import type { Email } from "@/types/email";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/emails": "Emails",
};

export default function Topbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentEmails, setRecentEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const title =
    Object.entries(PAGE_TITLES)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([key]) => pathname === key || pathname.startsWith(key + "/"))?.[1] ??
    "Dashboard";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = async () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/emails");
        if (response.ok) {
          const data: Email[] = await response.json();
          // Sort by received_time descending, take top 3
          const sorted = data.sort((a, b) => new Date(b.received_time).getTime() - new Date(a.received_time).getTime());
          setRecentEmails(sorted.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch emails for notifications", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0 transition-colors duration-200"
    >
      {/* Left: mobile toggle + page title */}
      <div className="flex items-center gap-3">
        <SidebarMobileToggle />
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
      </div>

      {/* Right: theme toggle + notification + avatar */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors relative ${
              isDropdownOpen ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/80">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {isLoading ? (
                    <div className="flex justify-center items-center py-6 text-gray-400">
                      <Loader2 size={16} className="animate-spin" />
                    </div>
                  ) : recentEmails.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      <p className="px-2 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">New emails received</p>
                      {recentEmails.map((email) => (
                        <div key={email.id} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{email.subject}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{email.sender_email}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                      No new notifications
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
          VP
        </div>
      </div>
    </header>
  );
}
