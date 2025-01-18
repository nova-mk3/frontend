import React from 'react'
import { X } from 'lucide-react';

interface FileItemProps {
    name?: string;
    className?: string;
    onRemove: (index: number) => void;
    index: number;
}

export default function FileItem({ name="임시파일이름.txt", className, onRemove,index } : FileItemProps) {
  return (
    <div className='bg-text02 text-background01 rounded-md py-2 px-4 flex flex-row gap-2 t-s items-center'>
        <p>{name}</p>
        <X size={16} onClick={()=> onRemove(index)} className='cursor-pointer'/>
    </div>
  )
}
