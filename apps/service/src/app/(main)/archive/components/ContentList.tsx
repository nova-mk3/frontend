import React from "react";
import ContentListItem from "./ContentListItem";

export default function ContentList() {
  return (
    <div className="flex flex-col mt-[15px]">
      <ContentListItem href="/archive/1"/>
      <ContentListItem href="/archive/1"/>
      <ContentListItem href="/archive/1"/>
      <ContentListItem href="/archive/1"/>
    </div>
  );
}
