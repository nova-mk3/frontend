"use client";

import { useEffect, useState } from "react";
import { Button } from "@nova/ui/components/ui/button";
import Image from "next/image";
import { Phone, IdCard, Cake, Mail } from "lucide-react";

// 성민이형의 고양이 사진 임시 사용
// import TempImageLink from "/image/cat.jpg";

interface MemberCardModalProps {
  open: boolean;
  onClose: () => void;
  type: "member" | "newMember";
  Aceept?: () => void;
  Reject?: () => void;
}

// 더미 데이터
const data = {
  name: "고양이",
  studentId: "2019019014",
  phoneNumber: "010-0000-0000",
  birthday: "2000-01-01",
  email: "CatHolic@chungbuk.ac.kr",
  grade: "1학년",
};

const MemberInfo = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center space-x-3">
    <Icon className="h-8 w-8 text-gray-600" />
    <div className="text-2xl">{label}</div>
  </div>
);

export default function MemberCardModal({
  open,
  onClose,
  type,
  Aceept,
  Reject,
}: MemberCardModalProps) {
  const [isVisible, setIsVisible] = useState(open); // 실제 렌더링 여부
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 실행 여부

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10); // 애니메이션 적용
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300); // 닫힘 애니메이션 후 제거
    }
  }, [open]);

  if (!isVisible) return null;

  return (
    <>
      {/* 모달 백그라운드 */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      >
        <div
          className={`flex bg-white p-6 rounded-lg shadow-lg w-[1400px] min-h-[700px] transition-all duration-300 ${
            isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫기 방지
        >
          <div className="flex flex-col w-[700px] items-center space-y-8 py-20">
            {/* <Image
              src={TempImageLink}
              alt="profileImage"
              className="rounded-full w-[160px] h-[160px]"
            /> */}
            <div className="text-2xl font-bold">{data.name}</div>
            <MemberInfo icon={Phone} label={data.phoneNumber} />
            <MemberInfo
              icon={IdCard}
              label={`${data.studentId} / ${data.grade}`}
            />
            <MemberInfo icon={Cake} label={data.birthday} />
            <MemberInfo icon={Mail} label={data.email} />
          </div>

          <div className="w-[2px] bg-gray-300 rounded-lg mx-6"></div>

          <div className="flex flex-col justify-between w-[700px]">
            <div className="text-xl text-gray-700">
              다른 요소들 추가시 여기에 추가
            </div>
            {type === "member" ? (
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="default" onClick={onClose}>
                  변경취소
                </Button>
                <Button variant="default" onClick={onClose}>
                  확인
                </Button>
              </div>
            ) : type === "newMember" ? (
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="default" onClick={onClose}>
                  취소
                </Button>
                <Button variant="default" onClick={Aceept}>
                  수락
                </Button>
                <Button variant="default" onClick={Reject}>
                  반려
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
