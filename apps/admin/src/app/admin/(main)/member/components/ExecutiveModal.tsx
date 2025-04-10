"use client";

import { useEffect, useState } from "react";
import { Button } from "@nova/ui/components/ui/button";
import { Input } from "@nova/ui/components/ui/input";
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { ExecutiveModalProps } from "@/src/types/executiveMember";
import { ManageMember } from "@/src/types/manageMember";
import { useManageMembersQuery } from "@/src/query/manageMembersQueries";
import { usePostExecutiveMemberMutation } from "@/src/query/executiveMembersQueries";
import { enumRoleType } from "@/src/types/executiveMember";

export default function ExecutiveModal({ year , open, onClose }: ExecutiveModalProps) {
  const [isVisible, setIsVisible] = useState(open);
  const [isAnimating, setIsAnimating] = useState(false); 
  const { data, isLoading, error } = useManageMembersQuery();
  const [viewData, setViewData] = useState<ManageMember[]|undefined>([]);
  const postExecutiveMemberMutation = usePostExecutiveMemberMutation(year);

  useEffect(() => {
    if (open) {
        setIsVisible(true);
        setViewData(data);
        setTimeout(() => setIsAnimating(true), 10);
    } else {
        setIsAnimating(false);
        setTimeout(() => setIsVisible(false), 300);
    }
  }, [open , data]);

  if (!isVisible) return null;

  const Search = (text: string) => {
    setViewData(data?.filter((member) => member.name.includes(text)));
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-[1300px] h-[600px] transition-all duration-300 ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between m-2 items-center">
            <Input
                placeholder="이름으로 검색하기"
                className="w-[400px] h-[36px] rounded-lg flex"
                onKeyDown={(e) => e.key === "Enter" && Search((e.target as HTMLInputElement).value)}
            />
            <div className="flex gap-2 mr-5">
                <Button variant={"text"} onClick={onClose}>취소</Button>
                <Button onClick={onClose}>확인</Button>
            </div>
        </div>
        <div className="flex flex-wrap overflow-auto max-h-[500px] rounded-lg" style={{ scrollbarWidth: "none" }}>
          {isLoading ? (
            <div className="w-full flex justify-center items-center py-10 text-gray-500 text-xl">
              로딩 중...
            </div>
          ) : error ? (
            <div className="w-full flex justify-center items-center py-10 text-red-500 text-xl">
              데이터 불러오기 중 오류가 발생했습니다.
            </div>
          ) : (
            viewData?.map((member) => (
              <MemberCard
                key={member.memberId}
                name={member.name}
                studentId={member.studentNumber}
                profilePhoto={member.profilePhoto}
                type={"medium"}
                onClick={() => {
                  postExecutiveMemberMutation.mutate({
                    year: year,
                    role: enumRoleType.EXECUTIVE,
                    name: member.name,
                    memberId: member.memberId,
                  });
                  onClose();
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
