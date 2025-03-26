import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="flex w-full bg-ui01 mt-10">
      <div className="w-[60%] flex flex-col mx-auto mobile:w-[80%]">
        <div className="flex flex-row justify-between py-5 mobile:flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="!font-bold">동아리 정보</p>
            <p>학술동아리 노바</p>
            <p>위치 : 충정북도 청주시 충북대학교 s4-117호</p>
            <p>회장 : 송동선</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="!font-bold">게시판</p>
            <Link href="/boartd/home">통합게시판</Link>
            <Link href="/exam_archive">족보게시판</Link>
            <Link href="/pictures">사진게시판</Link>
          </div>

          <div className="flex flex-col gap-2">
            <p className="!font-bold">가이드</p>
            <p>노바 생활 가이드</p>
            <p>노바 임원 지침서</p>
          </div>
        </div>

        <div className="flex flex-col items-center py-5 border-t-[1px] border-line01">
          <p>2025 학술 동아리 노바. All rights reserved.</p>
          <p>본 웹사이트는 동아리 노바가 소유 및 운영하고 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
