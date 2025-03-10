import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@nova/ui/components/ui/select";
import { useQueryParams } from "./useQueryParams";

export default function SelectSortComponent() {
  const { searchType, setSearchType } = useQueryParams();
  return (
    <Select
      value={searchType} // 현재 선택된 값
      onValueChange={(value) => {
        setSearchType(value);
      }}
    >
      <SelectTrigger className="w-[180px] mobile:w-full">
        <SelectValue placeholder="정렬 선택" />
      </SelectTrigger>
      <SelectContent className="bg-background01">
        <SelectItem value="TITLE" className="cursor-pointer">
          제목
        </SelectItem>
        <SelectItem value="CONTENT" className="cursor-pointer">
          내용
        </SelectItem>
        <SelectItem value="ALL" className="cursor-pointer">
          제목+내용
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
