import React from "react";
import { MessageCircle } from "lucide-react";

interface CommentProps {
  count?: number;
  className?: string;
}
export default function Comment({ count = 1, className }: CommentProps) {
  return (
    <div className="w-[66px] h-[25px] bg-white border-line01 border flex flex-row items-center rounded-md gap-[15px] justify-center cursor-pointer text-primary">
      <MessageCircle size={15} />
      <p>{count}</p>
    </div>
  );
}
