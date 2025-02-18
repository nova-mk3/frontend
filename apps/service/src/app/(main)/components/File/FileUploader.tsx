import React, { ChangeEvent, useEffect, useState } from 'react';
import FilePlus from "@/public/image/FilePlus.svg";
import PostFileItem from './PostFileItem';
import { useMutation } from '@tanstack/react-query';
import { DelelteFilesAPI, UploadFilesAPI } from '@/src/api/board/file';
import { usePathname } from 'next/navigation';
import { FileItemProps } from './ViewFileItem';


interface FileUploaderProps {
  files: FileItemProps[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<FileItemProps[]>>;
  POST_TYPE_OPTIONS: string;
}

export default function FileUploader({ files, setSelectedFiles,POST_TYPE_OPTIONS }: FileUploaderProps) {
  const [isDirty, setIsDirty] = useState(false);
   const useFileUploadMutation = useMutation({
          mutationFn: ( {data,POST_TYPE_OPTIONS} : { data : FormData, POST_TYPE_OPTIONS : string}) => UploadFilesAPI(data, POST_TYPE_OPTIONS),
          onSuccess(data : any) {
            setSelectedFiles((prevFiles) => [...prevFiles,...data.data]);
          }, 
          onError(error) {
            alert("파일 업로드 실패");
            console.log(error.message);
          }
    })
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
     console.log("파일인식")
    if (POST_TYPE_OPTIONS === ""){
      alert("카테고리를 선택해주세요");
      return;
    }
    //파일을 받아서 업로드 하는 로직을 만들어야함
    const files: FileList | null = e.target.files;
    if (!files) return;

    const filesArray: File[] = Array.from(files);

    if (files.length + filesArray.length > 10) {
      alert('최대 10개의 파일만 업로드할 수 있습니다.');
      return;
    }
    const formdata = new FormData();

    filesArray.forEach((file) => {
      formdata.append("files", file);
    });

    useFileUploadMutation.mutate({data : formdata,POST_TYPE_OPTIONS});
    e.target.value="";
  };

  const handleRemoveFile = async(id: string) => {
    
    try{
      await DelelteFilesAPI(id);
      setSelectedFiles(prevFiles => prevFiles.filter(file => file.id!== id));
    }catch(error : any){
      alert("파일 삭제 실패")
    }

  };

  return (
    <div className='flex flex-col gap-2 my-5 t-m'>
      <div className="flex flex-row gap-2 items-center h-[30px] mb-2">
        <p className='h-s'>파일 선택</p>
        <p className="text-success mt-auto l-l ml-3">파일은 최대 10개까지 가능합니다</p>
      </div>
      <div className='flex flex-row flex-wrap gap-3'>
        {files.length > 0 &&
          files.map((file, index) => (
            // <PostFileItem
            //   name={file.originalFileName}
            //   onRemove={handleRemoveFile}
            //   key={index}
            //   id={file.id}
            // />
            <></>
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
        {files.length === 0 && <p className='text-text02 flex items-center'>파일을 선택해주세요</p>}
      </div>
    </div>
  );
}
