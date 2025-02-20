import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";

export interface CommentAPIType {
    postId?: string;
    content?: string;
    parentCommentId?: string;
}

/*
 * 댓글 작성
 */
export async function CommentsPost({ postId, content, parentCommentId }: CommentAPIType) {
  try {
    const response = await Authapi.post(`/nova/posts/${postId}/comments`, { content, parentCommentId });
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 게시글의 모든 댓글 조회
 */
export async function CommentsGetList({ postId }: CommentAPIType) {
  try {
    const response = await Authapi.get(`/nova/posts/${postId}/comments?postId=${postId}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 댓글 수정
 */
export async function CommentsPut({ commentId, content }: { commentId: string; content: string }) {
  try {
    const response = await Authapi.put(`/nova/comments/${commentId}`, { content });
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 댓글 삭제
 */
export async function CommentsDelete({ commentId }: { commentId: string }) {
  try {
    const response = await Authapi.delete(`/nova/comments/${commentId}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}