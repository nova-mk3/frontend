import React from "react";
import ContentListItem from "./ContentListItem";
import Item from "./Item";

export default function ContentList() {
  return (
    <div className="flex flex-col">
      <Item href="/archive/1"/>
      <Item href="/archive/1"/>
      <Item href="/archive/1"/>
      <Item href="/archive/1"/>
      <Item href="/archive/1"/>
    </div>
  );
}
