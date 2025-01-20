import React from 'react'
import FileItem from '../../../components/FileItem'

interface FileListProps {
    files?: File[]
}


export function FileList( {files} : FileListProps) {

    const a = (index: number) =>{}
    if(!files || files.length === 0) return <p className='text-text02 p-1'>저장된 파일이 없습니다</p>

    if(files.length > 0){
    return (
        <div className='flex flex-row gap-2 flex-wrap'>{
            files.map( (file,index) => (
                    <FileItem index={index} name={file.name} mode="view"/>
            ))}
        
            </div>
            )
      
    }

}

interface FileListLayout {
    children?: React.ReactNode;
}

export function FileListLayout({children} : FileListLayout) {
    return (
        <div className='flex flex-col'>
        {children}
        </div>)
}
