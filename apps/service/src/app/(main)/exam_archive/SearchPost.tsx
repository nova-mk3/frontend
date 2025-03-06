import ErrorBoundaryWrapper from "../components/ErrorBoundaryWrapper";
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
