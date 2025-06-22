import { useState, useEffect } from "react";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    const res = await fetch("http://localhost:4000/api/jobs/history");
    const data = await res.json();
    setLogs(data);
  };

  const triggerImport = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:4000/api/jobs/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceUrl: "https://jobicy.com/?feed=job_feed&job_categories=data-science",
      }),
    });
    const result = await res.json();
    alert(result.message);
    setLoading(false);
    fetchHistory();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
  <div className="p-8 max-w-6xl mx-auto mt-10">
    <h1 className="text-2xl font-bold mb-6 text-center">🗂 Job Import History</h1>

    <div className="flex justify-end mb-4">
      <button
        onClick={triggerImport}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? "Importing..." : "Import Jobs"}
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">file Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">importDateTime</th>
            <th className="px-2 py-2 text-center text-sm font-semibold text-gray-700">Fetched</th>
            <th className="px-2 py-2 text-center text-sm font-semibold text-gray-700">Imported</th>
            <th className="px-2 py-2 text-center text-sm font-semibold text-gray-700">New</th>
            <th className="px-2 py-2 text-center text-sm font-semibold text-gray-700">Updated</th>
            <th className="px-2 py-2 text-center text-sm font-semibold text-gray-700">Failed</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {logs.map((log, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-blue-700 break-all">{log.fileName}</td>
              <td className="px-4 py-2 text-sm">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="px-2 py-2 text-sm text-center">{log.totalFetched}</td>
              <td className="px-2 py-2 text-sm text-center">{log.totalImported}</td>
              <td className="px-2 py-2 text-sm text-center text-green-700 font-medium">{log.newJobs}</td>
              <td className="px-2 py-2 text-sm text-center text-yellow-700 font-medium">{log.updatedJobs}</td>
              <td className="px-2 py-2 text-sm text-center text-red-700 font-medium">{log.failedJobs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
