import { cn } from "@nova/ui/lib/utils";
import React, { useEffect, useRef } from "react";

export default function EmailAutoCompleteItem({
  text,
  domain,
  onSelect,
  isFocused,
}: {
  text: string;
  domain: string;
  onSelect: (email: string) => void;
  isFocused: boolean;
}) {
  const atIndex = text.indexOf("@");
  const userPart = atIndex === -1 ? text : text.slice(0, atIndex);
  const autoEmail = `${userPart}@${domain}`;

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isFocused && scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isFocused]);

  return (
    <div
      className={cn(
        "cursor-pointer hover:bg-background02 py-3",
        isFocused && "bg-background02"
      )}
      ref={isFocused ? scrollRef : undefined}
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
