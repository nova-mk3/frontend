import React from "react";

interface Props {
  title?: string;
  count?: number;
}
export default function CommentTitle({
  title = "전체 댓글",
  count = 0,
}: Props) {
  return (
    <div className="flex flex-row items-end gap-3 border-line01 border-b-[1px] py-5">
      <p className="text-xl font-bold font-pretendard">{title}</p>
      <p className="text-sm">{count} 개</p>
    </div>
  );
}
