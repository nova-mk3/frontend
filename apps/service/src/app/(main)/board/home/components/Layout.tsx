"use client";
import Link from "next/link";
import { Button } from "@nova/ui/components/ui/button";

import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { SimpleProfileQueryOptions } from "../../../users/[id]/query/options";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";

export default function Layout() {
  const { data } = useQuery(SimpleProfileQueryOptions());
  return (
    <div className="flex flex-col justify-center gap-5 pt-10">
      <div
        className={`flex flex-col  border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center w-full mobile:gap-2`}
      >
        <p className="d-l text-primary mx-auto mobile:d-s">
          Welcome to Club Nova
        </p>

        <div className="flex flex-row items-center gap-[15px] ml-auto mt-auto mobile:flex-col mobile:w-full">
          <Link
            href="/board/newpost"
            className="mobile:w-full"
            onClick={(e) => {
              if (!data) {
                e.preventDefault(); // ✅ 이동 막기
                alert("로그인 후 이용해주세요");
              }
            }}
          >
            <Button variant="default" className="mobile:w-full">
              글쓰기
            </Button>
          </Link>
        </div>
      </div>
      <ErrorBoundaryWrapper>
        <Post />
      </ErrorBoundaryWrapper>
    </div>
  );
}
