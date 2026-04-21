import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

function extractReceiverEmail(row: Record<string, unknown>) {
  const directValue =
    row.receiver_email ??
    row.to ??
    row.To;

  if (typeof directValue === "string" && directValue.trim()) {
    return directValue.trim();
  }

  const headerSource =
    typeof row.email_body === "string" && row.email_body
      ? row.email_body
      : typeof row.body === "string"
        ? row.body
        : "";

  const toHeaderMatch = headerSource.match(/(?:^|\n)to:\s*([^\n]+)/i);
  const emailMatch = toHeaderMatch?.[1]?.match(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
  );

  return emailMatch?.[0] ?? null;
}

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        sender_email,
        subject,
        body,
        email_body,
        category,
        sentiment,
        priority,
        confidence_score,
        manual_review_flag,
        received_time,
        response_sent,
        reply_sent_at
      FROM emails
      ORDER BY received_time DESC
      LIMIT 100;
    `);

    return NextResponse.json(
      result.rows.map(({ body, ...row }) => ({
        ...row,
        receiver_email: extractReceiverEmail({ ...row, body }),
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
