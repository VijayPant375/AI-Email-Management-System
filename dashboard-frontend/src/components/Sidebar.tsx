"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail, Zap } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/emails", label: "Emails", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "var(--sidebar-width)",
        background: "var(--sidebar-bg)",
      }}
      className="fixed inset-y-0 left-0 z-40 flex flex-col shrink-0 transition-transform duration-300 md:translate-x-0"
      id="app-sidebar"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-gray-200 dark:border-white/10">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <Mail size={14} className="text-white" />
        </div>
        <span className="text-gray-900 dark:text-white font-bold text-sm tracking-wide">
          MailFlow
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto border-r border-[var(--sidebar-border)] dark:border-transparent">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500 dark:text-white/40">
          Main
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? "bg-indigo-50 dark:bg-white/10 text-indigo-700 dark:text-white"
                  : "text-gray-600 dark:text-white/50 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white/80"
              }`}
              style={
                isActive
                  ? { boxShadow: "inset 3px 0 0 #6366f1" }
                  : undefined
              }
            >
              <Icon
                size={16}
                className={`shrink-0 transition-colors ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-400 dark:text-white/30 group-hover:text-gray-600 dark:group-hover:text-white/60"
                }`}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-white/80 truncate">
              Vijay Pant
            </p>
            <p className="text-[10px] text-white/30 truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
