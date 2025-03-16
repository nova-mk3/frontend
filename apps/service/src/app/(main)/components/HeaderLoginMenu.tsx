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
      {/* asChild를 써주면 태그에 클릭이 붙는게 아니라  자식 element에 클릭 이벤트가 붙는다 */}
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px] py-2">
        <DropdownMenuGroup>
          <Link href={`/users/${memberId}`}>
            <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-background02">
              마이페이지
            </DropdownMenuItem>
          </Link>
          <Link href={`/users/${memberId}/edit`}>
            <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-background02">
              설정
            </DropdownMenuItem>
          </Link>
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
