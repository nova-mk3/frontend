import { Alarm } from "@/src/entities/alarm/alarm.type";
import { formatDate } from "@/src/shared/utils/dateParsing";
import React from "react";

export interface AlarmListItemProps extends Alarm {}
export default function AlarmListItem({
  uuid,
  read,
  message,
  createdTime,
  targetId,
  targetType,
}: AlarmListItemProps) {
  return (
    <div className="flex flex-row hover:bg-gray-50 cursor-pointer py-4 border-b-[1px] border-line01 mobile:flex-col">
      <div className="flex flex-row items-center gap-2">
        {read && (
          <div className="bg-primary w-2 h-2   rounded-full flex-shrink-0"></div>
        )}
        {!read && (
          <div className="bg-gray-300 w-2 h-2 rounded-full flex-shrink-0"></div>
        )}

        {read && <div className="line-clamp-2 break-all">{message}</div>}
        {!read && <div className="line-clamp-2 break-all">{message}</div>}
      </div>
      <div className="flex ml-auto pl-5 flex-shrink-0 text-sm items-center text-gray-500 mobile:m-0 mobile:pl-4">
        {formatDate(createdTime)}
      </div>
    </div>
  );
}
