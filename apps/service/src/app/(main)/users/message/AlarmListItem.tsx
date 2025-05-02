import React from "react";

export interface AlarmListItemProps {
  id: string;
  isRead: boolean;
  message: string;
  createAt: string;
}
export default function AlarmListItem({
  id,
  isRead,
  message,
  createAt,
}: AlarmListItemProps) {
  return (
    <div className="flex flex-row hover:bg-gray-50 cursor-pointer py-4 border-b-[1px] border-line01 mobile:flex-col">
      <div className="flex flex-row items-center gap-2">
        {isRead && (
          <div className="bg-primary w-2 h-2   rounded-full flex-shrink-0"></div>
        )}
        {!isRead && (
          <div className="bg-gray-300 w-2 h-2 rounded-full flex-shrink-0"></div>
        )}

        {isRead && <div className="line-clamp-2 break-al">{message}</div>}
        {!isRead && <div className="line-clamp-2 break-all">{message}</div>}
      </div>
      <div className="flex ml-auto pl-5 flex-shrink-0 text-sm items-center text-gray-500 mobile:m-0 mobile:pl-4">
        {createAt}
      </div>
    </div>
  );
}
