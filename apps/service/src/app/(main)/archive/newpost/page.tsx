"use client";
import { Button } from "@nova/ui/components/ui/button";
// import { PlateEditor } from "@nova/ui/components/editor/plate-editor"; //plate.js 라이브러리인데 일단은 제외
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Tags from "../components/Tags";
import { Input } from "@nova/ui/components/ui/input";
import FilePlus from "@/public/image/FilePlus.svg";
import FileUploader from "../../components/FileUploader";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@nova/ui/components/ui/select"
import WriteBottomLayout from "../../components/WriteBottomLayout";
import useYearRange from "@/src/libs/hooks/useYearRange";

export default function Page() {

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [term,setTerm] = useState("");
  const [year,setYear] = useState("");

  const currentYear = new Date().getFullYear();
  const years = useYearRange(2000, currentYear);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const handleProfessorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfessorName(e.target.value);
  }

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectName(e.target.value);
  }

  useEffect(() => {
    let newTitle = '';

    // year가 있다면 맨 앞에 배치
    if (year) {
      // 형식을 원하시는 대로 조정해 보세요. (예: [2023] 과 같이 사용하거나 그냥 2023)
      newTitle += `[${year}]`;
    }

    if (subjectName) {
      // 이미 year가 들어갔다면 그 뒤에 공백을 추가한 후 [subjectName]를 붙임
      newTitle += newTitle ? ` [${subjectName}]` : `[${subjectName}]`;
    }

    if (professorName) {
      // 기존에 무언가가 있다면 앞에 공백 하나, 없다면 그냥 교수 이름
      newTitle += newTitle ? ` ${professorName}` : `${professorName}`;
    }

    if (term) {
      // 기존에 무언가가 있다면 ' - ' 붙여서 term, 없다면 그냥 term
      newTitle += newTitle ? ` - ${term}` : `${term}`;
    }

    setTitle(newTitle);
    
  }, [year, subjectName, professorName, term]);
  

  return (
    <div className="flex flex-col mt-5 w-[80%] h-[calc(100vh-86px)] mx-auto relative ">
      {/* 제목 입력란 */}
      <div className="flex-none border-line01 border-b-[1px] pb-5">
        <TextareaAutosize
          className="flex w-full h-[40px] h-l resize-none outline-none cursor-not-allowed"
          placeholder="제목은 자동으로 작성됩니다"
          defaultValue={title}
          onChange={handleTitleChange}
          readOnly={true}
        />
      </div>

      <div className="flex flex-col space-y-3 mt-3">
      
      <div>
        <label className="t-m !font-bold">과목명</label>
        <Input placeholder="과목명을 입력해주세요" defaultValue={subjectName} onChange={handleSubjectChange}/>
      </div>
      <div>
        <label className="t-m !font-bold">교수명</label>
        <Input placeholder="교수명을 입력해주세요" defaultValue={professorName} onChange={handleProfessorChange}/>
      </div>

      <div className="flex flex-row gap-5">

      <div>
       {/* 학기 선택(아직 value를 정하지 않음)*/}
       <label className="t-m !font-bold">년도</label>
       <Select onValueChange={setYear} defaultValue={year}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="년도 선택"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

    {/* 학기 선택(아직 value를 정하지 않음)*/}
    <div>
    <label className="t-m !font-bold">학기</label>
       <Select onValueChange={setTerm} defaultValue={term}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="학기 선택"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1학기">1학기</SelectItem>
          <SelectItem value="2학기">2학기</SelectItem>
          <SelectItem value="여름학기">여름학기</SelectItem>
          <SelectItem value="겨울학기">겨울학기</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
      </div>

      </div>

      {/* 첨부 파일 영역 */} 
      {/* <FileUploader/> */}

      {/* 본문 스크롤 영역 */}
      {/* <PlateEditor /> */}
      <div className="flex-1 overflow-y-auto mb-[80px] border-line01 border-[1px] p-5 rounded-md">
      <TextareaAutosize
          className="flex w-full t-m resize-none outline-none h-[40px] overflow-hidden"
          placeholder="내용을 입력하세요"
          defaultValue={content}
          onChange={handleContentChange}
        />
      </div>

      {/* 하단 바 (버튼 등) */}
       <WriteBottomLayout/>

    </div>
  );
}
