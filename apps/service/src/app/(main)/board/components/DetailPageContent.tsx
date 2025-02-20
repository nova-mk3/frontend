import React from "react";

interface Props {
  content? : string;
}
export default function DetailPageContent({content} : Props) {
  return (
    <div className="min-h-[240px] mt-5">
      {content}
    </div>
  );
}
