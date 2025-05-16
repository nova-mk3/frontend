"use client";
import React from "react";
import { Users } from "lucide-react";
import Title from "./Title";
import Card from "./Card";
import { useQueryParams } from "@/src/shared/hooks/useQueryParams";
import { useUserListQuery } from "../query/queries";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";

export default function MemberList() {
  const { grade } = useQueryParams();
  const { data: datas, isLoading } = useUserListQuery({ grade });
  if (isLoading) {
    return <PendingFallbackUI />;
  }

  if (datas.length === 0) {
    return (
      <div className="bg-background02 h-full flex items-center justify-center !font-bold min-h-[750px]">
        해당 학년에 학생이 없습니다 😔
      </div>
    );
  }
  return (
    <div className="w-[90%] xl:w-full mx-auto min-h-[750px]">
      <div className="mx-auto grid gap-9  lg:grid-cols-3 xl:grid-cols-4 mobile:grid-cols-1 ">
        {datas.map((data: any) => (
          <Card
            key={data.memberId}
            profilePhoto={data.profilePhoto}
            name={data.name}
            email={data.email}
            phone={data.phone}
            introduction={data.introduction}
            role={data.role}
            grade={data.grade}
            semester={data.semester}
            studentNumber={data.studentNumber}
            memberId={data.memberId}
            graduation={data.graduation}
            graduationYear={data.graduationYear}
          />
        ))}
      </div>
    </div>
  );
}
