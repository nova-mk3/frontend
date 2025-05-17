"use client";
import { GetAlarms } from "@/src/features/alarm/api/alarm";
import React from "react";
import AlarmListTitle from "./AlarmListTitle";
import { useInfiniteQuery } from "@tanstack/react-query";
import AlarmList from "@/src/features/alarm/components/AlarmList";

export default function page() {
  const size = 3;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["alarms"],
      queryFn: ({ pageParam = 0 }) =>
        GetAlarms({ page: pageParam, size, sortBy: "createdTime" }),
      getNextPageParam: (lastPage) => {
        return lastPage.totalElements > (lastPage.number + 1) * size
          ? lastPage.number + 1
          : undefined;
      },
      initialPageParam: 0,
    });

  return (
    <div>
      <div className="bg-text02 px-3 py-2 max-w-screen-xl mobile:py-5">
        <div className="text-xl text-white">알림</div>
      </div>

      {/* 본문 */}
      <section className="min-h-[700px] px-3 py-5">
        <AlarmListTitle />

        <div className="flex flex-col gap-2 mt-5">
          {data?.pages.map((item, index) => (
            <AlarmList key={index} content={item.content} />
          ))}
        </div>
        {isFetchingNextPage && (
          <div className="flex flex-row gap-4 items-center justify-center animate-pulse mt-10">
            <div className=" w-5 h-5 bg-primary rounded-full"></div>
            <div className=" w-5 h-5 bg-primary rounded-full"></div>
            <div className=" w-5 h-5 bg-primary rounded-full"></div>
          </div>
        )}
        {hasNextPage && !isFetchingNextPage && (
          <div
            className="bg-primary text-white rounded-md px-2 py-3 flex items-center justify-center cursor-pointer mt-5"
            onClick={() => fetchNextPage()}
          >
            알림더보기
          </div>
        )}
      </section>
    </div>
  );
}
