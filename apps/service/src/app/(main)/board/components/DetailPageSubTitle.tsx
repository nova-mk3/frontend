"use client";
import React from "react";
import { formatDate } from "@/src/libs/utils/dateParsing";
import { useRouter } from "next/navigation";
import { PostType } from "@/src/constant/board";
import { IntegratedBoardDelete } from "@/src/api/board/integrated";
import AlertDialog from "../../components/AlertDialog";
import dynamic from "next/dynamic";
import ViewCount from "./ViewCount";
import { useQueryClient } from "@tanstack/react-query";
const MobileLike = dynamic(() => import("./MobileLike"), { ssr: false });
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
  const data = queryClient.getQueryData(["memberProfile"]) as any;
  const router = useRouter();
  const handleModify = () => {
    router.push(`${defaultHref}/${postId}/modify`);
  };
  const handleDelete = async () => {
    try {
      await IntegratedBoardDelete({ boardId, postId });
      router.push(`${defaultHref}/${postType.toLocaleLowerCase()}`);

      // TODO : 왔다갔다 하는 조회수 부분은 어떻게 할까 -> 개인적인의견 그렇게 중요한 요소가 아닌데 api 재요청을 할 필요가 있을까
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
            <p className="hover:underline cursor-pointer">{writer}</p>
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
