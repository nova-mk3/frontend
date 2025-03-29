"use client";

import { useEffect, useState } from "react";
import { Button } from "@nova/ui/components/ui/button";
import { Phone, IdCard, Cake, Mail , GraduationCap, LucideIcon} from "lucide-react";
import { PendingGraduationResponse, PendingMemberResponse } from "@/src/types/pendingMember";
import { ProfileImage } from '@nova/ui/components/ui/profileImage';
import { ManageMemberCardModalProps } from "@/src/types/manageMember";


const RightSide = ({ onClose }: { 
  onClose: () => void;
}) => {
  //TODO 아래 졸업자의 세부정보를 어떻게 보여줄지 결정해야함.
    return (
      <div className="flex flex-col justify-between w-[700px]">
        <div className="text-xl text-gray-700">
          <div className="text-2xl font-bold">자기 소개</div>
            <div className="mt-6 text-lg text-gray-600">
              <div className="text-2xl font-bold">취업 정보</div>
            </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="default" onClick={onClose}>취소</Button>
          <Button
            variant="default"
            onClick={() => {
              onClose();
            }}
          >
            수락
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onClose();
            }}
          >
            닫기
          </Button>
        </div>
      </div>
    );
};

export default function ManagaMemberCardModal({ open, memberId, onClose }: ManageMemberCardModalProps) {
  const [isVisible, setIsVisible] = useState(open);
  const [isAnimating, setIsAnimating] = useState(false);
  // 임시기때문에 작동하지않음.
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [open]);

  if (!isVisible) return null;

  return (
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
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[2px] bg-gray-300 mx-6" />
        <RightSide 
          onClose={onClose} 
        />
      </div>
    </div>
  );
}
