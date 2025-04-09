import React from "react";
import Post from "./Post";
import ErrorBoundaryWrapper from "../../components/ErrorBoundary/ErrorBoundaryWrapper";

export default function SearchPost() {
  return (
    <>
      <ErrorBoundaryWrapper>
        <Post />
      </ErrorBoundaryWrapper>
    </>
  );
}
