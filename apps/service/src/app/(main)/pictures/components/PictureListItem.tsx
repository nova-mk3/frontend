import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/src/libs/utils/dateParsing";
import { Heart, Images } from "lucide-react";

export interface PictureListItemProps {
  className?: string;
  id: string;
  authorName: string;
  authorProfilePhoto: string;
  title: string;
  content: string;
  createdTime: string;
  modifiedTime: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  href: string;
  totalFileDownloadCount: number;
  thumbnailUrl: string;
  thumbnailId: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailOriginalFileName: string;
}

export default function PictureListItem({
  className,
  id,
  title,
  content,
  createdTime,
  authorName,
  href,
  viewCount,
  likeCount,
  commentCount,
  thumbnailUrl,
  thumbnailHeight,
  thumbnailWidth,
  thumbnailOriginalFileName,
  totalFileDownloadCount,
}: PictureListItemProps) {
  return (
    <div className="w-[100%] border rounded-lg flex flex-col cursor-pointer shadow-md transition ease-in-out hover:-translate-y-2 duration-300">
      <Link href={href}>
        <div className="relative w-full ">
          {/* TODO: size 크기를 통해 이미지 초기 로딩 속도를 개선할 수 있다!*/}
          <Image
            src={thumbnailUrl}
            alt={thumbnailOriginalFileName}
            width={thumbnailWidth}
            height={thumbnailHeight}
            className="w-full h-auto  aspect-video border-line01 rounded-t-lg object-cover"
            unoptimized={true}
            priority={true}
          />
        </div>
        <div className="p-3 flex flex-col gap-3">
          <div className="t-l">{title}</div>

          <div className="t-m text-text02 min-h-[48px]">{content}</div>
        </div>
        <div className="flex flex-row border-t-[1px] border-line01 px-3 py-2 text-sm text-text02 gap-2">
          <div>{formatDate(createdTime)}</div>
          <div className="flex flex-row gap-1 items-center">
            <Heart className="w-4 h-4" />
            <p>{likeCount}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Images className="w-4 h-4" />
            <p>{totalFileDownloadCount}</p>
          </div>

          <div className="ml-auto">{authorName}</div>
        </div>
      </Link>
    </div>
  );
}
