import React from "react";

export default function EmailAutoCompleteItem({
  text,
  domain,
  onSelect,
}: {
  text: string;
  domain: string;
  onSelect: (email: string) => void;
}) {
  const SumEmailPlusDomain = text + domain;

  return (
    <div
      className="cursor-pointer hover:bg-background02 py-3"
      onMouseDown={() => {
        console.log("하이?");
        onSelect(SumEmailPlusDomain);
      }}
    >
      <span className="ml-1.5">{SumEmailPlusDomain}</span>
    </div>
  );
}
