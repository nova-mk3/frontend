import React from "react";
import DeferredComponent from "../errorBoundary/DeferredComponent";

export default function PendingFallbackUI() {
  return (
    <DeferredComponent>
      <div className="w-full h-[900px] animate-pulse bg-background02 mt-8 flex justify-center items-center">
        연결중 ...
      </div>
    </DeferredComponent>
  );
}
