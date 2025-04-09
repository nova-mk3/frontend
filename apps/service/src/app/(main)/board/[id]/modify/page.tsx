import React from "react";
import ModifyPage from "./ModifyPage";
import ErrorBoundaryWrapper from "../../../components/ErrorBoundary/ErrorBoundaryWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: Props) {
  const { id: postId } = await params;
  return (
    <ErrorBoundaryWrapper>
      <ModifyPage postId={postId} />
    </ErrorBoundaryWrapper>
  );
}
