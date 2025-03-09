import React, { ChangeEvent, useState } from "react";
import FilePlus from "@/public/image/FilePlus.svg";
import PostFileItem from "./PostFileItem";

export interface ImageFile {
  file: File;
  preview: string;
}

interface props {
  selectedFiles: ImageFile[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}

export default function PostFileUploader({
  selectedFiles,
  setSelectedFiles,
}: props) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = e.target.files;
    if (!files) return;

    const filesArray: ImageFile[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    if (selectedFiles.length + filesArray.length > 10) {
      alert("최대 10개의 파일만 업로드할 수 있습니다.");
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    e.target.value = "";
  };

  const handleRemoveFile = (index: number): void => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2 t-m">
      <div className="flex flex-row gap-2 items-center h-[30px] mb-2">
        <p className="t-l">첨부파일</p>
        <p className="text-success mt-auto l-l ml-3">
          파일은 최대 10개까지 가능합니다
        </p>
        <p className="text-success mt-auto l-l ml-3">
          {" "}
          {selectedFiles.length} / 10
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-5">
        {selectedFiles.length > 0 &&
          selectedFiles.map((file, index) => (
            <PostFileItem
              name={file.file.name}
              onRemove={handleRemoveFile}
              index={index}
              key={index}
              preview={file.preview}
            >
              {index === 0 && (
                <div className="absolute left-0 bottom-0 w-full h-[24px] z-20 bg-text01 text-background01 t-s flex items-center justify-center rounded-b-md">
                  대표 사진
                </div>
              )}
            </PostFileItem>
          ))}
        <label
          htmlFor="fileUpload"
          className="inline-flex cursor-pointer items-center justify-center w-[100px] h-[100px] rounded-lg border-primary border-[3px] hover:scale-[1.03]"
        >
          <FilePlus width={50} height={50} />
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".jpg, .jpeg, .png"
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
