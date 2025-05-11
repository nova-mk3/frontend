import React from "react";
import ViewFileItem, { FileItemProps } from "./ViewFileItem";

interface FileListProps {
  files: FileItemProps[];
}

export function FileList({ files }: FileListProps) {
  if (!files || files.length === 0)
    return <p className="text-text02">저장된 파일이 없습니다</p>;

  if (files.length > 0) {
    return (
      <div className="flex flex-row gap-2 flex-wrap">
        {files.map((file, index) => (
          <ViewFileItem
            key={index}
            id={file.id}
            downloadUrl={file.downloadUrl}
            originalFileName={file.originalFileName}
          />
        ))}
      </div>
    );
  }
}

interface FileListLayout {
  children?: React.ReactNode;
}

export function FileListLayout({ children }: FileListLayout) {
  return <div className="flex flex-col">{children}</div>;
}
