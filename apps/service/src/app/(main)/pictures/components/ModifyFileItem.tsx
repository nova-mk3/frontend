import { X } from "lucide-react";
import React from "react";
import Image from "next/image";
export interface ImageItemProps {
  height: number;
  width: number;
  originalFileName: string;
  imageurl: string;
  id: string;
  onRemove: (id: string) => void;
  children?: React.ReactNode;
}

export default function ModifyFileItem({
  id,
  originalFileName,
  onRemove,
  imageurl,
  children,
}: ImageItemProps) {
  return (
    <div className={` w-[100px] h-[100px] relative rounded-md border-[1px]`}>
      {children}
      <Image
        src={imageurl.replace("/file", "")}
        alt={originalFileName}
        fill={true}
        className="rounded-md object-cover z-10"
      />
      <X
        size={20}
        onClick={() => onRemove(id)}
        className="cursor-pointer bg-primary absolute -top-2 -right-2 rounded-full text-white z-20"
      />
    </div>
  );
}
