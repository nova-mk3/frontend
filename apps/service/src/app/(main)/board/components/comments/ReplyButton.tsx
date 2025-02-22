import React from "react";
import ReplyPlusIcon from "@/public/image/ReplyPlus.svg";
import ReplyMinusIcon from "@/public/image/ReplyMinus.svg";

interface ReplyButtonProps {
  isOpen?: boolean;
  toggle?: () => void;
  className?: string;
  count?: number;
}
export default function ReplyButton({
  isOpen,
  toggle,
  className,
  count = 1,
}: ReplyButtonProps) {
  return (
    <div
      className={`flex flex-row w-max gap-[8px] text-primary b-l items-center hover:text-primary/50 cursor-pointer ${className}`}
      onClick={toggle}
    >
      {!isOpen ? (
        <>
          <ReplyPlusIcon />
          {count > 0 ? <p>{count}개의 답글</p> : <p>답글 달기</p>}
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
