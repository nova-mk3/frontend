"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SuggestionInput,
  SuggestionSchema,
} from "@/src/schema/suggestion.schema";
import { Form } from "@nova/ui/components/ui/form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SuggestionFileUploadAPI,
  SuggestionPost,
  SuggestionPostRequest,
} from "@/src/api/board/suggestion";
import { POST_TYPE } from "@/src/constant/board";
import { useRouter } from "next/navigation";

import { suggestionKeys } from "../query/queries";
import NewPostTitle from "@/src/shared/ui/board/NewPostTitle";
import { RadioFormField } from "@/src/features/auth/components/signup/RadioFormField";
import PostFileUploader from "@/src/features/file/components/PostFileUploader";
import TextareaFormField from "@/src/features/auth/components/signup/TextareaFormField";
import TextareaFormContentField from "@/src/features/auth/components/signup/TextareaFormContentField";

export default function Page() {
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const router = useRouter();
  const form = useForm<SuggestionInput>({
    resolver: zodResolver(SuggestionSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      private: true,
    },
  });

  const useSuggestionPostMutation = useMutation({
    mutationFn: (data: SuggestionPostRequest) => SuggestionPost(data),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: suggestionKeys.lists(),
        refetchType: "inactive",
      });

      router.push(`/${POST_TYPE.SUGGESTION.toLocaleLowerCase()}/${data.id}`);
    },
    onError: (error) => {
      alert(error.message);
      console.log(error);
    },
  });

  const useFileUploadMutation = useMutation({
    mutationFn: ({ data }: { data: FormData }) => SuggestionFileUploadAPI(data),
  });

  const onSubmit = async (data: SuggestionInput) => {
    console.log(data);
    // 파일이 없을때는 파일 업로드 생략
    // 파일이 존재할때는 파일 업로드가 성공하면 게시글 생성
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    if (selectedFiles.length > 0) {
      try {
        const response = await useFileUploadMutation.mutateAsync({
          data: formData,
        });
        // 업로드 성공 후 다른 API 호출 예시
        useSuggestionPostMutation.mutate({
          title: data.title,
          content: data.content,
          isPrivate: data.private,
          fileIds: [
            ...response.data.map((file: any) => {
              return file.id;
            }),
          ],
        });
      } catch (error) {
        alert("파일 업로드 실패");
        console.log(error);
      }
    } else {
      useSuggestionPostMutation.mutate({
        title: data.title,
        content: data.content,
        isPrivate: data.private,
        fileIds: [],
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <NewPostTitle
          backLink="/suggestion"
          backLinkText="건의함"
          title="새 건의사항 작성"
        />

        <div className="flex flex-col gap-7  w-[80%] h-[calc(100vh-86px)] mx-auto relative">
          <RadioFormField
            form={form}
            name="private"
            label="건의내용 공개여부"
            options={[
              { value: true, label: "비공개" },
              { value: false, label: "공개" },
            ]}
          />

          {/* 첨부 파일 영역 */}
          <PostFileUploader
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />

          <TextareaFormField
            form={form}
            name="title"
            placeholder="건의할 제목을 입력하세요"
          />
          {/* 본문 스크롤 영역 */}
          <TextareaFormContentField
            form={form}
            name="content"
            placeholder="건의 내용을 입력하세요"
          />
        </div>
      </form>
    </Form>
  );
}
