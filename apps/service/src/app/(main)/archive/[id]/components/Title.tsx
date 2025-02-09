import { Folder } from "lucide-react";
import React from "react";

export default function Title() {
  return (
    <div className="flex flex-row border-primary border-b-[1px] py-5 mobile:flex-col">
      <p className="t-l !font-bold text-primary flex flex-row gap-2 items-center"> <Folder size={24} />족보게시판</p>

    </div>
  );
}
