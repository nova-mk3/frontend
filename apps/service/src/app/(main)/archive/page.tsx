"use client";
import React, { useState } from "react";
import Title from "./components/Title";
import ContentList from "./components/ContentList";

export default function page() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col t-m w-[80%] mx-auto">
      <Title />
      <ContentList />
    </div>
  );
}
