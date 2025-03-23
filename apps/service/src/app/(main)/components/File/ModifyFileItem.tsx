import { X } from "lucide-react";
import React from "react";

export interface FileItemProps {
  downloadUrl: string;
  originalFileName: string;
  id: string;
  onRemove: (id: string) => void;
}

export default function ModifyFileItem({
  id,
  originalFileName,
  onRemove,
}: FileItemProps) {
  return (
    <div className="bg-accent text-accent-foreground  rounded-full py-2 px-3 flex flex-row gap-2 t-s items-center cursor-pointer hover:bg-accent-foreground/10">
      <p>{originalFileName}</p>
      <X size={16} onClick={() => onRemove(id)} className="cursor-pointer" />
    </div>
  );
}
