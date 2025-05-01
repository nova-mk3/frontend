import React from "react";
import Post from "./Post";
import ErrorBoundaryWrapper from "@/src/app/(main)/components/ErrorBoundary/ErrorBoundaryWrapper";
export const dynamic = "force-dynamic";
export default function page() {
  return (
    <div className="w-[80%] mx-auto mt-5">
      <ErrorBoundaryWrapper>
        <Post />
      </ErrorBoundaryWrapper>
    </div>
  );
}
