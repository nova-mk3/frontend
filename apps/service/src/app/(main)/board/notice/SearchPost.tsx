import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";
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
