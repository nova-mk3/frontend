import React from "react";
import Title from "./components/Title";
import SubTitle from "./components/SubTitle";
import Content from "./components/Content";
import Comment from "./components/Comment";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex flex-col t-m w-[80%] mx-auto gap-[20px]">
      <Title />
      <SubTitle />
      <Content />
      <Comment />
    </div>
  );
}
