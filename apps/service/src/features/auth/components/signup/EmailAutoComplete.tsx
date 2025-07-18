import React from "react";
import { EmailList } from "../../utils/email";
import EmailAutoCompleteItem from "./EmailAutoCompleteItem";

interface Props {
  text: string;
  onSelect: (email: string) => void;
}
export default function EmailAutoComplete({ text, onSelect }: Props) {
  const atIndex = text.indexOf("@");
  let domainSearch = atIndex === -1 ? "" : text.slice(atIndex + 1);

  // 골뱅이가 여러개일 때 체크
  if (domainSearch.includes("@")) {
    let splitAt = domainSearch.split("@");
    if (isNonEmptyArray(splitAt)) {
      domainSearch = splitAt[0];
    }
  }

  const filteredEmailList =
    atIndex === -1
      ? EmailList
      : EmailList.filter((list) => list.domain.startsWith(domainSearch));
  if (text.length === 0) return null;
  if (filteredEmailList.length === 0) return null;
  return (
    <div className="absolute z-50 top-full flex flex-col w-full h-[150px] overflow-y-auto  t-m bg-background01 border-[1px] border-background02">
      {filteredEmailList.map((list) => (
        <EmailAutoCompleteItem
          key={list.id}
          text={text}
          domain={list.domain}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function isNonEmptyArray<T>(arr: T[]): arr is [T, ...T[]] {
  return arr.length > 0;
}
