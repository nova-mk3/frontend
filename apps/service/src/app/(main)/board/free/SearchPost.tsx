import React from "react";
import Post from "./Post";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";

export default function SearchPost() {
  return (
    <>
      <ErrorBoundaryWrapper>
        <Post />
      </ErrorBoundaryWrapper>
    </>
  );
}
