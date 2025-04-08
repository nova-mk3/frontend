import React from "react";

import ErrorBoundaryWrapper from "@/src/app/(main)/components/ErrorBoundaryWrapper";
import ChangeEmail from "./ChangeEmail";

export const dynamic = "force-dynamic";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-[400px] mx-auto mobile:w-[90%] mt-10 min-h-[795px]">
      <ErrorBoundaryWrapper>
        <ChangeEmail memberId={id} />
      </ErrorBoundaryWrapper>
    </div>
  );
}
