import React from "react";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import Like from "./Like";
import Comment from "./Comment";
import { EllipsisVertical } from "lucide-react";
import Kebab from "./Kebab";
import Link from "next/link";
import { FolderDown } from 'lucide-react';
interface ContentListItemProps {
  id? : number
  profileImage?: string;
  name?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  likes?: number;
  comments?: number;
  isLiked?: boolean;
  className?: string;
  handleLikeToggle?: () => void;
  href : string;
}

export default function ContentListItem({title="임시 제목입니다", content="임시 내용입니다", createdAt="2025.01.19", likes=2, comments=2 ,name="권성민" ,isLiked=false, href} : ContentListItemProps) {
 
  return (
    <div className="flex flex-row gap-[15px] justify-between w-[90%] mx-auto min-h-[250px] t-m px-[12px] py-[20px] border-b-[1px] border-line01">
      <div className="flex flex-col gap-[10px] w-full">
        {/* 컨텐츠 헤더 */}
        <div className="w-full flex flex-row items-center gap-[10px]">
          {/* 이미지가 들어올 예정 */}
          <CircleUser size={30} />
          <Link href={`/mypage/${name}`} className="hover:underline"><p>{name}</p></Link>
          <div className="w-[1px] h-[20px] bg-line01"></div>
          <p className="b-s">{createdAt}</p>

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
        <Link href={href} className="hover:underline">
          <p className="line-clamp-1 break-all">
            {title}
          </p>
          </Link>
        </div>

        {/* 컨텐츠 내용 */}
        <div className="b-l min-h-[90px] h-full p-2 rounded-md text-text02">
        <Link href={href} className="hover:underline">
          <p className="line-clamp-3 break-all">
          {content}
          </p>
          </Link>
        </div>
        {/* 좋아요 댓글 공유 등등.. */}
        <div className="flex flex-row gap-[5px] items-center">
          <Like count={1} className="" isLiked={isLiked} />
          <Comment count={comments}/>
          <div className="flex flex-row items-center px-2 border rounded-md w-[66px] h-[25px] justify-center gap-[15px] text-text03">
          <FolderDown size={18}/>
          <p>3</p>
          </div>
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
