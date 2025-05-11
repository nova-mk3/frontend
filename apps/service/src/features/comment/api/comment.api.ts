import { Authapi } from "@/src/shared/api/core";
import {
  CommentIdParams,
  CommentPostIdParams,
  PostCommentRequest,
  PutCommentRequest,
} from "./comment.type";
import { throwErrorMessage } from "@/src/shared/utils/throwError";

/*
 * 댓글 작성
 */
export async function PostComment({
  postId,
  content,
  parentCommentId,
}: PostCommentRequest) {
  try {
    const response = await Authapi.post(`/posts/${postId}/comments`, {
      content,
      parentCommentId,
    });
    return response.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 게시글의 모든 댓글 조회
 */
export async function GetComments({ postId }: CommentPostIdParams) {
  try {
    const response = await Authapi.get(
      `/posts/${postId}/comments?postId=${postId}`
    );
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 댓글 수정
 */
export async function PutComment({ commentId, content }: PutCommentRequest) {
  try {
    const response = await Authapi.put(`/comments/${commentId}`, {
      content,
    });
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 댓글 삭제
 */
export async function DeleteComment({ commentId }: CommentIdParams) {
  try {
    const response = await Authapi.delete(`/comments/${commentId}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}
