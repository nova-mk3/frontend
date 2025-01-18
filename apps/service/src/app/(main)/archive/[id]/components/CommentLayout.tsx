import React from "react";
import CommentTitle from "./CommentTitle";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default function CommentLayout() {
  return (
    <div className="flex flex-col gap-[20px]">
      <CommentTitle />
      <CommentForm />
      <CommentItem />
    </div>
  );
}
