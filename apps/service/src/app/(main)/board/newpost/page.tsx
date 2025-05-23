"use client";
// import { PlateEditor } from "@nova/ui/components/editor/plate-editor"; //plate.js 라이브러리인데 일단은 제외
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { INTEGRATED, POST_TYPE_OPTIONS, PostType } from "@/src/constant/board";
import {
  IntegratedInput,
  IntegratedSchema,
} from "@/src/schema/integrated.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { PostIntegratedBoardRequest } from "@/src/features/board/api/integrated.type";
import { PostIntegratedBoard } from "@/src/features/board/api/integrated";
import { postKeys } from "@/src/features/board/query/queryKey";
import { UploadFilesAPI } from "@/src/features/file/api/file";
import { Form } from "@nova/ui/components/ui/form";
import NewPostTitle from "@/src/shared/ui/board/NewPostTitle";
import { SelectFormField } from "@/src/features/auth/components/signup/SelectFormField";
import PostFileUploader from "@/src/features/file/components/PostFileUploader";
import TextareaFormField from "@/src/features/auth/components/signup/TextareaFormField";
import TextareaFormContentField from "@/src/features/auth/components/signup/TextareaFormContentField";
import LoadingModal from "@/src/shared/ui/modal/LoadingModal";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<IntegratedInput>({
    resolver: zodResolver(IntegratedSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const useIntegratedBoardMutation = useMutation({
    mutationFn: (data: PostIntegratedBoardRequest) => PostIntegratedBoard(data),
    onSuccess: (data: any) => {
      router.push(`/board/${watchcategory.toLocaleLowerCase()}/${data.id}`);

      // 전체글보기, 노바 홈
      queryClient.invalidateQueries({
        queryKey: postKeys.listmain(),
        refetchType: "inactive",
      });

      //내가 쓴 글의 리스트
      queryClient.invalidateQueries({
        queryKey: postKeys.typelists(watchcategory as PostType),
        refetchType: "inactive",
      });
    },
    onError: (error) => {
      alert(error.message);
      console.log(error);
    },
  });

  const useFileUploadMutation = useMutation({
    mutationFn: ({
      data,
      POST_TYPE_OPTIONS,
    }: {
      data: FormData;
      POST_TYPE_OPTIONS: string;
    }) => UploadFilesAPI(data, POST_TYPE_OPTIONS),
  });

  const onSubmit = async (data: IntegratedInput) => {
    // 파일이 없을때는 파일 업로드 생략
    // 파일이 존재할때는 파일 업로드가 성공하면 게시글 생성
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    if (selectedFiles.length > 0) {
      try {
        setIsOpen(true);
        const response = await useFileUploadMutation.mutateAsync({
          data: formData,
          POST_TYPE_OPTIONS: data.category,
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        // 업로드 성공 후 다른 API 호출 예시
        useIntegratedBoardMutation.mutate({
          title: data.title,
          content: data.content,
          postType: data.category,
          fileIds: [
            ...response.data.map((file: any) => {
              return file.id;
            }),
          ],
          boardId: INTEGRATED,
        });
      } catch (error) {
        alert("파일 업로드 실패");
        console.log(error);
      } finally {
        setIsOpen(false);
      }
    } else {
      useIntegratedBoardMutation.mutate({
        title: data.title,
        content: data.content,
        postType: data.category,
        fileIds: [],
        boardId: INTEGRATED,
      });
    }
  };

  const watchcategory = useWatch({
    control: form.control,
    name: "category",
  });

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <NewPostTitle
            backLink="/board/home"
            backLinkText="통합 게시판"
            title="통합 게시글 작성"
          />
          <div className="flex flex-col gap-6 w-[80%] h-[calc(100vh-86px)] mx-auto relative">
            {/* TODO: 좀 더 컴포넌트 화 가능할듯! */}
            <SelectFormField
              form={form}
              name="category"
              label="카테고리"
              options={POST_TYPE_OPTIONS}
              className="w-[180px] mobile:w-full mb-5"
            />

            {/* 제목 입력란 */}

            {/* 첨부 파일 영역 */}
            <PostFileUploader
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
            <TextareaFormField
              form={form}
              name="title"
              placeholder="제목을 입력하세요"
            />

            {/* 본문 스크롤 영역 */}
            {/* <PlateEditor /> */}

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
