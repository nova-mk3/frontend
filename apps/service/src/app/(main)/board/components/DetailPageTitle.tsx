import React from "react";
import Link from "next/link";
import { POST_TYPE_LABEL, PostType } from "@/src/constant/board";


interface TitleProps{
  title : string;
  className?: string;
  TitleImage : React.ReactElement<SVGElement>
}

export default function DetailPageTitle({title, className ,TitleImage} : TitleProps) {
  return (
    <div className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-start ${className}`}>
      
      <Link href={`/board/${title.toLocaleLowerCase()}`} className="inline-flex">
      <p className="t-l !font-bold text-primary  flex items-center gap-2">{TitleImage}{POST_TYPE_LABEL[title as PostType]}</p>
      </Link>
    </div>
  );
}


