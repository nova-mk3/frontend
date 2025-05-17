"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetAlarms } from "../api/alarm";
import AlarmListItem, { AlarmListItemProps } from "./AlarmListItem";

export default function AlarmList() {
  const size = 3;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
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

  if (isLoading) {
    return (
      <div className="flex flex-row gap-4 items-center justify-center animate-pulse mt-24">
        <div className="w-5 h-5 bg-primary rounded-full"></div>
        <div className="w-5 h-5 bg-primary rounded-full"></div>
        <div className="w-5 h-5 bg-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 mt-5">
        {data?.pages.map((page, index) => (
          <div className="flex flex-col" key={index}>
            {page.content.map((item: AlarmListItemProps) => (
              <AlarmListItem
                key={item.uuid}
                uuid={item.uuid}
                targetId={item.targetId}
                targetType={item.targetType}
                eventType={item.eventType}
                message={item.message}
                read={item.read}
                createdTime={item.createdTime}
              />
            ))}
          </div>
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="flex flex-row gap-4 items-center justify-center animate-pulse mt-10">
          <div className="w-5 h-5 bg-primary rounded-full"></div>
          <div className="w-5 h-5 bg-primary rounded-full"></div>
          <div className="w-5 h-5 bg-primary rounded-full"></div>
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && (
        <div
          className="bg-primary text-white rounded-md px-2 py-3 flex items-center justify-center cursor-pointer mt-5"
          onClick={() => fetchNextPage()}
        >
          알림 더 보기
        </div>
      )}
    </>
  );
}
