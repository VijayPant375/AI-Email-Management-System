export default function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      {/* Sender */}
      <td className="px-4 py-3.5">
        <div className="shimmer h-3 w-32 rounded-full" />
      </td>
      {/* Subject */}
      <td className="px-4 py-3.5">
        <div className="shimmer h-3 w-48 rounded-full" />
      </td>
      {/* Category */}
      <td className="px-4 py-3.5">
        <div className="shimmer h-5 w-20 rounded-full" />
      </td>
      {/* Priority */}
      <td className="px-4 py-3.5">
        <div className="shimmer h-5 w-14 rounded-full" />
      </td>
      {/* Sentiment */}
      <td className="px-4 py-3.5">
        <div className="shimmer h-5 w-16 rounded-full" />
      </td>
      {/* Received */}
      <td className="px-4 py-3.5">
        <div className="shimmer h-3 w-28 rounded-full" />
      </td>
      {/* Status */}
      <td className="px-4 py-3.5">
        <div className="shimmer h-5 w-16 rounded-full" />
      </td>
    </tr>
  );
}

export function SkeletonTable({ rows = 7 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {["Sender", "Subject", "Category", "Priority", "Sentiment", "Received", "Status"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
