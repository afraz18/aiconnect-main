"use client";

export default function MeetingNotesPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">AI Meeting Notes</h1>

      <div className="bg-[#111] rounded-xl p-6 border border-gray-700 shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Summary</h2>
        <p className="text-gray-300">
          Notes will be auto-generated once the meeting ends.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Key Discussion Points</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• Point 1</li>
          <li>• Point 2</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">Action Items</h2>
        <ul className="space-y-2 text-gray-300">
          <li>✔ Item 1</li>
          <li>✔ Item 2</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">Decisions</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• Decision 1</li>
        </ul>
      </div>
    </div>
  );
}
