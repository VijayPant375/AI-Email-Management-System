import { Email } from "@/types/email";

interface EmailTableProps {
  emails: Email[];
}

export default function EmailTable({ emails }: EmailTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 font-medium">Sender</th>
            <th className="px-4 py-3 font-medium">Subject</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Sentiment</th>
            <th className="px-4 py-3 font-medium">Received Time</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white text-gray-800">
          {emails.map((email) => (
            <tr key={email.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 truncate max-w-[150px]" title={email.sender_email}>
                {email.sender_email}
              </td>
              <td className="px-4 py-3 truncate max-w-[250px] font-medium" title={email.subject}>
                {email.subject}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {email.category}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {email.priority}
              </td>
              <td className="px-4 py-3 whitespace-nowrap capitalize">
                {email.sentiment}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                {new Date(email.received_time).toLocaleString()}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {email.response_sent ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Replied
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    Pending
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {emails.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No emails found.
        </div>
      )}
    </div>
  );
}
