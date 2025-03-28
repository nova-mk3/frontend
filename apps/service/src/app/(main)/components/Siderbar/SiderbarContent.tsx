import React from "react";
import {
  History,
  Crown,
  Users,
  Folder,
  Layers,
  Image,
  ShieldCheck,
  BookText,
} from "lucide-react";
export default function SiderbarContent() {
  return (
    <div className="flex flex-col gap-[30px] pt-[10px] px-[20px]">
      <div>
        <p className="h-s mb-2">소개</p>
        <ul className="t-m list-inside list-disc flex flex-col gap-[5px]">
          <li className="w-10/12 cursor-pointer mx-auto rounded-[15px] px-2 py-[6px] hover:bg-[#B096F5] hover:text-white flex flex-row gap-2">
            <History />
            연혁
          </li>
          <li className="w-10/12 cursor-pointer mx-auto rounded-[15px] px-2 py-[6px] hover:bg-[#B096F5] hover:text-white flex flex-row gap-2">
            <Users />
            동아리원 소개
          </li>
          <li className="w-10/12 cursor-pointer mx-auto rounded-[15px] px-2 py-[6px] hover:bg-[#B096F5] hover:text-white flex flex-row gap-2">
            <Crown />
            임원 소개
          </li>
        </ul>
      </div>
      <div>
        <p className="h-s mb-2">게시판</p>
        <ul className="t-m list-inside list-disc flex flex-col gap-[5px]">
          <li className="w-10/12 cursor-pointer mx-auto rounded-[15px] px-2 py-[6px] hover:bg-[#B096F5] hover:text-white flex flex-row gap-2">
            <Layers />
            통합게시판
          </li>
          <li className="w-10/12 cursor-pointer mx-auto rounded-[15px] px-2 py-[6px] hover:bg-[#B096F5] hover:text-white flex flex-row gap-2">
            <Folder />
            자료게시판
          </li>
          <li className="w-10/12 cursor-pointer mx-auto rounded-[15px] px-2 py-[6px] hover:bg-[#B096F5] hover:text-white flex flex-row gap-2">
            <Image />
            사진게시판
          </li>
        </ul>
      </div>
      <div>
        <p className="h-s mb-2">가이드</p>
        <ul className="t-m list-inside list-disc flex flex-col gap-[5px]">
          <li className="w-10/12 cursor-pointer mx-auto rounded-[15px] px-2 py-[6px] hover:bg-[#B096F5] hover:text-white flex flex-row gap-2">
            <ShieldCheck />
            노바 생활 가이드
          </li>
          <li className="w-10/12 cursor-pointer mx-auto rounded-[15px] px-2 py-[6px] hover:bg-[#B096F5] hover:text-white flex flex-row gap-2">
            <BookText />
            노바 임원 지침서
          </li>
        </ul>
      </div>
    </div>
  );
}
