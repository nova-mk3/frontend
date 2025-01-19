import React from 'react'
import { X } from 'lucide-react';

interface FileItemPropsInput {
  name?: string;
  className?: string;
  onRemove: (index: number) => void; // 'input' 모드에서는 필수
  index: number;
  mode: 'input';
}

interface FileItemPropsView {
  name?: string;
  className?: string;
  onRemove?: never; // 'view' 모드에서는 허용하지 않음
  index: number;
  mode: 'view';
}

type FileItemProps = FileItemPropsInput | FileItemPropsView;

export default function FileItem({ name="임시파일이름.txt", className, onRemove ,index,mode } : FileItemProps) {
  
  if(mode === 'input') {
      return (
        <div className='bg-text02 text-background01 rounded-md py-2 px-4 flex flex-row gap-2 t-s items-center'>
            <p>{name}</p>
            <X size={16} onClick={()=> onRemove(index)} className='cursor-pointer'/>
        </div>
      ) 
  }

  // TODO : 클릭시 다운로드 BACKEND API 완성
  else if(mode === 'view') {
    return (
      <div className='bg-text02 text-background01 rounded-md py-2 px-4 flex flex-row gap-2 t-s items-center'>
          <p>{name}</p>
      </div>
    )
  }

  return null;
}
