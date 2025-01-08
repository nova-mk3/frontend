import React from "react";
import ReplyPlusIcon from "@/public/image/ReplyPlus.svg";
import ReplyMinusIcon from "@/public/image/ReplyMinus.svg";

interface ReplyButtonProps {
  isOpen?: boolean;
  toggle?: () => void;
}
export default function ReplyButton({ isOpen = true }: ReplyButtonProps) {
  return (
    <div className="flex flex-row w-max gap-[8px] text-primary b-l items-center hover:text-primary/50 cursor-pointer">
      {!isOpen ? (
        <>
          <ReplyPlusIcon />
          <p>답글 달기</p>
        </>
      ) : (
        <>
          <ReplyMinusIcon />
          <p>숨기기</p>
        </>
      )}
    </div>
  );
}
