import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Email Dashboard
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 sm:text-lg">
          Welcome to the AI Email Management System. Monitor your automated workflows, track sentiment, and manage incoming communications.
        </p>
        <div className="mt-8">
          <Link
            href="/emails"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Go to Emails
          </Link>
        </div>
      </div>
    </div>
  );
}
