"use server";
import { throwErrorMessage } from "@/src/shared/utils/throwError";
import { cookies } from "next/headers";
import { GetIntegratedBoardsByCategoryParams } from "./integrated.type";
import { GetBoardsExcludeExamParams } from "./main.type";

export async function ServerGetIntegratedBoardsByCategory({
  postType,
  boardId,
  page,
  size,
  searchType,
  sortBy,
  sortDirection,
  keyword,
}: GetIntegratedBoardsByCategoryParams) {
  const url = new URL(
    `/api/v1/boards/${boardId}/posts/search`,
    process.env.NEXT_SERVER_API_BASE_URL
  );

  url.searchParams.append("postType", String(postType));
  url.searchParams.append("page", String(page));
  url.searchParams.append("size", String(size));
  if (searchType) url.searchParams.append("searchType", String(searchType));
  if (keyword) url.searchParams.append("keyword", String(keyword));
  if (sortBy) url.searchParams.append("sortBy", String(sortBy));
  if (sortDirection)
    url.searchParams.append("sortDirection", String(sortDirection));

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store", // SSR fetch에서 주로 사용
    });

    console.log(res);

    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    // 여기에 throwErrorMessage를 사용하는 로직을 유지
    throwErrorMessage(error);
  }
}

/**
 * 자료 게시판을 제외한 모든 게시글 조회
 */

export async function ServerGetBoardsExcludeExam({
  size,
  page,
  sortDirection,
  sortBy,
}: GetBoardsExcludeExamParams) {
  const url = new URL(
    "/api/v1/posts/across-boards",
    process.env.NEXT_SERVER_API_BASE_URL // ✅ 서버 환경 변수 사용
  );

  url.searchParams.append("sortBy", sortBy);
  url.searchParams.append("sortDirection", sortDirection);
  url.searchParams.append("page", String(page));
  url.searchParams.append("size", String(size));

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store", // SSR에서 stale 데이터 방지
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ fetch 실패 응답 내용:", text);
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}
