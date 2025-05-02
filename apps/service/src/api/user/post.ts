import { throwErrorMessage } from "@/src/libs/utils/throwError";

import { Authapi } from "../core";

export async function mypagePostGet({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  try {
    const response = await Authapi.get(
      `/mypage/posts?page=${page}&size=${size}`
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}

export async function mypageSuggestionGet({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  try {
    const response = await Authapi.get(
      `/mypage/suggestion-posts?page=${page}&size=${size}`
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}
