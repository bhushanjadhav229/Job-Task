import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState("");

  const handleImport = async () => {
    const res = await fetch("http://localhost:4000/api/jobs/import", {
      method: "POST",
    });

    const data = await res.json();
    console.log("?????????????",res)
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Job Importer Dashboard</h1>
      <button
        onClick={handleImport}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
      >
        Run Job Import
      </button>
      {message && (
        <p className="mt-4 text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
}
