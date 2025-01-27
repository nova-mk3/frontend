"use client";
import { Button } from "@nova/ui/components/ui/button";
// import { PlateEditor } from "@nova/ui/components/editor/plate-editor"; //plate.js 라이브러리인데 일단은 제외
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Input } from "@nova/ui/components/ui/input";
import WriteBottomLayout from "../../components/WriteBottomLayout";
import FileUploader from "../components/FileUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OpinionInput, OpinionSchema } from "@/src/schema/opinion.schema";
import { Form } from "@nova/ui/components/ui/form";

export default function Page() {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm<OpinionInput>({
        resolver: zodResolver(OpinionSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            content: "",
          },
      });


      const onSubmit = (data: OpinionInput) => {
        console.log("작성된 데이터:", data);
        
      };
      
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [term,setTerm] = useState("");


  return (
    <form className="flex flex-col mt-5 w-[80%] h-[calc(100vh-86px)] mx-auto relative" onSubmit={handleSubmit(onSubmit)}>
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
      <FileUploader/> 

      {/* 본문 스크롤 영역 */}
      {/* <PlateEditor /> */}
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
