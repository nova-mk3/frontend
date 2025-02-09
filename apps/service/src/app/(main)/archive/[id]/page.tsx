import React from "react";
import Title from "./components/Title";
import SubTitle from "./components/SubTitle";
import Content from "./components/Content";
import CommentLayout from "./components/CommentLayout";

import {FileListLayout,FileList} from "./components/FileListLayout";
import Aside from "./components/Aside";
interface Props {
  params: Promise<{ id: string }>;
}
export default async function page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex flex-col t-m w-[80%] mx-auto">
      <Title />
      <div className="flex flex-row gap-[50px]">
      <Aside/>
      <div className="flex flex-col gap-[20px] mx-auto flex-1">
      <SubTitle/>
      <FileListLayout>
        <FileList/>
      </FileListLayout>
      <Content />
      <CommentLayout />
      </div>
      </div>
    </div>
  );
}
