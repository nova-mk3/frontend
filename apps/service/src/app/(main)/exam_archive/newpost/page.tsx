"use client";
// import { PlateEditor } from "@nova/ui/components/editor/plate-editor"; //plate.js 라이브러리인데 일단은 제외
import React, { useEffect, useState } from "react";
import WriteBottomLayout from "../../components/WriteBottomLayout";
import {  useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  POST_TYPE, POST_TYPE_OPTIONS, PostType } from "@/src/constant/board";
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
import { ExamInput, ExamSchema } from "@/src/schema/exam.schema";
import { InputFormField } from "@/src/app/(auth)/components/InputFormField";
import { SEMESTER_OPTIONS } from "@/src/constant/exam";
import useYearRange from "@/src/libs/hooks/useYearRange";
import { postKeys } from "../../board/query/postqueries";
import { ArchivePost, ArchivePostRequest } from "@/src/api/board/exam";

export default function Page() {

  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const {CLUB_ARCHIVE} =useBoardIdStore();
  const currentYear = new Date().getFullYear();
  const years = useYearRange(2000, currentYear);
    const form = useForm<ExamInput>({
        resolver: zodResolver(ExamSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            content: "",
            semester : "",
            year : "",
            professorName : "",
            subject : "",
          },
      });
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
        let newTitle = '';
    
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
          newTitle += newTitle ? ` - ${semester}` : `${semester}`;
        }
    
        form.setValue("title" , newTitle ,{shouldValidate: true})
        
      }, [year, subject, professorName, semester]);

      
      const useIntegratedBoardMutation = useMutation({
        mutationFn: (data : ArchivePostRequest) => ArchivePost(data),
        onSuccess: (data : any) => {
          console.log(data);
          alert("글쓰기 성공");
          
          router.push(`/${POST_TYPE.EXAM_ARCHIVE.toLocaleLowerCase()}/${data.id}`);
          

      
                    
          //내가 쓴 글의 리스트          
          queryClient.invalidateQueries({
                      queryKey: postKeys.typelists(POST_TYPE.EXAM_ARCHIVE),
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

      const onSubmit = async(data: ExamInput) => {
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
              data : formData,
              POST_TYPE : POST_TYPE.EXAM_ARCHIVE
            }); 
            // 업로드 성공 후 다른 API 호출 예시
            useIntegratedBoardMutation.mutate({
              title : data.title,
              content : data.content,
              year : Number(data.year),
                subject : data.subject,
                semester : data.semester,
                professorName : data.professorName,
              fileIds : [...response.data.map((file :any)=>{
                return file.id;
              })],
              boardId : CLUB_ARCHIVE,
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
            year : Number(data.year),
            subject : data.subject,
            semester : data.semester,
            professorName : data.professorName,
            fileIds : [],
            boardId : CLUB_ARCHIVE,
          })
        }
   
      };

       
    

  return (
    <Form {...form}>
    <form className="flex flex-col mt-5 w-[80%] h-[calc(100vh-86px)] mx-auto relative gap-2" onSubmit={form.handleSubmit(onSubmit)}>


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
      <PostFileUploader selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>


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
