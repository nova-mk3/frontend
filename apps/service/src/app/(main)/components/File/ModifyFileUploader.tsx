"use client";
import FilePlus from "@/public/image/FilePlus.svg";
import React, { ChangeEvent } from "react";
import PostFileItem from "./PostFileItem";
import { FileItemProps } from "./ViewFileItem";
import ModifyFileItem from "./ModifyFileItem";

interface props {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;

  originFiles: FileItemProps[];
  setOriginFiles: React.Dispatch<React.SetStateAction<FileItemProps[]>>;

  willdeletedFiles: string[];
  setwillDeleteFiles: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function ModifyFileUploader({
  selectedFiles,
  setSelectedFiles,
  setOriginFiles,
  originFiles,
  setwillDeleteFiles,
}: props) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = e.target.files;
    if (!files) return;

    const filesArray: File[] = Array.from(files);

    // preview: URL.createObjectURL(file), 이게 미리보기를 만드는 코드 -> 나중에 수정할 것
    // 현재 선택된 파일 수와 새로 추가하려는 파일 수의 합이 10을 초과하지 않는지 확인
    if (originFiles.length + selectedFiles.length + filesArray.length > 10) {
      alert("최대 10개의 파일만 업로드할 수 있습니다.");
      return;
    }

    // 파일 추가
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);

    // 파일 입력 초기화 (같은 파일을 다시 선택할 수 있도록)
    e.target.value = "";
  };

  const handleRemoveFile = (index: number): void => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleRemoveFiles = (id: string): void => {
    setOriginFiles((prev) => prev.filter((file) => file.id !== id));
    setwillDeleteFiles((prev) => [...prev, id]);
  };

  return (
    <div className="flex flex-col gap-2  t-m">
      <div className="flex flex-row gap-2 items-center h-[30px] mb-2">
        <p className="t-l">첨부파일</p>
        <p className="text-success mt-auto l-l ml-3">
          파일은 최대 10개까지 가능합니다
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        {originFiles.map((file) => (
          <ModifyFileItem
            downloadUrl={file.downloadUrl}
            id={file.id}
            originalFileName={file.originalFileName}
            onRemove={handleRemoveFiles}
            key={file.id}
          />
        ))}

        {selectedFiles.length > 0 &&
          selectedFiles.map((file, index) => (
            <PostFileItem
              name={file.name}
              onRemove={handleRemoveFile}
              index={index}
              key={index}
            />
          ))}
        <label
          htmlFor="fileUpload"
          className="inline-flex cursor-pointer items-center"
        >
          <FilePlus width={30} height={30} />
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".pdf, .jpg, .jpeg, .png, .mp4, .mov, .zip"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        {selectedFiles.length === 0 && (
          <p className="text-text02 flex items-center">파일을 선택해주세요</p>
        )}
      </div>
    </div>
  );
}
