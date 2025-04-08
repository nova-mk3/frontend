"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { INTEGRATED, POST_TYPE_OPTIONS, PostType } from "@/src/constant/board";
import {
  IntegratedInput,
  IntegratedSchema,
} from "@/src/schema/integrated.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IntegratedBoardPut,
  IntegratedPutRequest,
} from "@/src/api/board/integrated";
import { useRouter } from "next/navigation";
import { UploadFilesAPI } from "@/src/api/board/file";
import TextareaFormContentField from "@/src/app/(auth)/signup/components/TextareaFormContentField";
import { Form } from "@nova/ui/components/ui/form";
import { SelectFormField } from "@/src/app/(auth)/signup/components/SelectFormField";
import TextareaFormField from "@/src/app/(auth)/signup/components/TextareaFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { postKeys, usePostDetailQuery } from "../../query/postqueries";
import NewPostTitle from "../../../components/NewPostTitle";
import ModifyFileUploader from "../../../components/File/ModifyFileUploader";
import { FileItemProps } from "../../../components/File/ViewFileItem";
import PendingFallbackUI from "../../../components/Skeleton/PendingFallbackUI";

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
    mutationFn: (data: IntegratedPutRequest) => IntegratedBoardPut(data),
    onSuccess: (data: any) => {
      console.log(data);
      alert("변경 성공");

      // 내 수정사항은 나만 다시보면 된다 -> api 호출 최적화
      queryClient.setQueryData(postKeys.detail(postId), data);

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
        const response = await useFileUploadMutation.mutateAsync({
          data: formData,
          POST_TYPE_OPTIONS: data.category,
        });

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
  );
}
