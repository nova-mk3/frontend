import React from "react";

interface TagsProps {
  tagname: string;
  onClick: (tagname: string) => void;
}
export default function Tags({ tagname, onClick }: TagsProps) {
  return (
    <div
      className="px-4 h-[36px] t-m rounded-xl bg-primary text-background01 flex items-center cursor-pointer"
      onClick={() => onClick(tagname)}
    >
      {tagname}
    </div>
  );
}
