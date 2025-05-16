"use client";
import React from "react";

import { useExecutibeListQuery } from "../query/queries";
import Card from "./Card";
import { useQueryParams } from "@/src/shared/hooks/useQueryParams";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";

export default function ExecutiveList() {
  const { year } = useQueryParams();
  const { data: datas, isLoading } = useExecutibeListQuery({ year });

  if (isLoading) {
    return <PendingFallbackUI />;
  }

  // 역할별로 분리
  const chairman = datas?.find((d: any) => d.role === "CHAIRMAN");
  const viceChairman = datas?.find((d: any) => d.role === "VICE_CHAIRMAN");
  const executives = datas?.filter((d: any) => d.role === "EXECUTIVE");

  if (datas.length === 0) {
    return (
      <div className="bg-background02 h-full flex items-center justify-center !font-bold min-h-[750px]">
        해당 학년에 임원들이 없습니다 😔
      </div>
    );
  }
  return (
    <div className="w-[90%] xl:w-full mx-auto min-h-[750px]">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold  flex items-center text-primary">
          <span className="inline-block w-3 h-8 bg-primary mr-3"></span>
          회장
        </h2>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {chairman ? (
            <Card
              role={chairman.role}
              name={chairman.name}
              profilePhoto={chairman.profilePhoto}
              phone={chairman.phone}
              grade={chairman.grade}
              semester={chairman.semester}
              memberId={chairman.memberId}
            />
          ) : (
            <div className="">회장이 아직 없어요 😔</div>
          )}
        </section>

        <h2 className="text-2xl font-bold  flex items-center text-gray-400">
          <span className="inline-block w-3 h-8 bg-gray-400 mr-3"></span>
          부회장
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {viceChairman ? (
            <Card
              role={viceChairman.role}
              name={viceChairman.name}
              profilePhoto={viceChairman.profilePhoto}
              phone={viceChairman.phone}
              grade={viceChairman.grade}
              semester={viceChairman.semester}
              memberId={viceChairman.memberId}
            />
          ) : (
            <div className="">부회장이 아직 없어요 😔</div>
          )}
        </div>
        <h2 className="text-2xl font-bold flex items-center text-gray-500">
          <span className="inline-block w-3 h-8 bg-gray-500 mr-3"></span>
          임원
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {executives.map((executive: any) => (
            <Card
              key={executive.executiveHistoryId}
              role={executive.role}
              name={executive.name}
              profilePhoto={executive.profilePhoto}
              phone={executive.phone}
              grade={executive.grade}
              semester={executive.semester}
              memberId={executive.memberId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
