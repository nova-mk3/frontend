"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@nova/ui/components/ui/dropdown-menu";
import { Button } from "@nova/ui/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useQueryParams } from "../../hooks/useQueryParams";
export function Filter() {
  const { sortBy, sortDirection, setSortBy, setSortDirection } =
    useQueryParams();

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
            checked={sortBy === "createdTime"}
            onCheckedChange={() => setSortBy("createdTime")}
          >
            생성일
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sortBy === "modifiedTime"}
            onCheckedChange={() => setSortBy("modifiedTime")}
          >
            수정일
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sortBy === "viewCount"}
            onCheckedChange={() => setSortBy("viewCount")}
          >
            조회수
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
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
