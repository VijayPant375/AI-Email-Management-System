"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, AlertTriangle } from "lucide-react";
import EmailTable from "@/components/EmailTable";
import { SkeletonTable } from "@/components/SkeletonRow";
import type { Email } from "@/types/email";

export default function EmailsPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const response = await fetch("/api/emails");
        if (!response.ok) throw new Error("Failed to fetch emails");
        const data = await response.json();
        setEmails(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching emails."
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchEmails();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Emails
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and manage your automated email workflows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isLoading && (
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
              {emails.length} email{emails.length !== 1 ? "s" : ""}
            </span>
          )}
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
        </div>
      ) : emails.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-2xl border border-gray-200 bg-white gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <Inbox size={22} className="text-indigo-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700">
              Your inbox is empty
            </p>
            <p className="text-xs text-gray-400 mt-1">
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
