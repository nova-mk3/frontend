"use client";
import { Server } from "lucide-react";

export default function ServerStatusDashboard() {
  const status = {
    cpu: "34%",
    memory: "61%",
    disk: "79%",
    health: "Good",
  };

  return (
    <div className="border-2 border-primary rounded-xl shadow-md p-6 w-full h-full bg-white flex flex-col justify-between">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-black">
        <Server className="text-primary" size={24} /> Server Status
      </h2>
      <ul className="text-base text-gray-800 space-y-2">
        <li>CPU 사용량: {status.cpu}</li>
        <li>메모리 사용량: {status.memory}</li>
        <li>디스크 사용량: {status.disk}</li>
        <li>상태: <span className="font-bold text-green-600">{status.health}</span></li>
      </ul>
    </div>
  );
}
