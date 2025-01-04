import React from "react";
import Title from "./components/Title";
import Like from "./components/Like";

export default function page() {
  return (
    <div className="flex flex-col t-m w-[80%] mx-auto">
      <Title />
      <Like isLiked={false} count={1} />
    </div>
  );
}
