import React from "react";

import ErrorBoundaryWrapper from "@/src/app/(main)/components/ErrorBoundary/ErrorBoundaryWrapper";
import ChangePwd from "./ChangePwd";
import LayoutClient from "../components/LayoutClient";

export const dynamic = "force-dynamic";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ErrorBoundaryWrapper>
      <LayoutClient id={id}>
        <div className="w-[400px] mx-auto mobile:w-[90%] mt-10 min-h-[795px]">
          <ChangePwd memberId={id} />
        </div>
      </LayoutClient>
    </ErrorBoundaryWrapper>
  );
}
