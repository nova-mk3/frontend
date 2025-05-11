import React from "react";

export default function SkeletonSuggestionTitle() {
  return (
    <div
      className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center mt-5`}
    >
      <div className="flex flex-col gap-2 mobile:flex-col mobile:items-center">
        <p className="w-[80px] h-[36px] rounded-md bg-background02"></p>
      </div>

      <div className="flex flex-row items-center gap-[15px] ml-auto mt-auto mobile:flex-col mobile:w-full">
        <div className="w-[82px] h-[36px] rounded-md bg-background02 "></div>
        <div className="w-[100px] h-[36px] rounded-md bg-background02 "></div>
        <div className="w-[321px] h-[36px] rounded-md bg-background02 "></div>
        <div className="w-6 h-6 rounded-md bg-background02"></div>
        <div className="w-[80px] h-[36px] rounded-md bg-background02"></div>
      </div>
    </div>
  );
}
