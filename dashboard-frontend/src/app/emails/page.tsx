"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox, AlertTriangle, RefreshCw, Timer } from "lucide-react";
import EmailTable from "@/components/EmailTable";
import { SkeletonTable } from "@/components/SkeletonRow";
import type { Email } from "@/types/email";

const AUTO_REFRESH_INTERVAL_MS = 15_000; // 15 seconds

export default function EmailsPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchEmails = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    setError(null);
    try {
      const response = await fetch("/api/emails");
      if (!response.ok) throw new Error("Failed to fetch emails");
      const data = await response.json();
      setEmails(data);
      setLastRefreshed(new Date());
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching emails."
      );
    } finally {
      setIsLoading(false);
      if (isManual) setIsRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  // Auto-refresh polling
  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchEmails();
      }, AUTO_REFRESH_INTERVAL_MS);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh, fetchEmails]);

  const handleManualRefresh = () => {
    fetchEmails(true);
  };

  const isBusy = isLoading || isRefreshing;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight">
            Emails
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Review and manage your automated email workflows.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Email count badge */}
          {!isLoading && (
            <span className="text-xs text-gray-400 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full font-medium">
              {emails.length} email{emails.length !== 1 ? "s" : ""}
            </span>
          )}

          {/* Last refreshed */}
          <AnimatePresence>
            {lastRefreshed && !isLoading && (
              <motion.span
                key="last-refreshed"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.2 }}
                className="hidden sm:block text-xs text-gray-400"
              >
                Last updated{" "}
                {lastRefreshed.toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Auto-refresh toggle */}
          <button
            onClick={() => setAutoRefresh((v) => !v)}
            title={autoRefresh ? "Disable auto-refresh" : "Enable auto-refresh (15s)"}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium border transition-all duration-200 ${
              autoRefresh
                ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/40 dark:border-indigo-800 dark:text-indigo-400"
                : "bg-white border-gray-200 text-gray-500 hover:border-indigo-200 hover:text-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300"
            }`}
          >
            <Timer size={12} />
            {autoRefresh ? "Auto ON" : "Auto OFF"}
          </button>

          {/* Manual refresh button */}
          <button
            onClick={handleManualRefresh}
            disabled={isBusy}
            aria-label="Refresh emails"
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold border transition-all duration-200 ${
              isBusy
                ? "bg-indigo-100 border-indigo-100 text-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-700 shadow-sm"
            }`}
          >
            <RefreshCw
              size={12}
              className={isRefreshing ? "animate-spin" : ""}
            />
            {isRefreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <SkeletonTable rows={7} />
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-2xl border border-red-100 bg-red-50 gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
            <AlertTriangle size={22} className="text-red-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-red-700">
              Failed to load emails
            </p>
            <p className="text-xs text-red-400 mt-1">{error}</p>
          </div>
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="mt-1 flex items-center gap-1.5 text-xs px-4 py-2 rounded-full font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} />
            Try Again
          </button>
        </div>
      ) : emails.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[var(--sidebar-bg)] gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
            <Inbox size={22} className="text-indigo-400 dark:text-indigo-300" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Your inbox is empty
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Emails processed by the AI will appear here.
            </p>
          </div>
        </div>
      ) : (
        <EmailTable emails={emails} />
      )}
    </motion.div>
  );
}
