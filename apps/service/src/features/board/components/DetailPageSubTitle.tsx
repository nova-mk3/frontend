"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { PostType } from "@/src/constant/board";
import dynamic from "next/dynamic";
import ViewCount from "./ViewCount";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Separator } from "@nova/ui/components/ui/separator";
import Link from "next/link";
import { DeleteIntegratedBoard } from "../api/integrated";
import { postKeys } from "../query/queryKey";
import { SimpleProfileQueryOptions } from "@/src/app/(main)/users/[id]/query/options";
import { formatDate } from "@/src/shared/utils/dateParsing";
import AlertDialog from "@/src/shared/ui/modal/AlertDialog";

const MobileLike = dynamic(() => import("../../like/components/MobileLike"), {
  ssr: false,
});
interface SubTitle {
  title: string;
  writer: string;
  date: string;
  likeCount: number;
  viewCount: number;
  postId: string;
  postType: PostType;
  boardId: string;
  liked: boolean;
  authorId: string;
  defaultHref?: string;
}

export default function DetailPageSubTitle({
  title,
  writer,
  date,
  likeCount,
  viewCount,
  postId,
  postType,
  boardId,
  liked,
  authorId,
  defaultHref = "",
}: SubTitle) {
  const queryClient = useQueryClient();
  const { data } = useQuery(SimpleProfileQueryOptions());
  const router = useRouter();
  const handleModify = () => {
    router.push(`${defaultHref}/${postId}/modify`);
  };
  const handleDelete = async () => {
    try {
      await DeleteIntegratedBoard({ boardId, postId });
      router.push(`${defaultHref}/${postType.toLocaleLowerCase()}`);

      queryClient.invalidateQueries({
        queryKey: postKeys.typelists(postType),
        refetchType: "inactive",
      });
      queryClient.invalidateQueries({
        queryKey: postKeys.listmain(),
        refetchType: "inactive",
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col border-line01 gap-6 mobile:flex-col">
      <div className="mb-8 mt-8">
        <div className="text-3xl font-bold mb-4 font-pretendard">{title}</div>
        <div className="flex flex-row mt-2 text-sm text-muted-foreground">
          <div className="flex flex-row  items-center gap-4">
            <Link
              href={`/users/${authorId}`}
              className="text-gray-700 hover:underline"
            >
              {writer}
            </Link>
            <p>{formatDate(date)}</p>
            <ViewCount viewCount={viewCount} />
          </div>

          <div className="flex flex-row gap-4 items-center ml-auto">
            <MobileLike count={likeCount} postId={postId} liked={liked} />

            {data?.memberId === authorId && (
              <>
                <p className="cursor-pointer" onClick={handleModify}>
                  수정
                </p>
                <Separator orientation="vertical" className="h-4" />
                <AlertDialog
                  title="게시글 삭제"
                  subtitle="게시글을 정말로 삭제하시겠습니까?"
                  triggerName="삭제"
                  onAction={handleDelete}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
