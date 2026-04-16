"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function SidebarMobileToggle() {
  const [open, setOpen] = useState(false);

  // Sync sidebar visibility
  useEffect(() => {
    const sidebar = document.getElementById("app-sidebar");
    if (!sidebar) return;
    if (open) {
      sidebar.style.transform = "translateX(0)";
    } else {
      sidebar.style.transform = "";
    }
  }, [open]);

  // Close on route change
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("click", (e) => {
      const sidebar = document.getElementById("app-sidebar");
      const btn = document.getElementById("mobile-sidebar-btn");
      if (
        sidebar &&
        btn &&
        !sidebar.contains(e.target as Node) &&
        !btn.contains(e.target as Node)
      ) {
        close();
      }
    });
  }, []);

  return (
    <>
      <button
        id="mobile-sidebar-btn"
        className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
