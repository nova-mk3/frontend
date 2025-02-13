"use client";

import { useEffect, useState } from "react";
import { Button } from "@nova/ui/components/ui/button";
import { Input } from "@nova/ui/components/ui/input";
import { membersData } from "./memberTempData";
import MemberCard from './../../../../../../../packages/ui/components/ui/MemberCard';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

interface Member {
    studentId: string;
    name: string;
    birthday: string;
    phoneNumber: string;
    email: string;
    grade: string;
    image?: string;
  }

export default function Modal({ open, onClose }: ModalProps) {
  const [isVisible, setIsVisible] = useState(open); // 실제 렌더링 여부
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 실행 여부
  const [data, setData] = useState<Member[]>([]);
  const [viewData, setViewData] = useState<Member[]>([]);

  useEffect(() => {
    if (open) {
        //TODO : API 연동
        setData(membersData);
        setViewData(membersData);
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 10); // 애니메이션 적용 (약간의 지연 필요)
    } else {
        setIsAnimating(false);
        setTimeout(() => setIsVisible(false), 300); // 닫힘 애니메이션 실행 후 제거
    }
  }, [open]);

  if (!isVisible) return null;

  const Search = (text: string) => {
    setViewData(data.filter((member) => member.name.includes(text)));
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
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫기 방지
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
        <div className="flex flex-wrap overflow-auto max-h-[500px] rounded-lg" style={{scrollbarWidth:"none"}}>
            {viewData.map((member) => (
                <MemberCard
                    key={member.studentId}
                    name={member.name}
                    phoneNumber={member.phoneNumber}
                    studentId={member.studentId}
                    type={"medium"}
                />))}
        </div>
      </div>
    </div>
  );
}
