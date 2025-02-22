"use client";
// import { PlateEditor } from "@nova/ui/components/editor/plate-editor"; //plate.js 라이브러리인데 일단은 제외
import React, { useEffect, useState } from "react";
import WriteBottomLayout from "../../components/WriteBottomLayout";
import {  useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  POST_TYPE_OPTIONS, PostType } from "@/src/constant/board";
import { IntegratedInput, IntegratedSchema } from "@/src/schema/integrated.schema";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { IntegradePostRequest, IntegratedBoardPost} from "@/src/api/board/integrated";
import { useRouter } from "next/navigation";
import { useBoardIdStore } from "@/src/store/BoardId";
import {  UploadFilesAPI } from "@/src/api/board/file";
import PostFileUploader from "../../components/File/PostFileUploader";
import { SelectFormField } from "@/src/app/(auth)/signup/components/SelectFormField";
import { Form } from "@nova/ui/components/ui/form";
import TextareaFormField from "@/src/app/(auth)/signup/components/TextareaFormField";
import TextareaFormContentField from "@/src/app/(auth)/signup/components/TextareaFormContentField";
import { postKeys } from "../query/postqueries";

export default function Page() {

  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const {INTEGRATED} =useBoardIdStore();

    const form = useForm<IntegratedInput>({
        resolver: zodResolver(IntegratedSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            content: "",
            category : "",
          },
      });

      
      const useIntegratedBoardMutation = useMutation({
        mutationFn: (data : IntegradePostRequest) => IntegratedBoardPost(data),
        onSuccess: (data : any) => {
          alert("글쓰기 성공");
          
          router.push(`/board/${watchcategory.toLocaleLowerCase()}/${data.id}`);
          

          // 전체글보기, 노바 홈 
          queryClient.invalidateQueries({
                      queryKey: postKeys.listmain(),
                      refetchType: 'inactive',
                    });
                    
          //내가 쓴 글의 리스트          
          queryClient.invalidateQueries({
                      queryKey: postKeys.typelists(watchcategory as PostType),
                      refetchType: 'inactive',
            });
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
              fileIds : [...response.data.map((file :any)=>{
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
          useIntegratedBoardMutation.mutate({
            title : data.title,
            content : data.content,
            postType : data.category,
            fileIds : [],
            boardId : INTEGRATED,
          })
        }
   
      };


       const watchcategory = useWatch({
          control: form.control,
          name: "category",
        });

       
    

  return (
    <Form {...form}>
    <form className="flex flex-col mt-5 w-[80%] h-[calc(100vh-86px)] mx-auto relative " onSubmit={form.handleSubmit(onSubmit)}>


      
     {/* TODO: 좀 더 컴포넌트 화 가능할듯! */}
     <SelectFormField
        form={form}
        name="category"
        label="카테고리"
        options={POST_TYPE_OPTIONS}
        className="w-[180px] mobile:w-full mb-5"
     />

      


      {/* 제목 입력란 */}
      <TextareaFormField
       form={form}
       name="title"
       placeholder="제목을 입력하세요"
       className="mt-5"
      /> 
      
      

      {/* 첨부 파일 영역 */} 
      <PostFileUploader selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>

      {/* 본문 스크롤 영역 */}
      {/* <PlateEditor /> */}

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
