import React from "react";
import { EmailList } from "../../utils/email";
import EmailAutoCompleteItem from "./EmailAutoCompleteItem";

interface Props {
  text: string;
  items: typeof EmailList;
  focusIdx: number;
  onSelect: (email: string) => void;
}
export default function EmailAutoComplete({
  text,
  onSelect,
  items,
  focusIdx,
}: Props) {
  if (text.length === 0 || items.length === 0) return null;

  return (
    <div className="absolute z-50 top-full flex flex-col w-full h-[150px] overflow-y-auto  t-m bg-background01 border-[1px] border-background02">
      {items.map((list, idx) => (
        <EmailAutoCompleteItem
          key={list.id}
          text={text}
          domain={list.domain}
          onSelect={onSelect}
          isFocused={idx === focusIdx}
        />
      ))}
    </div>
  );
}
