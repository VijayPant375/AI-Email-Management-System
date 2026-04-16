import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        sender_email,
        subject,
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

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
