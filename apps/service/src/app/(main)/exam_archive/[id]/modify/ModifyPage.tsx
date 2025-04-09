"use client";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CLUB_ARCHIVE, POST_TYPE, PostType } from "@/src/constant/board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UploadFilesAPI } from "@/src/api/board/file";

import TextareaFormContentField from "@/src/app/(auth)/signup/components/TextareaFormContentField";
import { Form } from "@nova/ui/components/ui/form";
import { SelectFormField } from "@/src/app/(auth)/signup/components/SelectFormField";
import TextareaFormField from "@/src/app/(auth)/signup/components/TextareaFormField";
import { zodResolver } from "@hookform/resolvers/zod";

import { ExamInput, ExamSchema } from "@/src/schema/exam.schema";
import useYearRange from "@/src/libs/hooks/useYearRange";
import { SEMESTER_MAP, SEMESTER_OPTIONS } from "@/src/constant/exam";
import { InputFormField } from "@/src/app/(auth)/components/InputFormField";
import { ArchivePut, ArchivePutRequest } from "@/src/api/board/exam";
import { FileItemProps } from "../../../components/File/ViewFileItem";
import {
  postKeys,
  useArchiveDetailQuery,
} from "../../../board/query/postqueries";
import PendingFallbackUI from "../../../components/Skeleton/PendingFallbackUI";
import NewPostTitle from "../../../components/NewPostTitle";
import ModifyFileUploader from "../../../components/File/ModifyFileUploader";
import LoadingModal from "../../../components/Modal/LoadingModal";

interface Props {
  postId: string;
}

export default function ModifyPage({ postId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [originFiles, setOriginFiles] = useState<FileItemProps[]>([]);
  const [willDeleteFiles, setwillDeleteFiles] = useState<string[]>([]);
  const [check, setCheck] = useState<boolean>(false);
  const { data, isLoading } = useArchiveDetailQuery({
    postId,
    boardId: CLUB_ARCHIVE,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();
  const years = useYearRange(1980, currentYear);
  const form = useForm<ExamInput>({
    resolver: zodResolver(ExamSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      semester: "",
      year: "",
      professorName: "",
      subject: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        content: data.content,
        semester: data.semester,
        year: String(data.year),
        professorName: data.professorName,
        subject: data.subject,
      });
      setOriginFiles([...data.files]);
    }
  }, [data, form]);

  const semester = useWatch({
    control: form.control,
    name: "semester",
  });

  const year = useWatch({
    control: form.control,
    name: "year",
  });

  const professorName = useWatch({
    control: form.control,
    name: "professorName",
  });

  const subject = useWatch({
    control: form.control,
    name: "subject",
  });

  useEffect(() => {
    const { year, subject, professorName, semester } = form.getValues();
    // TODO: 리펙토링, 처음 FORM이 채워지는 것을 기다리는 트리거
    if (!year && check === false) return;
    setCheck(true);
    let newTitle = "";

    // year가 있다면 맨 앞에 배치
    if (year) {
      // 형식을 원하시는 대로 조정해 보세요. (예: [2023] 과 같이 사용하거나 그냥 2023)
      newTitle += `[${year}]`;
    }

    if (subject) {
      // 이미 year가 들어갔다면 그 뒤에 공백을 추가한 후 [subject]를 붙임
      newTitle += newTitle ? ` [${subject}]` : `[${subject}]`;
    }

    if (professorName) {
      // 기존에 무언가가 있다면 앞에 공백 하나, 없다면 그냥 교수 이름
      newTitle += newTitle ? ` ${professorName}` : `${professorName}`;
    }

    if (semester) {
      // 기존에 무언가가 있다면 ' - ' 붙여서 semester, 없다면 그냥 semester
      newTitle += newTitle
        ? ` - ${SEMESTER_MAP[semester]}`
        : `${SEMESTER_MAP[semester]}`;
    }

    form.setValue("title", newTitle, { shouldValidate: true });
  }, [year, subject, professorName, semester]);

  const useArchivePutMutation = useMutation({
    mutationFn: (data: ArchivePutRequest) => ArchivePut(data),
    onSuccess: (data: any) => {
      console.log(data);
      alert("변경 성공");

      // 내 수정사항은 나만 다시보면 된다 -> api 호출 최적화
      queryClient.setQueryData(postKeys.detail(postId), data);

      queryClient.invalidateQueries({
        queryKey: postKeys.typelists(data.postType as PostType),
        refetchType: "inactive",
      });

      router.push(`/${data.postType.toLocaleLowerCase()}/${postId}`);
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

  const onSubmit = async (data: ExamInput) => {
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
          POST_TYPE_OPTIONS: POST_TYPE.EXAM_ARCHIVE,
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        const temp = [
          ...response.data.map((file: any) => {
            return file.id;
          }),
        ];
        // 업로드 성공 후 다른 API 호출 예시
        useArchivePutMutation.mutate({
          title: data.title,
          content: data.content,
          year: Number(data.year),
          semester: data.semester,
          subject: data.subject,
          professorName: data.professorName,
          fileIds: [...originFiles.map((file) => file.id), ...temp],
          deleteFileIds: [...willDeleteFiles],
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
      useArchivePutMutation.mutate({
        title: data.title,
        content: data.content,
        year: Number(data.year),
        semester: data.semester,
        subject: data.subject,
        professorName: data.professorName,
        fileIds: [...originFiles.map((file) => file.id)],
        deleteFileIds: [...willDeleteFiles],
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
            backLink="/exam_archive"
            backLinkText="자료 게시판"
            title="자료 수정"
          />
          <div className="flex flex-col gap-6 w-[80%] h-[calc(100vh-86px)] mx-auto relative">
            <TextareaFormField
              form={form}
              name="title"
              placeholder="제목은 자동으로 작성됩니다"
              readonly={true}
            />
            <InputFormField
              form={form}
              name={"subject"}
              label={"과목명"}
              placeHolder={"과목명을 입력해주세요"}
            />
            <InputFormField
              form={form}
              name={"professorName"}
              label={"교수명"}
              placeHolder={"교수명을 입력해주세요"}
            />
            <div className="flex flex-row gap-3 mobile:flex-col">
              <SelectFormField
                form={form}
                name="year"
                label="년도"
                options={years}
                className="w-[180px] mobile:w-full mb-5"
              />
              <SelectFormField
                form={form}
                name="semester"
                label="학기"
                options={SEMESTER_OPTIONS}
                className="w-[180px] mobile:w-full mb-5"
              />
            </div>

            {/* 첨부 파일 영역 */}
            <ModifyFileUploader
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              originFiles={originFiles}
              setOriginFiles={setOriginFiles}
              willdeletedFiles={willDeleteFiles}
              setwillDeleteFiles={setwillDeleteFiles}
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
