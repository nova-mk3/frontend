import React from "react";
import ErrorBoundaryWrapper from "@/src/app/(main)/components/ErrorBoundary/ErrorBoundaryWrapper";
import EditForm from "./EditForm";
export const dynamic = "force-dynamic";
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-[400px] mx-auto mobile:w-[90%] mt-10">
      {/* <ErrorBoundaryWrapper> */}
      {/* <EditForm memberId={id} /> */}
      {/* </ErrorBoundaryWrapper> */}
    </div>
  );
}
