import { DownloadFilesAPI } from '@/src/api/board/file';
import React from 'react'

export interface FileItemProps{
  downloadUrl: string;
  originalFileName : string;
  id : string;
}


export default function ViewFileItem({ id ,downloadUrl, originalFileName } : FileItemProps) {

    const handleDownload = async()=>{
       await DownloadFilesAPI(id);
    }
    return (
      <div className='bg-muted text-muted-foreground rounded-md py-2 px-4 flex flex-row gap-2 t-s items-center cursor-pointer' onClick={handleDownload}>
          <p>{originalFileName}</p>
      </div>
    )
}
