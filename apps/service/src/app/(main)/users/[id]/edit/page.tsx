import React from "react";
import ErrorBoundaryWrapper from "../../../components/ErrorBoundaryWrapper";
import Hydration from "./Hydration";
export const dynamic = "force-dynamic";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-[400px] mx-auto mobile:w-[90%] mt-10">
      <ErrorBoundaryWrapper>
        <Hydration memberId={id} />
      </ErrorBoundaryWrapper>
    </div>
  );
}
