import React from "react";
import { EmailList } from "../../utils/email";
import EmailAutoCompleteItem from "./EmailAutoCompleteItem";

interface Props {
  text: string;
  onSelect: (email: string) => void;
}
export default function EmailAutoComplete({ text, onSelect }: Props) {
  return (
    <div className="absolute z-50 top-full flex flex-col w-full h-[150px] overflow-y-auto  t-m bg-background01 border-[1px] border-background02">
      {EmailList.map((list) => (
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
