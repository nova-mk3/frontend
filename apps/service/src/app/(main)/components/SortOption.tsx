import React from 'react'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
  } from "@nova/ui/components/ui/select";

  interface Props {
    value: string;
    onChange: (value: string) => void;
  }
  
export default function SelectSortComponent({onChange,value} : Props) {
  
   return (
    <Select
    value={value} // 현재 선택된 값
    onValueChange={onChange}
    >
          <SelectTrigger className="w-[180px] mobile:w-full">
            <SelectValue placeholder="정렬 선택" />
          </SelectTrigger>
          <SelectContent className="bg-background01">
            <SelectItem value="asc" className="cursor-pointer hover:bg-line01">
              오름차순
            </SelectItem>
            <SelectItem value="desc" className="cursor-pointer hover:bg-line01">
              내림차순
            </SelectItem>
            <SelectItem
              value="pop"
              className="cursor-pointer hover:bg-line01"
            >
              조회순
            </SelectItem>
          </SelectContent>
        </Select>
  )
}
