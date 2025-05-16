import { Authapi } from "@/src/shared/api/core";
import { throwErrorMessage } from "@/src/shared/utils/throwError";

export const LikeAPI = async (postId: string) => {
  try {
    const response = await Authapi.post(`/posts/${postId}/like`);
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
};

export const UnLikeAPI = async (postId: string) => {
  try {
    const response = await Authapi.post(`/posts/${postId}/unlike`);
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
};
