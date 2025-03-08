"use client";
import React from "react";
import { useBoardIdStore } from "@/src/store/BoardId";
import { POST_TYPE } from "@/src/constant/board";
import DetailPageTitle from "../../board/components/DetailPageTitle";
import ImageSlider from "./components/ImageSlider";
import { usePictureDetailQuery } from "../query/queries";
import { FileItemProps } from "../../components/File/ViewFileItem";
import { Separator } from "@nova/ui/components/ui/separator";
import dynamic from "next/dynamic";
import CommentSection from "./components/CommentSection";
import AlertDialog from "../../components/AlertDialog";
import { useRouter } from "next/navigation";
import { PictureBoardDelete } from "@/src/api/board/picture";
import { useQueryClient } from "@tanstack/react-query";
import { postKeys } from "../../board/query/postqueries";

interface PostDetailProps {
  postId: string;
}

export interface PictureDetail {
  authorName: string;
  authorProfilePhoto: FileItemProps;
  commentCount: string;
  content: string;
  createdTime: string;
  images: ImageProps[];
  id: string;
  likeCount: boolean;
  modifiedTime: string;
  title: string;
  viewCount: number;
}

export interface ImageProps {
  height: number;
  width: number;
  originalFileName: string;
  imageUrl: string;
  id: string;
}

const ViewCount = dynamic(() => import("../../board/components/ViewCount"), {
  ssr: false,
  loading: () => <p>조회 : 0</p>,
});
export default function PostDetail({ postId }: PostDetailProps) {
  const router = useRouter();
  const { INTEGRATED } = useBoardIdStore();
  const { data } = usePictureDetailQuery(postId, INTEGRATED);
  const queryClient = useQueryClient();
  console.log(data);

  const handleModify = () => {
    router.push(
      `${POST_TYPE.PICTURES.toLocaleLowerCase()}/modify?id=${postId}&type=${POST_TYPE.PICTURES}`
    );
  };

  const handleDelete = async () => {
    try {
      await PictureBoardDelete({ boardId: INTEGRATED, postId });
      router.push(`/${POST_TYPE.PICTURES.toLocaleLowerCase()}`);

      // TODO : 왔다갔다 하는 조회수 부분은 어떻게 할까 -> 개인적인의견 그렇게 중요한 요소가 아닌데 api 재요청을 할 필요가 있을까

      queryClient.invalidateQueries({
        queryKey: postKeys.typelists(POST_TYPE.PICTURES),
        refetchType: "inactive",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col t-m w-full mx-auto">
      <DetailPageTitle
        title="사진 게시판"
        backLink={`/${POST_TYPE.PICTURES}`}
        backLinkText="사진 목록"
        defaultHref="/pictures"
        postId={postId}
      />

      <div className="flex flex-col gap-10 w-[80%] mx-auto">
        <div className="flex flex-row gap-10 mt-5 pb-10 border-line01 border-b-[1px] mobile:flex-col">
          <div className="mb-auto w-[50%] aspect-square mobile:w-full">
            <ImageSlider images={data.images} />
          </div>

          <div className="flex flex-col flex-1 gap-3">
            <p className="text-3xl font-bold">{data.title}</p>

            <div className="flex flex-row items-center  gap-2 text-sm text-gray-500">
              <p className="text-gray-700">{data.authorName}</p>
              <p className="">5일전</p>
              {/* <Like className='ml-auto mr-2' count={5}/> */}
              <div className="ml-auto flex flex-row gap-2 items-center">
                <p className="" onClick={handleModify}>
                  수정
                </p>
                <Separator orientation="vertical" className="h-4" />
                <AlertDialog
                  title="게시글"
                  triggerName="삭제"
                  onAction={handleDelete}
                />
              </div>
            </div>
            <div className="mt-5 flex-1">{data.content}</div>

            <div className="flex flex-row  gap-2 t-m text-text03 items-center">
              <p>좋아요 {data.likeCount}</p>
              <p>댓글 {data.commentCount}</p>
              <ViewCount viewCount={data.viewCount} />
            </div>
          </div>
        </div>
        <CommentSection postId={data.id} />
      </div>
    </div>
  );
}
