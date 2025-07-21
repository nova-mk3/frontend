"use client";

import React, { useEffect, useState } from "react";
import { SimpleProfileQueryOptions } from "../../(main)/users/[id]/query/options";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";

type CachedFile = {
  folder: string;
  file: string; // ex: abc123/img123.avif
  filename: string; // ex: img123.avif
  ext: string;
  size: number;
  created: string; // ISO string from API
  accessed: string; // ISO string from API
  preview: string; // base64 image
};

export default function Page() {
  const { data: simpleProfile, isLoading } = useQuery(
    SimpleProfileQueryOptions()
  );

  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<CachedFile[]>([]);

  useEffect(() => {
    const getCacheImages = async () => {
      try {
        setIsDataLoading(true);
        const res = await fetch("/api/cache/images", { method: "GET" });
        const data = await res.json();

        if (!res.ok) {
          console.error("캐시 이미지 요청 에러");
          return;
        }

        setFiles(data); // 시간이 걸릴 수 있음
      } catch (err) {
        console.error("이미지 불러오기 실패", err);
      } finally {
        setIsDataLoading(false); // 완료 후에 해제
      }
    };
    if (!isLoading) {
      getCacheImages();
    }
  }, [isLoading]);

  const handleDelete = async (filePath: string) => {
    try {
      await fetch("/api/cache/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: filePath }),
      });
      setFiles((prev) => prev.filter((f) => f.file !== filePath));
      alert("삭제되었습니다.");
    } catch (err: unknown) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-row gap-4 items-center justify-center animate-pulse mt-24">
        <div className="w-5 h-5 bg-primary rounded-full"></div>
        <div className="w-5 h-5 bg-primary rounded-full"></div>
        <div className="w-5 h-5 bg-primary rounded-full"></div>
      </div>
    );
  }

  if (simpleProfile === null) {
    return (
      <div className="w-full h-[900px] flex items-center justify-center flex-col gap-2">
        로그인 해야합니다.
        <Link
          href="/signup"
          className="flex flex-row gap-2 items-center text-primary"
        >
          <MoveLeftIcon size={18} /> 로그인 하러 가기
        </Link>
      </div>
    );
  }

  if (isDataLoading) {
    return (
      <div className="flex flex-col gap-6 items-center mt-24">
        <div>데이터를 불러오고 있습니다.</div>
        <div className="flex flex-row gap-4 items-center justify-center animate-pulse">
          <div className="w-5 h-5 bg-primary rounded-full"></div>
          <div className="w-5 h-5 bg-primary rounded-full"></div>
          <div className="w-5 h-5 bg-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 w-full min-h-[750px]">
      <h1 className="text-2xl font-bold">📦 이미지 캐시 목록</h1>
      {files.length === 0 ? (
        <div className="text-gray-500">현재 캐시된 이미지가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <div
              key={file.file}
              className="border rounded p-4 flex flex-col gap-2 shadow"
            >
              <img
                src={file.preview}
                alt={file.filename}
                className="w-full h-auto rounded object-contain"
              />
              <div className="text-sm font-medium break-all">
                {file.filename}
              </div>
              <div className="text-sm text-gray-500">
                {file.ext.toUpperCase()} · {(file.size / 1024).toFixed(1)} KB
              </div>
              <div className="text-xs text-gray-400">
                생성일: {new Date(file.created).toLocaleString()}
              </div>
              {/* <div className="text-xs text-gray-400">
                접근일: {new Date(file.accessed).toLocaleString()}
              </div> */}
              <button
                onClick={() => handleDelete(file.file)}
                className="bg-danger text-white px-3 py-1 rounded text-sm mt-auto"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
