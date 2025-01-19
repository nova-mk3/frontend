import React from "react";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import Like from "./Like";
import Comment from "./Comment";
import { EllipsisVertical } from "lucide-react";
import Kebab from "./Kebab";
export default function ContentListItem() {
  return (
    <div className="flex flex-row gap-[15px] justify-between w-[90%] mx-auto min-h-[250px] t-m px-[12px] py-[20px] border-b-[1px] border-line01">
      <div className="flex flex-col gap-[10px] w-full">
        {/* 컨텐츠 헤더 */}
        <div className="w-full flex flex-row items-center gap-[10px]">
          <CircleUser size={30} />
          <p>권성민</p>
          <div className="w-[1px] h-[20px] bg-line01"></div>
          <p className="b-s">2024.01.01</p>

          <div className="ml-auto flex flex-row gap-[10px] b-s mobile:hidden">
            <p>수정</p>
            <div className="w-[1px] h-[20px] bg-line01"></div>
            <p>삭제</p>
          </div>

          <div className="ml-auto hidden mobile:block">
            <Kebab />
          </div>
        </div>
        <div>
          <Image
            src="/image/cat.jpg"
            alt="이미지"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="rounded-lg hidden mobile:block"
          />
        </div>
        {/* 컨텐츠 타이틀 */}
        <div className=" w-full min-h-[45px] t-l  p-2 rounded-md !font-bold">
          <p className="line-clamp-1">
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
        <div className="b-l min-h-[90px] h-full p-2 rounded-md text-text02">
          <p className="line-clamp-3">
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
          </p>
        </div>
        {/* 좋아요 댓글 공유 등등.. */}
        <div className="flex flex-row gap-[5px]">
          <Like count={1} className="" />
          <Comment />
        </div>
      </div>

      {/* 컨텐츠 이미지 */}
      {/* 이미지가 없다면 hidden 추가예정 */}
      <Image
        src="/image/cat.jpg"
        alt="이미지"
        width={220}
        height={220}
        className="border-line01 border rounded-lg mobile:hidden"
      />
    </div>
  );
}
