import PendingFallbackUI from "@/src/app/(main)/components/Skeleton/PendingFallbackUI";
import { useQueryParams } from "@/src/app/(main)/components/useQueryParams";
import React, { Suspense } from "react";
import { useMypageSuggestionQuery } from "../../query/qureies";
import SuggestionListItem, {
  SuggestionItem,
} from "@/src/app/(main)/suggestion/components/SuggestionListItem";
import { PageNation } from "@/src/app/(main)/components/PageNation";
import { BOARD_SIZE } from "@/src/constant/board";

export default function PostList() {
  const { currentPage } = useQueryParams();

  const { data, isLoading } = useMypageSuggestionQuery({
    page: currentPage - 1,
    size: 10,
  });

  if (isLoading) {
    return <PendingFallbackUI />;
  }

  if (data.content.length === 0)
    return (
      <div className="w-full bg-background02 h-[745px] flex items-center justify-center mt-8">
        <p className="!font-bold">건의글이 없습니다.😔</p>
      </div>
    );
  return (
    <>
      <div className="flex flex-col gap-2 min-h-[700px] mt-5">
        {data.content.map((item: SuggestionItem) => (
          <SuggestionListItem
            key={item.id}
            id={item.id}
            index={item.id}
            title={item.title}
            adminRead={item.adminRead}
            answered={item.answered}
            author={item.author}
            createdTime={item.createdTime}
            modifiedTime={item.modifiedTime}
            private={item.private}
            authorName={item.authorName}
          />
        ))}
      </div>
      <Suspense fallback={<div className="h-[36px]"></div>}>
        <PageNation
          size={BOARD_SIZE}
          totalPage={data.totalPages}
          className="my-4"
        />
      </Suspense>
    </>
  );
}
