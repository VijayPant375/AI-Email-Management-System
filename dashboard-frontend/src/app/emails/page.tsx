"use client";

import { useEffect, useState } from "react";
import EmailTable from "@/components/EmailTable";
import type { Email } from "@/types/email";

export default function EmailsPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const response = await fetch("/api/emails");
        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }
        const data = await response.json();
        setEmails(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching emails.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmails();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Email Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">Review your automated email workflows and incoming messages.</p>
      </div>

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
          <p className="text-lg font-medium text-gray-500">Loading emails...</p>
        </div>
      ) : error ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-red-200 bg-red-50">
          <p className="text-lg font-medium text-red-600">Error: {error}</p>
        </div>
      ) : emails.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
          <p className="text-lg font-medium text-gray-900">No emails found</p>
          <p className="text-sm text-gray-500">Your email queue is currently empty.</p>
        </div>
      ) : (
        <EmailTable emails={emails} />
      )}
    </div>
  );
}
