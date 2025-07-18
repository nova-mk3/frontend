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
  const atIndex = text.indexOf("@");
  const userPart = atIndex === -1 ? text : text.slice(0, atIndex);
  const autoEmail = `${userPart}@${domain}`;

  return (
    <div
      className="cursor-pointer hover:bg-background02 py-3"
      onMouseDown={(e) => {
        // mouseDown 이후의 이벤트 막기 -> blur 이벤트를 막아서 focus 유지하기!
        e.preventDefault();
        onSelect(autoEmail);
      }}
    >
      <span className="ml-1.5">{autoEmail}</span>
    </div>
  );
}
