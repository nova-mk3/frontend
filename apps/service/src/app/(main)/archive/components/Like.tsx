import React from "react";
import HeartIcon from "@/public/image/Heart.svg";
interface LikeProps {
  isLiked?: boolean;
  onLikeToggle?: () => void;
  count?: number;
  className?: string;
}

export default function Like({
  isLiked,
  count,
  onLikeToggle,
  className,
}: LikeProps) {
  return (
    <div
      className={`w-[66px] h-[25px] flex flex-row items-center rounded-md gap-[15px] justify-center cursor-pointer
    ${isLiked ? "bg-primary" : " bg-white border-line01 border "}
    ${className}
    `}
      onClick={onLikeToggle}
    >
      <HeartIcon width={15} fill={`${isLiked ? "#ffffff" : "#d9d9d9"}`} />

      <p className={`t-s ${isLiked ? "text-background01" : "text-line01"}`}>
        {count}
      </p>
    </div>
  );
}
