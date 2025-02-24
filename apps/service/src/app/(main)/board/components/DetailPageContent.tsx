import React from "react";

interface Props {
  content? : string;
}
export default function DetailPageContent({content} : Props) {
  return (
    <div className="max-w-none mb-8 min-h-[240px]">
      {content}
    </div>
  );
}
