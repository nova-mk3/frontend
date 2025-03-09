import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface FileItemPropsInput {
  name?: string;
  className?: string;
  onRemove: (index: number) => void;
  index: number;
  preview: string;
  children?: React.ReactNode;
}

// TODO: 사진클릭했을때 이미지 크게 보는 모달이 필요할듯

export default function PostFileItem({
  name = "",
  className,
  onRemove,
  index,
  preview,
  children,
}: FileItemPropsInput) {
  return (
    <div className={` w-[100px] h-[100px] relative rounded-md border-[1px]`}>
      {children}
      <Image
        src={preview}
        alt={name}
        fill={true}
        className="rounded-md object-cover z-10"
      />
      <X
        size={20}
        onClick={() => onRemove(index)}
        className="cursor-pointer bg-primary absolute -top-2 -right-2 rounded-full text-white z-20"
      />
    </div>
  );
}
