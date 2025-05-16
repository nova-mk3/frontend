"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { INTEGRATED, POST_TYPE_OPTIONS, PostType } from "@/src/constant/board";
import {
  IntegratedInput,
  IntegratedSchema,
} from "@/src/schema/integrated.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { usePostDetailQuery } from "@/src/features/board/query/queries";
import { PutIntegratedBoardRequest } from "@/src/features/board/api/integrated.type";
import { PutIntegratedBoard } from "@/src/features/board/api/integrated";
import { postKeys } from "@/src/features/board/query/queryKey";
import { FileItemProps } from "@/src/features/file/components/ViewFileItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFilesAPI } from "@/src/features/file/api/file";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";
import { Form } from "@nova/ui/components/ui/form";
import { SelectFormField } from "@/src/features/auth/components/signup/SelectFormField";
import ModifyFileUploader from "@/src/features/file/components/ModifyFileUploader";
import TextareaFormField from "@/src/features/auth/components/signup/TextareaFormField";
import TextareaFormContentField from "@/src/features/auth/components/signup/TextareaFormContentField";
import NewPostTitle from "@/src/shared/ui/board/NewPostTitle";
import LoadingModal from "@/src/shared/ui/modal/LoadingModal";

interface Props {
  postId: string;
}

export default function ModifyPage({ postId }: Props) {
  const queryClient = useQueryClient();
  const { data, isLoading } = usePostDetailQuery(postId, INTEGRATED);
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [originFiles, setOriginFiles] = useState<FileItemProps[]>([]);
  const [willDeleteFiles, setwillDeleteFiles] = useState<string[]>([]);
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

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        content: data.content,
        category: data.postType,
      });
      setOriginFiles([...data.files]);
    }
  }, [data, form]);

  const useIntegratedBoardMutation = useMutation({
    mutationFn: (data: PutIntegratedBoardRequest) => PutIntegratedBoard(data),
    onSuccess: (data: any) => {
      console.log(data);
      alert("변경 성공");

      queryClient.invalidateQueries({
        queryKey: postKeys.detail(postId),
        refetchType: "all",
      });

      queryClient.invalidateQueries({
        queryKey: postKeys.typelists(data.postType as PostType),
        refetchType: "inactive",
      });

      router.push(`/board/${data.postType.toLocaleLowerCase()}/${data.id}`);
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
    console.log(data);
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
        const temp = [
          ...response.data.map((file: any) => {
            return file.id;
          }),
        ];
        // 업로드 성공 후 다른 API 호출 예시
        useIntegratedBoardMutation.mutate({
          title: data.title,
          content: data.content,
          fileIds: [...originFiles.map((file) => file.id), ...temp],
          deleteFileIds: [...willDeleteFiles],
          postId: postId,
          boardId: INTEGRATED,
          postType: data.category,
        });
      } catch (error) {
        alert("파일 업로드 실패");
        console.log(error);
      } finally {
        setIsOpen(false);
      }
    } else {
      console.log(...originFiles.map((file) => file.id));
      useIntegratedBoardMutation.mutate({
        title: data.title,
        content: data.content,
        fileIds: [...originFiles.map((file) => file.id)],
        deleteFileIds: [...willDeleteFiles],
        postId: postId,
        boardId: INTEGRATED,
        postType: data.category,
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
            backLink="/board/home"
            backLinkText="통합 게시판"
            title="게시글 변경"
          />

          <div className="flex flex-col gap-6  w-[80%] h-[calc(100vh-86px)] mx-auto relative">
            <SelectFormField
              form={form}
              name="category"
              label="카테고리"
              options={POST_TYPE_OPTIONS}
              className="w-[180px] mobile:w-full mb-5"
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
            {/* 제목 입력란 */}
            <TextareaFormField
              form={form}
              name="title"
              placeholder="제목을 입력하세요"
            />

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
