import React from "react";
import ErrorBoundaryWrapper from "../../components/ErrorBoundary/ErrorBoundaryWrapper";
import Post from "./Post";

export default function SearchPost() {
  return (
    <>
      <ErrorBoundaryWrapper>
        <Post />
      </ErrorBoundaryWrapper>
    </>
  );
}
