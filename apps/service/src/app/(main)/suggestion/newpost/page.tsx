"use client";
import { Button } from "@nova/ui/components/ui/button";
// import { PlateEditor } from "@nova/ui/components/editor/plate-editor"; //plate.js 라이브러리인데 일단은 제외
import React, { useState } from "react";

import WriteBottomLayout from "../../components/WriteBottomLayout";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuggestionInput, SuggestionSchema } from "@/src/schema/suggestion.schema";
import { Form } from "@nova/ui/components/ui/form";
import TextareaFormField from "@/src/app/(auth)/signup/components/TextareaFormField";
import TextareaFormContentField from "@/src/app/(auth)/signup/components/TextareaFormContentField";
import { RadioFormField } from "@/src/app/(auth)/signup/components/RadioFormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SuggestionFileUploadAPI, SuggestionPost, SuggestionPostRequest } from "@/src/api/board/suggestion";
import { POST_TYPE } from "@/src/constant/board";
import { useRouter } from "next/navigation";
import PostFileUploader from "../../components/File/PostFileUploader";
import { suggestionKeys } from "../query/queries";
import Link from "next/link";
import { ChevronLeft, MessageSquare } from "lucide-react";
import { Separator } from "@nova/ui/components/ui/separator";

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
            private: true
          },
      });


      
      const useSuggestionPostMutation = useMutation({
        mutationFn: (data : SuggestionPostRequest) => SuggestionPost(data),
        onSuccess: (data : any) => {
          console.log(data);
          
          router.push(`/${POST_TYPE.SUGGESTION.toLocaleLowerCase()}/${data.id}`);

      
                    
          //내가 쓴 글의 리스트          
         queryClient.invalidateQueries({
                      queryKey: suggestionKeys.list,
                      refetchType: 'inactive',
          });
        },onError: (error) => {

          alert(error.message);
          console.log(error);
        },
      })

      const useFileUploadMutation = useMutation({
        mutationFn: ( {data} : { data : FormData}) => SuggestionFileUploadAPI(data),
      })

      const onSubmit = async(data: SuggestionInput) => {
        console.log(data);
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
              data : formData
            }); 
            // 업로드 성공 후 다른 API 호출 예시
            useSuggestionPostMutation.mutate({
              title : data.title,
              content : data.content,
              isPrivate : data.private,
              fileIds : [...response.data.map((file :any)=>{
                return file.id;
              })],
            })
          } catch (error) {
            alert("파일 업로드 실패");
            console.log(error);
          }
        }
        else{
          useSuggestionPostMutation.mutate({
            title : data.title,
            content : data.content,
            isPrivate : data.private,
            fileIds : [],
          })
        }
   
      };


  return (

    
    <Form {...form}>
      
    <form className="flex flex-col gap-7" onSubmit={form.handleSubmit(onSubmit)}>
    <div className="border-b bg-background01 t-m">
        <div className="w-[80%] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="/suggestion"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-medium ">건의함</span>
              </Link>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">새 건의사항 작성</span>
              </div>
            </div>
            <Button type="submit">
             등록하기
            </Button>
          </div>
        </div>
      </div>
     

     <div className="flex flex-col gap-7  w-[80%] h-[calc(100vh-86px)] mx-auto relative">
    <RadioFormField
      form={form}
      name="private"
      label="건의내용 공개여부"
      options={[{value : true, label : "비공개"}, {value : false, label : "공개"}]}
      />

     {/* 첨부 파일 영역 */} 
    <PostFileUploader selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>

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

      {/* 하단 바 (버튼 등)
      <WriteBottomLayout
      postBtnname="건의"
      /> */}
     </div> 
    </form>
    </Form>
    );
}
