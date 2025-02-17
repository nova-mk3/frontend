import React from 'react'
import { X } from 'lucide-react';

interface FileItemPropsInput {
  name?: string;
  className?: string;
  onRemove: (id : string) => void;
  id : string;
}
type FileItemProps = FileItemPropsInput ;

export default function PostFileItem({ name="임시파일이름.txt", className, onRemove ,id } : FileItemProps) {
  

   return (
        <div className='bg-text02 text-background01 rounded-md py-2 px-4 flex flex-row gap-2 t-s items-center'>
            <p>{name}</p>
            <X size={16} onClick={()=> onRemove(id)} className='cursor-pointer'/>
        </div>
    ) 

  return null;
}
