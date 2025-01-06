import React from "react";
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
          {" "}
          <span>수정하기</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <span>삭제하기</span>
        </DropdownMenuItem>
        <DropdownMenuClose>
          <span>닫기</span>
        </DropdownMenuClose>
      </DropdownMenuGroup>
    </DropdownMenu>
  );
}
