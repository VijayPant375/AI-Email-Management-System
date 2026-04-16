"use client";

import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarMobileToggle } from "./SidebarToggle";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/emails": "Emails",
};

export default function Topbar() {
  const pathname = usePathname();
  const title =
    Object.entries(PAGE_TITLES)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([key]) => pathname === key || pathname.startsWith(key + "/"))?.[1] ??
    "Dashboard";

  return (
    <header
      className="h-16 flex items-center justify-between px-6 bg-white border-b shrink-0"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Left: mobile toggle + page title */}
      <div className="flex items-center gap-3">
        <SidebarMobileToggle />
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      </div>

      {/* Right: notification + avatar */}
      <div className="flex items-center gap-3">
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
          VP
        </div>
      </div>
    </header>
  );
}
