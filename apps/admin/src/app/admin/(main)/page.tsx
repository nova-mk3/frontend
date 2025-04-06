"use client";

import React from "react";
import MemberDashboard from "./components/MemberDashboard";
import ServerLogDashboard from "./components/ServerLogDashboard";
import ServerStatusDashboard from "./components/ServerStatusDashboard";
import UXResearchDashboard from "./components/UXResearchDashboard";

export default function Dashboard() {
  return (
    <div className="w-[calc(100vw-500px)] h-[calc(100vh-100px)] min-w-[1100px] min-h-[100px]mx-auto font-pretendard px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to admin!</h1>
      <div className="grid grid-cols-10 grid-rows-10 gap-6">
        <div className="col-span-3 row-span-4">
          <div className="w-full h-full">
            <ServerStatusDashboard />
          </div>
        </div>
        <div className="col-span-7 row-span-7">
          <div className="w-full h-full">
            <ServerLogDashboard />
          </div>
        </div>
        <div className="col-span-3 row-span-6">
          <div className="w-full h-full">
            <MemberDashboard />
          </div>
        </div>
        <div className="col-span-7 row-span-3">
          <div className="w-full h-full">
            <UXResearchDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
