import React from "react";
import Hydration from "./Hydration";
import ErrorBoundaryWrapper from "../../../components/ErrorBoundaryWrapper";
import ModifyPage from "./ModifyPage";
export const dynamic = "force-dynamic";

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
