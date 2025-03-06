"use client";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@nova/ui/components/ui/dropdown-menu";
import { Button } from "@nova/ui/components/ui/button";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export function Filter() {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<string | null>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mobile:w-full">
        <Button variant="outline">
          필터 <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[100px]">
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuLabel>필터</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={sortBy === "created"}
            onCheckedChange={() => setSortBy("created")}
          >
            생성일
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sortBy === "modified"}
            onCheckedChange={() => setSortBy("modified")}
          >
            수정일
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sortBy === "views"}
            onCheckedChange={() => setSortBy("views")}
          >
            조회수
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>정렬</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={sortDirection === "desc"}
            onCheckedChange={() => setSortDirection("desc")}
          >
            내림차순
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sortDirection === "asc"}
            onCheckedChange={() => setSortDirection("asc")}
          >
            오름차순
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
