import React from "react";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import Like from "./Like";
export default function ContentListItem() {
  return (
    <div className="flex flex-row gap-[15px] justify-between w-[90%] mx-auto h-[250px] border-line01 border t-m rounded-lg px-[12px] py-[20px]">
      <div className="flex flex-col gap-[10px] w-full">
        {/* 컨텐츠 헤더 */}
        <div className="w-full flex flex-row items-center gap-[10px]">
          <CircleUser size={30} />
          <p>권성민</p>
          <div className="w-[1px] h-[20px] bg-line01"></div>
          <p className="b-s">2024.01.01</p>

          <Like count={1} className="ml-auto" />

          {/* 내가 쓴 글이면 수정,삭제 버튼 추가 예정 
          나중에 여기 공유버튼 추가해도 괜찮을듯*/}
        </div>

        {/* 컨텐츠 타이틀 */}
        <div className=" w-full min-h-[70px] t-l border p-2 rounded-md">
          <p className="line-clamp-2">
            2024 이건명 족보 모음집2024 이건명 족보 모음집2024 이건명 족보
            모음집2024 이건명 족보 모음집2024 이건명 족보 모음집2024 이건명 족보
            모음집2024 이건명 족보 모음집2024 이건명 족보 모음집2024 이건명 족보
            모음집2024 이건명 족보 모음집2024 이건명 족보 모음집2024 이건명 족보
            모음집2024 이건명 족보 모음집2024 이건명 족보 모음집2024 이건명 족보
            모음집2024 이건명 족보 모음집2024 이건명 족보 모음집2024 이건명 족보
            모음집2024 이건명 족보 모음집2024 이건명 족보 모음집2024 이건명 족보
            모음집2024 이건명 족보 모음집
          </p>
        </div>

        {/* 컨텐츠 내용 */}
        <div className="b-l border min-h-[90px] h-full p-2 rounded-md">
          <p className="line-clamp-3">
            내용내용내용내용내용내내용내내내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
          </p>
        </div>
      </div>

      {/* 컨텐츠 이미지 */}
      {/* 이미지가 없다면 hidden 추가예정 */}
      <Image
        src=""
        alt="이미지"
        width={220}
        height={220}
        className="border-line01 border rounded-lg"
      />
    </div>
  );
}
