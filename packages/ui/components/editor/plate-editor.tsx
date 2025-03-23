"use client";

import { Plate } from "@udecode/plate-common/react";
import { editorPlugins } from "./plugins/editor-plugins";
import { useCreateEditor } from "../editor/use-create-editor";
import { Editor, EditorContainer } from "../plate-ui/editor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
export function PlateEditor() {
  const [a,setA] = useState([
    {
      children: [
        {
          text: 'This is editable plain text with react and history plugins, just like a textarea!',
        },
      ],
      type: 'p',
    },
  ]);


  const editor = useCreateEditor({
    plugins: [...editorPlugins],
    value: a
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}
      onChange={({ value }) => {
        
       console.log(JSON.stringify(value));
      }} 
      >
        <EditorContainer className="outline-none mb-[100px]">
          <Editor variant="default" placeholder="내용을 입력하세요" />
        </EditorContainer>
      </Plate>
    </DndProvider>
  );
}
