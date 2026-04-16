import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Email Dashboard",
  description:
    "Monitor your automated email workflows, track sentiment, and manage incoming communications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content offset by sidebar width */}
        <div
          className="flex flex-col min-h-full transition-all duration-300"
          style={{ marginLeft: "var(--sidebar-width)" }}
        >
          <Topbar />
          <main
            className="flex-1 p-6 overflow-auto"
            style={{ background: "var(--background)" }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
