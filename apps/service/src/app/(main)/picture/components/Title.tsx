import { Input } from "@nova/ui/components/ui/input";
import React from "react";
import { Search,Image } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@nova/ui/components/ui/select";
import { Button } from "@nova/ui/components/ui/button";
import Link from "next/link";


interface TitleProps{
  title? : string;
  className?: string;
}

export default function Title({title, className} : TitleProps) {
  return (
    <div className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center  ${className}`}>
      <p className="t-l !font-bold text-primary mobile:mb-[15px] flex flex-row gap-2 items-center"> <Image size={28} />{title}</p>

      <div className="flex flex-row items-center gap-[15px] ml-auto mt-auto mobile:flex-col mobile:w-full">
        <Select>
          <SelectTrigger className="w-[180px] mobile:w-full">
            <SelectValue placeholder="정렬 선택" />
          </SelectTrigger>
          <SelectContent className="bg-background01">
            <SelectItem value="seq" className="cursor-pointer hover:bg-line01">
              가나다순
            </SelectItem>
            <SelectItem value="new" className="cursor-pointer hover:bg-line01">
              최신순
            </SelectItem>
            <SelectItem
              value="popular"
              className="cursor-pointer hover:bg-line01"
            >
              인기순
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-row items-center gap-[15px] w-full">
          <Input
            placeholder="검색어를 입력하세요"
            className="w-[250px] h-[36px] px-2 py-1 rounded-lg flex-1"
          />
          <Search size="24" />
        </div>
        <Link href="/picture/newpost" className="mobile:w-full">
          <Button variant="default" className="mobile:w-full">
            글쓰기
          </Button>
        </Link>
      </div>
    </div>
  );
}
