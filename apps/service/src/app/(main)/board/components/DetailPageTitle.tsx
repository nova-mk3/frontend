import React from "react";
import Link from "next/link";


interface TitleProps{
  title? : string;
  className?: string;
  TitleImage? : React.ReactElement<SVGElement>
}

export default function DetailPageTitle({title, className ,TitleImage} : TitleProps) {
  return (
    <Link href={'/board/qna'} className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center cursor-pointer ${className}`}>
      <p className="t-l !font-bold text-primary mobile:mb-[15px] flex items-center gap-2">{TitleImage}{title}</p>
    </Link>
  );
}


