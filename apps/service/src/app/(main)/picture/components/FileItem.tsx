import React from 'react'
import { X } from 'lucide-react';
import Image from 'next/image';

interface FileItemPropsInput {
  name?: string;
  className?: string;
  onRemove: (index: number) => void; // 'input' 모드에서는 필수
  index: number;
  preview: string;
}



// TODO: 사진클릭했을때 이미지 크게 보는 모달이 필요할듯

export default function FileItem({ name="" , className, onRemove ,index,preview} : FileItemPropsInput) {
  console.log(index);
  return (
    <div className={` w-[100px] h-[100px] relative rounded-md `}>
      {
        index === 0 && (
        <div className='absolute left-0 bottom-0 w-full h-[24px] z-20 bg-text01 text-background01 t-s flex items-center justify-center rounded-b-md'>
        대표 사진
        </div>)
      }
      <Image
          src={preview}
          alt={name}
          fill={true}
          className="rounded-md object-cover z-10"
          />
        <X size={20} onClick={()=> onRemove(index)} className='cursor-pointer bg-primary absolute -top-2 -right-2 rounded-full text-white z-20'/>
    </div>
  );
}
