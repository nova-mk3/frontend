import React from "react";
import { Pencil, Trash2, CircleX } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuClose,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { EllipsisVertical } from "lucide-react";

export default function Kebab() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={20} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <div className="flex flex-row items-center justify-center gap-2">
            <Pencil size={16} />
            <span>수정하기</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-row items-center justify-center gap-2">
            <Trash2 size={16} />
            <span>삭제하기</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuClose>
          <div className="flex flex-row items-center justify-center gap-2">
            <CircleX size={16} />
            <span>닫기</span>
          </div>
        </DropdownMenuClose>
      </DropdownMenuGroup>
    </DropdownMenu>
  );
}
