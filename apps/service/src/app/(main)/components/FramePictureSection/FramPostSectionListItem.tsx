import {
  POST_TYPE,
  POST_TYPE_TITLE_LABEL,
  PostType,
} from "@/src/constant/board";
import { toFormattedDate } from "@/src/libs/utils/dateParsing";
import { cn } from "@nova/ui/lib/utils";
import { Eye } from "lucide-react";
import React from "react";

interface Props {
  type?: PostType;
  title: string;
  viewCount: number;
  createdTime: string;
}
export default function FramPostSectionListItem({
  type,
  title,
  viewCount,
  createdTime,
}: Props) {
  return (
    <div className="flex flex-row gap-3 w-full items-center py-4 border-b-[1px] border-line01 hover:cursor-pointer">
      <Label type={type} />

      <div className="w-0 flex-1 truncate">{title}</div>
      <div className="flex text-gray-500 flex-row gap-3 items-center">
        <Eye className="w-4 h-4 te" />
        <span className="text-sm">{viewCount}</span>
        <div className="text-sm">{toFormattedDate(createdTime)}</div>
      </div>
    </div>
  );
}

function Label({ type }: { type?: PostType }) {
  if (type) {
    return (
      <p
        className={cn(
          "bg-gray-400 text-background01  text-sm flex items-center justify-center px-2 py-0.5",
          type === POST_TYPE.NOTICE && "bg-primary text-background01"
        )}
      >
        {POST_TYPE_TITLE_LABEL[type]}
      </p>
    );
  } else {
    return <>{type}</>;
  }
}
