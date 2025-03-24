import React from "react";

export default function SkeletonSuggestionItem() {
  return (
    <div
      className={`flex flex-row  border rounded-xl border-line01 py-2 h-[42px]`}
    >
      <div
        className={`w-[60px] text-center bg-background02 rounded-full`}
      ></div>
      <div className={`flex flex-row items-center gap-1 flex-1`}>
        {/* 이부분 신기하네요 */}

        <div className="min-w-[100px]  bg-background02 rounded-full"></div>
      </div>
      <div
        className={`w-[100px] text-center bg-background02 rounded-full`}
      ></div>
      <div
        className={`w-[100px] text-center bg-background02 rounded-full`}
      ></div>
      <div
        className={`w-[100px] text-center bg-background02 rounded-full`}
      ></div>
      <div
        className={`w-[100px] text-center bg-background02 rounded-full`}
      ></div>
    </div>
  );
}
