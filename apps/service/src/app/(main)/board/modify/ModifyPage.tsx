"use client";
import React, {  useEffect, useState } from "react";
import WriteBottomLayout from "../../components/WriteBottomLayout";
import { useForm } from "react-hook-form";
import { POST_TYPE_OPTIONS, PostType } from "@/src/constant/board";
import { IntegratedInput, IntegratedSchema } from "@/src/schema/integrated.schema";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import {  IntegratedBoardPut, IntegratedPutRequest} from "@/src/api/board/integrated";
import { useRouter } from "next/navigation";
import { useBoardIdStore } from "@/src/store/BoardId";
import { UploadFilesAPI } from "@/src/api/board/file";
import { postKeys, usePostDetailQuery } from "../query/postqueries";
import ModifyFileUploader from "../../components/File/ModifyFileUploader";
import { FileItemProps } from "../../components/File/ViewFileItem";
import TextareaFormContentField from "@/src/app/(auth)/signup/components/TextareaFormContentField";
import { Form } from "@nova/ui/components/ui/form";
import { SelectFormField } from "@/src/app/(auth)/signup/components/SelectFormField";
import TextareaFormField from "@/src/app/(auth)/signup/components/TextareaFormField";
import { zodResolver } from "@hookform/resolvers/zod";

interface props{
    postId : string;
    postType : string;
}
export default function ModifyPage({postId , postType} : props) {
    const {INTEGRATED} = useBoardIdStore();

  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [originFiles,setOriginFiles] = useState<FileItemProps[]>([]);
  const [willDeleteFiles, setwillDeleteFiles] = useState<string[]>([]);
  const queryClient = useQueryClient();

   const {data } = usePostDetailQuery(postId, INTEGRATED);
   
    const form = useForm<IntegratedInput>({
        resolver: zodResolver(IntegratedSchema),
        mode: "onChange",
        defaultValues: {
            title: data.title,
            content: data.content,
            category : postType,
          },
      });

      useEffect( ()=>{
        setOriginFiles([...data.files]);
      },[])
      
      const useIntegratedBoardMutation = useMutation({
        mutationFn: (data : IntegratedPutRequest) => IntegratedBoardPut(data),
        onSuccess: (data : any) => {
          alert("변경 성공");

          // 내 수정사항은 나만 다시보면 된다 -> api 호출 최적화
          queryClient.setQueryData(
            postKeys.detail(postId),
             data
          )

          // 변경한 리스트 재호출
          queryClient.invalidateQueries(
            {
              queryKey : postKeys.lists(),
              refetchType : 'inactive',
            }
          );
          
          router.push(`/board/${postType.toLocaleLowerCase()}/${data.id}`);
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

            const temp = [...response.data.map((file :any)=>{
                return file.id;
            })];
            // 업로드 성공 후 다른 API 호출 예시
            useIntegratedBoardMutation.mutate({
              title : data.title,
              content : data.content,
              fileIds : [...originFiles.map( (file)=> file.id), ...temp],
              deleteFileIds : [...willDeleteFiles],
              postId : postId,
              boardId : INTEGRATED,
            })
          } catch (error) {
            alert("파일 업로드 실패");
            console.log(error);
          }
        }
        else{
            console.log(...originFiles.map( (file)=> file.id));
          useIntegratedBoardMutation.mutate({
            title : data.title,
            content : data.content,
              fileIds : [...originFiles.map( (file)=> file.id)],
              deleteFileIds : [...willDeleteFiles],
              postId : postId,
              boardId : INTEGRATED,
          })
        }
   
      };


  return (
    <Form {...form}>
    <form className="flex flex-col mt-5 w-[80%] h-[calc(100vh-86px)] mx-auto relative" onSubmit={form.handleSubmit(onSubmit)}>


      
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
