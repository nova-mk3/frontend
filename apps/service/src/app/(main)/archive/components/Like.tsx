import React from "react";
import HeartIcon from "@/public/image/Heart.svg";
interface LikeProps {
  isLiked: boolean;
  onLikeToggle?: () => void;
  count: number;
}

export default function Like({ isLiked, count, onLikeToggle }: LikeProps) {
  return (
    <div
      className={`w-[66px] h-[25px] flex flex-row items-center rounded-md gap-[15px] justify-center
    ${isLiked ? "" : "text-line01 bg-primary border-line01 border"}
    
    `}
      onClick={onLikeToggle}
    >
      <HeartIcon />

      <p className={`t-s ${isLiked ? "bg-background01" : "bg-line01"}`}>
        {count}
      </p>
    </div>
  );
}
