import React from "react";
import { Input } from "@nova/ui/components/ui/input";
import { Search } from "lucide-react";
export default function Searchbox() {
  return (
    <div className="flex flex-row px-[20px] py-[15px] gap-[18px] border-b-[1px] border-line01 items-center">
      <Input placeholder="검색어를 입력하세요" className="w-10/12 mx-auto" />
      <Search size={24} className="cursor-pointer" />
    </div>
  );
}
