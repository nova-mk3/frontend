"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PictureInput, PictureSchema } from "@/src/schema/picture.schema";
import { Form } from "@nova/ui/components/ui/form";
import { CLUB_ARCHIVE, POST_TYPE } from "@/src/constant/board";
import ModifyFileUploader from "../../components/ModifyFileUploader";
import { ImageFile } from "../../components/PostFileUploader";
import {
  useFileUploadMutation,
  usePicturePutMutation,
} from "../../query/mutation";
import { usePictureDetailQuery } from "../../query/queries";
import { ImageProps } from "../PostDetail";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";
import TextareaFormContentField from "@/src/features/auth/components/signup/TextareaFormContentField";
import LoadingModal from "@/src/shared/ui/modal/LoadingModal";
import TextareaFormField from "@/src/features/auth/components/signup/TextareaFormField";
import NewPostTitle from "@/src/shared/ui/board/NewPostTitle";

interface Props {
  postId: string;
}
export default function ModifyPage({ postId }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<ImageFile[]>([]);
  const [originFiles, setOriginFiles] = useState<ImageProps[]>([]);
  const [willDeleteFiles, setwillDeleteFiles] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pictureMutation = usePicturePutMutation({ postId });
  const uploadMutation = useFileUploadMutation();
  const { data, isLoading } = usePictureDetailQuery({
    postId,
    boardId: CLUB_ARCHIVE,
  });

  const form = useForm<PictureInput>({
    resolver: zodResolver(PictureSchema),
    mode: "onChange",
    defaultValues: {
      title: data?.title,
      content: data?.content,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        content: data.content,
      });
      setOriginFiles([...data.images]);
    }
  }, [data, form]);

  const onSubmit = async (data: PictureInput) => {
    // 파일이 없을때는 파일 업로드 생략
    // 파일이 존재할때는 파일 업로드가 성공하면 게시글 생성

    console.log(originFiles);
    console.log(willDeleteFiles);
    if (originFiles.length + selectedFiles.length <= 0) {
      alert("사진을 하나 이상 선택하세요");
      return;
    }

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("files", file.file);
    });

    if (selectedFiles.length > 0) {
      try {
        setIsOpen(true);
        const response = await uploadMutation.mutateAsync({
          data: formData,
          POST_TYPE: POST_TYPE.PICTURES,
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        const temp = [
          ...response.data.map((file: any) => {
            return file.id;
          }),
        ];
        // 업로드 성공 후 다른 API 호출 예시
        pictureMutation.mutate({
          title: data.title,
          content: data.content,
          imageFileIds: [...originFiles.map((file) => file.id), ...temp],
          deleteImageFileIds: [...willDeleteFiles],
          postId: postId,
          boardId: CLUB_ARCHIVE,
        });
      } catch (error) {
        alert("파일 업로드 실패");
        console.log(error);
      } finally {
        setIsOpen(false);
      }
    } else {
      console.log(...originFiles.map((file) => file.id));
      pictureMutation.mutate({
        title: data.title,
        content: data.content,
        imageFileIds: [...originFiles.map((file) => file.id)],
        deleteImageFileIds: [...willDeleteFiles],
        postId: postId,
        boardId: CLUB_ARCHIVE,
      });
    }
  };

  if (isLoading) {
    return <PendingFallbackUI />;
  }

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <NewPostTitle
            backLink="/pictures"
            backLinkText="사진 게시판"
            title="사진 수정"
          />
          <div className="flex flex-col gap-6 w-[80%] h-[calc(100vh-86px)] mx-auto relative">
            {/* 제목 입력란 */}
            <TextareaFormField
              form={form}
              name="title"
              placeholder="제목을 입력하세요"
            />

            {/* 첨부 파일 영역 */}
            <ModifyFileUploader
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              originFiles={originFiles}
              setOriginFiles={setOriginFiles}
              willdeletedFiles={willDeleteFiles}
              setwillDeleteFiles={setwillDeleteFiles}
            />

            {/* 본문 스크롤 영역 */}
            <TextareaFormContentField
              form={form}
              name="content"
              placeholder="내용을 입력하세요"
            />
          </div>
        </form>
      </Form>
      <LoadingModal isOpen={isOpen} />
    </>
  );
}
