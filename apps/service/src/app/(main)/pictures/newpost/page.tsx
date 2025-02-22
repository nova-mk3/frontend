"use client";
import { Button } from "@nova/ui/components/ui/button";
// import { PlateEditor } from "@nova/ui/components/editor/plate-editor"; //plate.js 라이브러리인데 일단은 제외
import React, { useState } from "react";

import WriteBottomLayout from "../../components/WriteBottomLayout";
import FileUploader, { ImageFile } from "../components/FileUploader";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  OpinionSchema } from "@/src/schema/opinion.schema";
import { PictureInput } from "@/src/schema/picture.schema";
import { Form } from "@nova/ui/components/ui/form";
import TextareaFormField from "@/src/app/(auth)/signup/components/TextareaFormField";
import TextareaFormContentField from "@/src/app/(auth)/signup/components/TextareaFormContentField";
import { UploadFilesAPI } from "@/src/api/board/file";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PicturePost, PicturePostReqeust } from "@/src/api/board/picture";
import { POST_TYPE } from "@/src/constant/board";
import { useRouter } from "next/navigation";
import { postKeys } from "../../board/query/postqueries";
import { useBoardIdStore } from "@/src/store/BoardId";

export default function Page() {
      const router = useRouter();
      const queryClient = useQueryClient();
       const {INTEGRATED} =useBoardIdStore();
       const [selectedFiles, setSelectedFiles] = useState<ImageFile[]>([]);
    const form = useForm<PictureInput>({
        resolver: zodResolver(OpinionSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            content: "",
          },
      });




      const usePictureMutation = useMutation({
              mutationFn: (data : PicturePostReqeust) => PicturePost(data),
              onSuccess: (data : any) => {
                console.log(data);
                alert("글쓰기 성공");
                
                 router.push(`/${POST_TYPE.PICTURES.toLocaleLowerCase()}/${data.id}`);
                
      
                //내가 쓴 글의 리스트          
                queryClient.invalidateQueries({
                            queryKey: postKeys.typelists(POST_TYPE.PICTURES),
                            refetchType: 'inactive',
                  });
              },
              onError: (error) => {
      
                alert(error.message);
                console.log(error);
              },
            })
      
  
      const useFileUploadMutation = useMutation({
        mutationFn: ( {data,POST_TYPE} : { data : FormData, POST_TYPE : string}) => UploadFilesAPI(data, POST_TYPE),
      })

      const onSubmit = async(data: PictureInput) => {
        // 파일이 없을때는 파일 업로드 생략
        // 파일이 존재할때는 파일 업로드가 성공하면 게시글 생성
        const formData = new FormData();
  
        selectedFiles.forEach((file) => {
          formData.append("files", file.file);
        });
  
        if(selectedFiles.length > 0)
        {
          try {
            const response = await useFileUploadMutation.mutateAsync({
              data : formData,
              POST_TYPE : POST_TYPE.EXAM_ARCHIVE
            }); 
            // 업로드 성공 후 다른 API 호출 예시
            usePictureMutation.mutate({
              title : data.title,
              content : data.content,
              imageFileIds : [...response.data.map((file :any)=>{
                return file.id;
              })],
              boardId : INTEGRATED,
            })
          } catch (error) {
            alert("파일 업로드 실패");
            console.log(error);
          }
        }
        else{
          usePictureMutation.mutate({
            title : data.title,
            content : data.content,
            imageFileIds : [],
            boardId : INTEGRATED,
          })
        }
   
      };

  return (
    <Form {...form}>
    <form className="flex flex-col mt-5 w-[80%] h-[calc(100vh-86px)] mx-auto relative" onSubmit={form.handleSubmit(onSubmit)}>
      {/* 제목 입력란 */}
      <TextareaFormField
      form={form}
      name="title"
      placeholder="제목을 입력하세요"
      />
      

      {/* 첨부 파일 영역 */}
      <FileUploader selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/> 

      {/* 본문 스크롤 영역 */}
     <TextareaFormContentField
           form={form}
           name="content"
           placeholder="내용을 입력하세요"
        />

      {/* 하단 바 (버튼 등) */}
      <WriteBottomLayout/>
    </form>
    </Form>
  );
}
