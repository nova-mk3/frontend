"use client";
import React, { useState } from "react";
import Title from "./components/Title";
import Like from "./components/Like";

export default function page() {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="flex flex-col t-m w-[80%] mx-auto">
      <Title />
      <Like isLiked={isLiked} count={1} onLikeToggle={toggleLike} />
    </div>
  );
}
