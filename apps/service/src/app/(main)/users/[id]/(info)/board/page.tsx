import React from "react";
import Post from "./Post";
export const dynamic = "force-dynamic";
export default function page() {
  return (
    <div className="w-[80%] mx-auto mt-5">
      <Post />
    </div>
  );
}
