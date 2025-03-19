"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * 커스텀 훅 예시:
 * - 각 쿼리 파라미터의 값을 리턴
 * - 해당 파라미터를 업데이트하는 setter 함수도 함께 리턴
 */
export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 내부적으로 쿼리 스트링을 업데이트하는 로직
  const setParam = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, String(value));

      // router.push or router.replace
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const keyword = searchParams.get("keyword") || "";
  const searchType = searchParams.get("searchType") || "ALL";
  const sortBy = searchParams.get("sortBy") || "createdTime";
  const sortDirection = searchParams.get("sortDirection") || "desc";
  const postId = searchParams.get("id") || "";
  const postType = searchParams.get("type") || "";
  const redirectUrl = searchParams.get("redirect");

  return {
    // Getter
    currentPage,
    keyword,
    searchType,
    sortBy,
    sortDirection,
    postId,
    postType,
    redirectUrl,

    // Setter
    setCurrentPage: (page: number) => setParam("page", page),
    setKeyword: (value: string) => setParam("keyword", value),
    setSearchType: (value: string) => setParam("searchType", value),
    setSortBy: (value: string) => setParam("sortBy", value),
    setSortDirection: (value: string) => setParam("sortDirection", value),
  };
}
