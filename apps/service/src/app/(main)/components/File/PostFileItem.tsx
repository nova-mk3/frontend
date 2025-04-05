import React from "react";
import { X } from "lucide-react";

interface FileItemPropsInput {
  name?: string;
  className?: string;
  onRemove: (index: number) => void;
  index: number;
}
type FileItemProps = FileItemPropsInput;

export default function PostFileItem({
  name = "임시파일이름.txt",
  className,
  onRemove,
  index,
}: FileItemProps) {
  return (
    <div className="bg-accent text-accent-foreground  rounded-md py-2 px-3 flex flex-row gap-2 t-s items-center cursor-pointer hover:bg-accent-foreground/10">
      <p>{name}</p>
      <X size={16} onClick={() => onRemove(index)} className="cursor-pointer" />
    </div>
  );

  return null;
}
