"use client";
import { INTEGRATED, POST_TYPE } from "@/src/constant/board";
import {
  useAcrossBoardListQuery,
  usePostListQuery,
} from "@/src/features/board/query/queries";
import { Separator } from "@nova/ui/components/ui/separator";
import { cn } from "@nova/ui/lib/utils";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import AcrossPostList from "./AcrossPostList";
import NoticePostList from "./NoticePostList";
import IntroPostList from "./IntroPostList";

/**
 *
 * SSR의 경우 최신글만 반영
 */
export default function PostSection() {
  const [selectedTab, setSelectedTab] = useState<
    "latest" | "popular" | "notice" | "intro"
  >("latest");

  const { data: latestData, isLoading } = useAcrossBoardListQuery({
    page: 0,
    size: 5,
    sortBy: "createdTime",
    sortDirection: "desc",
  });

  const { data: popularData } = useAcrossBoardListQuery({
    page: 0,
    size: 5,
    sortBy: "viewCount",
    sortDirection: "desc",
  });

  const { data: noticeData } = usePostListQuery({
    postType: POST_TYPE.NOTICE,
    page: 0,
    size: 5,
    keyword: "",
    searchType: "ALL",
    sortBy: "createdTime",
    sortDirection: "desc",
    boardId: INTEGRATED,
  });

  const { data: introData } = usePostListQuery({
    postType: POST_TYPE.INTRODUCTION,
    page: 0,
    size: 5,
    keyword: "",
    searchType: "ALL",
    sortBy: "createdTime",
    sortDirection: "desc",
    boardId: INTEGRATED,
  });

  if (isLoading) {
    return (
      <div className="min-w-[600px] min-h-[500px]  ml-auto flex items-center justify-center ">
        연결중...
      </div>
    );
  }
  return (
    <div className="min-w-[600px] min-h-[500px] ml-auto mobile:min-w-full mobile:px-8">
      <div className="flex flex-row gap-3 items-center t-m">
        <div
          className={cn(
            "cursor-pointer",
            selectedTab === "latest" && "text-primary font-bold"
          )}
          onClick={() => setSelectedTab("latest")}
        >
          최신글
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div
          className={cn(
            "cursor-pointer",
            selectedTab === "popular" && "text-primary font-bold"
          )}
          onClick={() => setSelectedTab("popular")}
        >
          인기글
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div
          className={cn(
            "cursor-pointer",
            selectedTab === "notice" && "text-primary font-bold"
          )}
          onClick={() => setSelectedTab("notice")}
        >
          공지사항
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div
          className={cn(
            "cursor-pointer",
            selectedTab === "intro" && "text-primary font-bold"
          )}
          onClick={() => setSelectedTab("intro")}
        >
          자기소개
        </div>
        <Link href="/board/home" className="ml-auto">
          <Ellipsis size={20} className="text-gray-700" />
        </Link>
      </div>
      <Separator className="mt-3" />
      {selectedTab === "latest" && <AcrossPostList data={latestData.content} />}
      {selectedTab === "popular" && (
        <AcrossPostList data={popularData.content} />
      )}
      {selectedTab === "notice" && <NoticePostList data={noticeData.content} />}
      {selectedTab === "intro" && <IntroPostList data={introData.content} />}
    </div>
  );
}
