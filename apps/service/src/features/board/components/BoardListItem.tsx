import React from "react";
import Link from "next/link";
import { POST_TYPE } from "@/src/constant/board";
import { Eye, Heart, MessageSquare } from "lucide-react";
import { Board } from "@/src/entities/board/board.type";
import { formatDate } from "@/src/shared/utils/dateParsing";

interface BoardListItemProps extends Board {
  className?: string;
}
export default function BoardListItem({
  title,
  content,
  createdTime,
  authorName,
  viewCount,
  likeCount,
  commentCount,
  className,
  type,
  href,
  ishome,
}: BoardListItemProps) {
  return (
    <div
      className={`border-b-[1px] border-line01 flex flex-col p-4 gap-2 hover:bg-gray-50 ${className}`}
    >
      <Link href={href} className="w-full">
        <Title title={title} type={type} />
      </Link>

      <Link
        href={href}
        className="flex flex-col w-full text-muted-foreground min-h-10"
      >
        <div className="text-base line-clamp-1 break-all">{content}</div>
        <span className="text-sm text-gray-500 ml-auto mt-3">
          {formatDate(createdTime)}
        </span>
      </Link>
      <div className=" flex flex-row">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-700">{authorName}</span>
          {/* <span className="text-gray-400">·</span> */}

          {!ishome && (
            <>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">{type}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 text-gray-500 ml-auto">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span className="text-xs">{viewCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">{commentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span className="text-xs">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ItemTitleProps {
  title?: string;
  type?: string;
  className?: string;
}
export function Title({ title, type, className }: ItemTitleProps) {
  // 임시로 공지로 고정, 추후에 태그 용도로 쓰이면 그때 분리할 예정
  if (type === POST_TYPE.NOTICE)
    return (
      <div className="font-medium text-gray-900 flex flex-row gap-2">
        <p className="bg-primary rounded-full text-sm flex items-center justify-center text-background01 px-2 py-0.5">
          공지
        </p>
        <p className="flex-1  hover:text-primary line-clamp-1 t-l break-all">
          {title}
        </p>
      </div>
    );

  return (
    <div className="font-medium text-gray-900 t-l  hover:text-primary line-clamp-1 break-all">
      {title}
    </div>
  );
}
