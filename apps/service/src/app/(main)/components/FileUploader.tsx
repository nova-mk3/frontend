import React, { ChangeEvent } from 'react';
import FilePlus from "@/public/image/FilePlus.svg";
import PostFileItem from './PostFileItem';

interface FileUploaderProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileUploader({ selectedFiles, setSelectedFiles }: FileUploaderProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = e.target.files;
    if (!files) return;

    const filesArray: File[] = Array.from(files);

    if (selectedFiles.length + filesArray.length > 10) {
      alert('최대 10개의 파일만 업로드할 수 있습니다.');
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    e.target.value = ''; // reset the file input
  };

  const handleRemoveFile = (index: number): void => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className='flex flex-col gap-2 my-5 t-m'>
      <div className="flex flex-row gap-2 items-center h-[30px] mb-2">
        <p className='h-s'>파일 선택</p>
        <p className="text-success mt-auto l-l ml-3">파일은 최대 10개까지 가능합니다</p>
      </div>
      <div className='flex flex-row flex-wrap gap-3'>
        {selectedFiles.length > 0 &&
          selectedFiles.map((file, index) => (
            <PostFileItem
              name={file.name}
              onRemove={handleRemoveFile}
              index={index}
              key={index}
            />
          ))}
        <label htmlFor="fileUpload" className="inline-flex cursor-pointer items-center">
          <FilePlus width={30} height={30} />
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".pdf, .jpg, .jpeg, .png"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        {selectedFiles.length === 0 && <p className='text-text02 flex items-center'>파일을 선택해주세요</p>}
      </div>
    </div>
  );
}
