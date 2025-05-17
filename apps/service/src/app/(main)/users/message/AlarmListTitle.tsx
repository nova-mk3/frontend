"use client";
import { useUnreadAlarmCountQuery } from "@/src/features/alarm/query/queries";
import React from "react";

export default function AlarmListTitle() {
  const { data, isLoading, isError } = useUnreadAlarmCountQuery({});

  if (isLoading) {
    return (
      <div className="flex flex-row bg-background02 py-2 px-2 animate-pulse h-[40px]">
        <div className="flex flex-row gap-1 items-center">
          읽지 않은 알림
          <div className="h-4 bg-gray-300 rounded w-4"></div>개
        </div>
        <div className="ml-auto flex items-center">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return null;
  }
  return (
    <div className="flex flex-row bg-background02 py-2 px-2">
      <div className="flex flex-row gap-1">
        읽지 않은 알림 <p className="text-primary !font-bold">{data.count}</p>개
      </div>
      <div className="ml-auto text-sm text-gray-500 cursor-pointer">
        모두 읽기
      </div>
    </div>
  );
}
