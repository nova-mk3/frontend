import React from "react";

export default function BoardListItemSkeleton() {
  return (
    <div className="border-b-[1px] border-line01 flex flex-col p-4 gap-2 animate-pulse">
      {/* 제목 스켈레톤 */}
      <div className="w-2/3 h-6 bg-gray-300 rounded-md"></div>

      {/* 내용 스켈레톤 */}
      <div className="w-full h-4 bg-gray-200 rounded-md"></div>
      <div className="w-5/6 h-4 bg-gray-200 rounded-md"></div>
      <div className="w-4/6 h-4 bg-gray-200 rounded-md"></div>

      {/* 작성자, 날짜, 태그 */}
      <div className="mt-4 flex flex-row">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
          <span className="text-gray-400">·</span>
          <div className="w-12 h-4 bg-gray-300 rounded-md"></div>
          <span className="text-gray-400">·</span>
          <div className="w-10 h-4 bg-gray-300 rounded-md"></div>
        </div>

        {/* 조회수, 댓글, 좋아요 */}
        <div className="flex items-center gap-3 text-gray-500 ml-auto">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            <div className="w-6 h-4 bg-gray-300 rounded-md"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            <div className="w-6 h-4 bg-gray-300 rounded-md"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            <div className="w-6 h-4 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
