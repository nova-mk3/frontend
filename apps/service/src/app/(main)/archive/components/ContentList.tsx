import React from "react";
import ContentListItem from "./ContentListItem";

export default function ContentList() {
  return (
    <div className="flex flex-col mt-[15px]">
      <ContentListItem />
      <ContentListItem />
      <ContentListItem />
      <ContentListItem />
    </div>
  );
}
