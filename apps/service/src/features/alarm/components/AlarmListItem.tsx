"use client";
import { Alarm } from "@/src/entities/alarm/alarm.type";
import { formatDate } from "@/src/shared/utils/dateParsing";
import Link from "next/link";
import React from "react";
import { transferLinkHref } from "../utils/transferLinkHref";
import { PatchReadAlarm } from "../api/alarm";
import { useQueryClient } from "@tanstack/react-query";
import { POST_TYPE_TITLE_LABEL } from "@/src/constant/board";

export interface AlarmListItemProps extends Alarm {}
export default function AlarmListItem({
  uuid,
  read,
  message,
  createdTime,
  targetId,
  targetType,
}: AlarmListItemProps) {
  const queryClient = useQueryClient();
  const handleClick = async () => {
    if (!read) {
      try {
        await PatchReadAlarm({ notificationId: uuid });

        queryClient.invalidateQueries({
          queryKey: ["unreadAlarmCount"],
          refetchType: "all",
        });

        queryClient.invalidateQueries({
          queryKey: ["alarms"],
          refetchType: "all",
        });
      } catch (error) {
        console.error("알림 읽기 실패:", error);
      }
    }
  };
  return (
    <Link
      href={transferLinkHref({ targetType, targetId })}
      onClick={handleClick}
      className="flex flex-row hover:bg-gray-50 cursor-pointer py-4 border-b-[1px] border-line01 mobile:flex-col"
    >
      <div className="flex flex-row items-center gap-2">
        {!read && (
          <div className="bg-primary w-2 h-2   rounded-full flex-shrink-0"></div>
        )}
        {read && (
          <div className="bg-gray-300 w-2 h-2 rounded-full flex-shrink-0"></div>
        )}

        {!read && (
          <div className="line-clamp-2 break-all">
            {"[" + POST_TYPE_TITLE_LABEL[targetType] + "] "} {message}
          </div>
        )}
        {read && (
          <div className="line-clamp-2 break-all text-gray-500">
            {" "}
            {"[" + POST_TYPE_TITLE_LABEL[targetType] + "] "}
            {message}
          </div>
        )}
      </div>
      <div className="flex ml-auto pl-5 flex-shrink-0 text-sm items-center text-gray-500 mobile:m-0 mobile:pl-4">
        {formatDate(createdTime)}
      </div>
    </Link>
  );
}
