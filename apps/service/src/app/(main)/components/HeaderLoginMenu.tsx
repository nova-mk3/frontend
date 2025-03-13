import { logout } from "@/src/api/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@nova/ui/components/ui/dropdown-menu";
import { Separator } from "@nova/ui/components/ui/separator";
import Link from "next/link";
import React from "react";

interface Props {
  trigger: React.ReactNode;
  memberId: string;
}
export default function HeaderLoginMenu({ trigger, memberId }: Props) {
  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px] py-2">
        <DropdownMenuGroup>
          <Link href={`/users/${memberId}/edit`}>
            <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-background02">
              프로필 수정
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-background02">
            비밀번호 변경
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-background02">
            이메일 변경
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-background02">
            내 게시글
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-background02">
            내 건의함
          </DropdownMenuItem>
          <Separator className="my-1" />
          <DropdownMenuItem
            className="cursor-pointer px-4 py-2 hover:bg-background02"
            onClick={handleLogout}
          >
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
