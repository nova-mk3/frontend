"use client";
// import { PlateEditor } from "@nova/ui/components/editor/plate-editor"; //plate.js 라이브러리인데 일단은 제외
import React, { useState } from "react";

import PostFileUploader, { ImageFile } from "../components/PostFileUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PictureInput, PictureSchema } from "@/src/schema/picture.schema";
import { Form } from "@nova/ui/components/ui/form";
import TextareaFormField from "@/src/app/(auth)/signup/components/TextareaFormField";
import TextareaFormContentField from "@/src/app/(auth)/signup/components/TextareaFormContentField";
import { CLUB_ARCHIVE, POST_TYPE } from "@/src/constant/board";
import NewPostTitle from "../../components/NewPostTitle";
import {
  useFileUploadMutation,
  usePicturePostMutation,
} from "../query/mutation";
import LoadingModal from "../../components/Modal/LoadingModal";

export default function Page() {
  const [selectedFiles, setSelectedFiles] = useState<ImageFile[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<PictureInput>({
    resolver: zodResolver(PictureSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const pictureMutation = usePicturePostMutation();
  const fileMutation = useFileUploadMutation();

  const onSubmit = async (data: PictureInput) => {
    // 파일이 없을때는 파일 업로드 생략
    // 파일이 존재할때는 파일 업로드가 성공하면 게시글 생성

    if (selectedFiles.length === 0) {
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
        const response = await fileMutation.mutateAsync({
          data: formData,
          POST_TYPE: POST_TYPE.PICTURES,
        });
        // 업로드 성공 후 다른 API 호출 예시
        pictureMutation.mutate({
          title: data.title,
          content: data.content,
          imageFileIds: [
            ...response.data.map((file: any) => {
              return file.id;
            }),
          ],
          boardId: CLUB_ARCHIVE,
        });
      } catch (error) {
        alert("파일 업로드 실패");
        console.log(error);
      } finally {
        setIsOpen(false);
      }
    } else {
      pictureMutation.mutate({
        title: data.title,
        content: data.content,
        imageFileIds: [],
        boardId: CLUB_ARCHIVE,
      });
    }
  };

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
            title="사진 작성"
          />
          <div className="flex flex-col gap-6 w-[80%] h-[calc(100vh-86px)] mx-auto relative">
            {/* 제목 입력란 */}
            <TextareaFormField
              form={form}
              name="title"
              placeholder="제목을 입력하세요"
            />

            {/* 첨부 파일 영역 */}
            <PostFileUploader
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
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
