import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CATEGORIES = [
  "Support Request",
  "Sales Inquiry",
  "Job Application",
  "Complaint",
  "General Question",
  "Spam / Irrelevant",
];

export async function POST(request: Request) {
  try {
    const { emailBody } = await request.json();

    if (!emailBody) {
      return NextResponse.json({ error: "Email body is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an AI Email Classification assistant. 
Please classify the following email body into one of the following exact categories:
${CATEGORIES.map(c => `- ${c}`).join("\\n")}

Email Body:
"""
${emailBody}
"""

Return ONLY the category name and nothing else. No explanation, no quotes.`;

    const result = await model.generateContent(prompt);
    const category = result.response.text().trim();

    // Verify it's one of our categories, or default to General Question if it hallucinated slightly
    let finalCategory = category;
    if (!CATEGORIES.includes(category)) {
      // Find closest match or default
      const matched = CATEGORIES.find(c => category.toLowerCase().includes(c.toLowerCase()));
      finalCategory = matched || "General Question";
    }

    return NextResponse.json({ category: finalCategory });
  } catch (error) {
    console.error("Classification error:", error);
    return NextResponse.json(
      { error: "Failed to classify email" },
      { status: 500 }
    );
  }
}
