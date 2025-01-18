"use client";

import { Plate } from "@udecode/plate-common/react";
import { editorPlugins } from "./plugins/editor-plugins";
import { useCreateEditor } from "../editor/use-create-editor";
import { Editor, EditorContainer } from "../plate-ui/editor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export function PlateEditor() {
  const editor = useCreateEditor({
    plugins: [...editorPlugins],
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorContainer className="outline-none mb-[100px]">
          <Editor variant="default" placeholder="내용을 입력하세요" />
        </EditorContainer>
      </Plate>
    </DndProvider>
  );
}
