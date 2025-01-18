"use client";

import React from "react";
import {
  Plate,
  PlateContent,
  createPlateEditor,
} from "@udecode/plate-common/react";

// import { FixedToolbarButtons } from '../plate-ui/fixed-toolbar-buttons';

// "MyPlateEditor" 라는 이름으로 예시 컴포넌트 만듦
export default function MyPlateEditor() {
  // (2) 에디터 인스턴스 생성
  const editor = createPlateEditor({});

  return (
    <Plate editor={editor}>
      {/* <FixedToolbarButtons/> */}
      <PlateContent placeholder="Type something..." />
    </Plate>
  );
}
