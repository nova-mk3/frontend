import { ERROR_MESSAGES } from "@/src/constant/error";
import { Authapi } from "@/src/shared/api/core";
import { searchFilter } from "@/src/shared/types/searchFilter.type";
import { throwErrorMessage } from "@/src/shared/utils/throwError";

export interface SuggestionPostRequest {
  title: string;
  content: string;
  fileIds: string[];
  isPrivate: boolean;
}

/**
 * 게시글 생성
 */

export async function SuggestionPost({
  title,
  content,
  fileIds,
  isPrivate,
}: SuggestionPostRequest) {
  try {
    const response = await Authapi.post(`/suggestions`, {
      title,
      content,
      fileIds,
      isPrivate,
    });
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}

/*
 *   건의게시판 파일 업로드
 */
export const SuggestionFileUploadAPI = async (formdata: FormData) => {
  try {
    const response = await Authapi.post(`/suggestion-files`, formdata);
    return response.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
};

/*
 * 건의 게시판 목록 조회
 */
export async function SuggestionGet({
  page,
  size,
  searchType,
  keyword,
  sortBy,
  sortDirection,
}: searchFilter) {
  try {
    const response = await Authapi.get(
      `/suggestions/search?page=${page}&size=${size}&searchType=${searchType}&keyword=${keyword}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 *    건의 게시판 상세 조회
 */
export async function SuggestionGetDetail(postid: string) {
  try {
    const response = await Authapi.get(`/suggestions/${postid}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
건의 게시판 파일 다운로드
*/
export const SuggestionDownloadFilesAPI = async (
  fileId: string,
  originalFileName: string,
  onProgress?: (percent: number) => void
) => {
  try {
    const response = await Authapi.get(`/suggestion-files/${fileId}/download`, {
      responseType: "blob", // Blob 데이터로 받기
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress?.(percent);
        }
      },
    });

    // Blob 데이터에서 URL 생성
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;

    link.setAttribute("download", originalFileName); // 파일명 설정
    document.body.appendChild(link);
    link.click();

    // 메모리 해제 및 요소 제거
    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error) {
    alert(ERROR_MESSAGES.FILE_ERROR);
    throwErrorMessage(error);
  }
};

/*
 *    건의 게시판 답변
 */
export async function SuggestionComment({
  postId,
  reply,
}: {
  postId: string;
  reply: string;
}) {
  try {
    const response = await Authapi.put(`/suggestions/${postId}/reply`, {
      reply,
    });
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}
