
import { SuggestionDownloadFilesAPI } from '@/src/api/board/suggestion';
import { FileDown } from 'lucide-react';
import React from 'react'

export interface FileItemProps{
  downloadUrl: string;
  originalFileName : string;
  id : string;
}


export default function ViewFileItem({ id ,downloadUrl, originalFileName } : FileItemProps) {

    const handleDownload = async()=>{
       await SuggestionDownloadFilesAPI(id,originalFileName );
    }
    return (
      <div className='bg-text02 text-background01 rounded-full py-2 px-3 flex flex-row gap-2 text-sm items-center cursor-pointer hover:bg-text02/90' onClick={handleDownload}>
          <p>{originalFileName}</p>
          <span className='w-[1px] h-4 bg-line01 mx-1'></span>
          <FileDown className="w-3 h-3" />
      </div>
    )
}
