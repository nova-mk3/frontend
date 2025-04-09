"use client";
import { DownloadFilesAPI } from "@/src/api/board/file";
import { FileDown } from "lucide-react";
import React, { useState } from "react";
import { DownloadProgressModal } from "../Modal/DownloadProgressModal";

export interface FileItemProps {
  downloadUrl: string;
  originalFileName: string;
  id: string;
}

export default function ViewFileItem({
  id,
  downloadUrl,
  originalFileName,
}: FileItemProps) {
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = async () => {
    setIsModalOpen(true);
    try {
      await DownloadFilesAPI(id, (percent) => {
        setProgress(percent);
      });
    } finally {
      setTimeout(() => {
        setIsModalOpen(false);
        setProgress(0);
      }, 200);
    }
  };
  return (
    <>
      <div
        className="bg-accent text-accent-foreground  rounded-full py-2 px-3 flex flex-row gap-2 t-s items-center cursor-pointer hover:bg-accent-foreground/10"
        onClick={handleDownload}
      >
        <p>{originalFileName}</p>
        <span className="w-[1px] h-4 bg-line01 mx-1"></span>
        <FileDown className="w-4 h-4" />
      </div>
      <DownloadProgressModal progress={progress} isOpen={isModalOpen} />
    </>
  );
}
