"use client";
import React, {  useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import WriteBottomLayout from "../../components/WriteBottomLayout";
import FileUploader from "../../components/FileUploader";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@nova/ui/components/ui/select";
import { POST_TYPE_OPTIONS } from "@/src/constant/board";
import { IntegratedInput, IntegratedSchema } from "@/src/schema/integrated.schema";
import {  useMutation } from "@tanstack/react-query";
import { IntegradePostRequest, IntegratedBoardPost} from "@/src/api/board/integrated";
import { useRouter, useSearchParams } from "next/navigation";
import { useBoardIdStore } from "@/src/store/BoardId";
import { UploadFilesAPI } from "@/src/api/board/file";
import { usePostDetailQuery } from "../query/postqueries";
import { FileListLayout,FileList } from "../../archive/[id]/components/FileListLayout";

export default function Page() {
    const {INTEGRATED} = useBoardIdStore();
  const searchParams = useSearchParams();  
  const postId = searchParams.get("id") || "";
  const postType = searchParams.get("type") || "";

  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

 


   const {data } = usePostDetailQuery(postId, INTEGRATED);


    const {
         control,
        register,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm<IntegratedInput>({
        resolver: zodResolver(IntegratedSchema),
        mode: "onChange",
        defaultValues: {
            title: data.data.title,
            content: data.data.content,
            category : postType,
          },
      });

      
      const useIntegratedBoardMutation = useMutation({
        mutationFn: (data : IntegradePostRequest) => IntegratedBoardPost(data),
        onSuccess: (data : any) => {
          alert("변경 성공");
          router.push(`/board/${postType.toLocaleLowerCase()}/${data.data.id}`);
        },
        onError: (error) => {
          alert(error.message);
          console.log(error);
        },
      })


      const useFileUploadMutation = useMutation({
        mutationFn: ( {data,POST_TYPE_OPTIONS} : { data : FormData, POST_TYPE_OPTIONS : string}) => UploadFilesAPI(data, POST_TYPE_OPTIONS),
      })

      const onSubmit = async(data: IntegratedInput) => {
        // 파일이 없을때는 파일 업로드 생략
        // 파일이 존재할때는 파일 업로드가 성공하면 게시글 생성
        const formData = new FormData();
  
        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });
  
        if(selectedFiles.length > 0)
        {
          try {
            const response = await useFileUploadMutation.mutateAsync({
              data : formData,
              POST_TYPE_OPTIONS : data.category
            }); 

            // 업로드 성공 후 다른 API 호출 예시
            useIntegratedBoardMutation.mutate({
              title : data.title,
              content : data.content,
              postType : data.category,
              fileIds : [...response.data],
              boardId : INTEGRATED,
            })
          } catch (error) {
            alert("파일 업로드 실패");
            console.log(error);
          }
        }
        else{
          useIntegratedBoardMutation.mutate({
            title : data.title,
            content : data.content,
            postType : data.category,
            fileIds : [],
            boardId : INTEGRATED,
          })
        }
   
      };


  return (
    <form className="flex flex-col mt-5 w-[80%] h-[calc(100vh-86px)] mx-auto relative" onSubmit={handleSubmit(onSubmit)}>


     <Controller
        name="category"  // The name you want to register the value with
        control={control}
        defaultValue=""  // Set a default value if needed
        render={({ field }) => (
          <Select
          onValueChange={field.onChange}
          defaultValue={field.value as string}
          >
            <SelectTrigger className="w-[180px] mobile:w-full mb-5">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent className="bg-background01">
              {POST_TYPE_OPTIONS.map((option) => (
                <SelectItem value={option.value} key={option.value} className="cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />


      {/* 제목 입력란 */}
        
      <div className="flex-none border-line01 border-b-[1px] pb-5">
        <TextareaAutosize
          className="flex w-full h-[40px] h-l resize-none outline-none"
          placeholder="제목을 작성해주세요"
          {...register("title")}
        />
      </div>
      
      {errors.title?.message && <p className="text-danger">{errors.title?.message}</p>}
      {!errors.title && <p className="h-[24px]"></p>}

      {/* 첨부 파일 영역 */}
      

      <div className="flex-1 overflow-y-auto mb-[80px] border-line01 border-[1px] p-5 rounded-md relative">
      <TextareaAutosize
          className="flex w-full t-m resize-none outline-none h-[40px] overflow-hidden"
          placeholder={"내용을 작성해주세요"}
          {...register("content")}
        />
        {errors.content?.message && <p className="absolute right-4 top-4 text-danger">{errors.content?.message}</p>}
      </div>

      {/* 하단 바 (버튼 등) */}
      <WriteBottomLayout/>
    </form>
  );
}
