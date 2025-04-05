"use client";

import { useEffect, useState } from "react";
import { ManageMemberCardModalProps } from "@/src/types/manageMember";
import ManageMemberCardModalContent from "./ManageMemberCardModalContent";

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
        <ManageMemberCardModalContent
          memberId={memberId}
          onClose={onClose} 
        />
      </div>
    </div>
  );
}
