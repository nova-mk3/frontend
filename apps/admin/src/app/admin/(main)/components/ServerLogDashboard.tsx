"use client";
import { Terminal } from "lucide-react";

export default function ServerLogDashboard() {
  const logs = [
    "2025-04-07 12:01:23 - User login success",
    "2025-04-07 12:03:54 - DB connection stable",
    "2025-04-07 12:04:12 - New member registered",
  ];

  return (
    <div className="border-2 border-primary rounded-xl shadow-md p-6 w-full h-full bg-white flex flex-col justify-between">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-black">
        <Terminal className="text-primary" size={24} /> Server Log
      </h2>
      <span className="text-2xl font-bold text-primary">임시내용입니다</span>
      <ul className="text-sm text-gray-700 space-y-1">
        {logs.map((log, index) => (
          <li key={index} className="truncate">{log}</li>
        ))}
      </ul>
    </div>
  );
}
