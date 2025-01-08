import React from "react";
import CommentTitle from "./CommentTitle";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentLayout() {
  return (
    <div className="flex flex-col gap-[20px]">
      <CommentTitle />
      <CommentForm />
      <CommentList />
    </div>
  );
}
