
import { X } from 'lucide-react';
import React from 'react'

export interface FileItemProps{
  downloadUrl: string;
  originalFileName : string;
  id : string;
  onRemove: (id : string) => void;
}


export default function ModifyFileItem({ id ,downloadUrl, originalFileName,onRemove } : FileItemProps) {
    return (
      <div className='bg-text02 text-background01 rounded-md py-2 px-4 flex flex-row gap-2 t-s items-center cursor-pointer'>
          <p>{originalFileName}</p>
          <X size={16} onClick={()=> onRemove(id)} className='cursor-pointer'/>
      </div>
    )
}
