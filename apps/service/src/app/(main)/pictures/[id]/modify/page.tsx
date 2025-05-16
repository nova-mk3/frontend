import React from "react";
import Hydration from "./Hydration";
import ModifyPage from "./ModifyPage";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";
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
