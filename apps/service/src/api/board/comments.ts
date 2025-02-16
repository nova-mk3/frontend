/*
댓글 작성
*/

import { Authapi } from "../core";

export interface CommentAPIType {
    postId : string,
    content : string,
    parentCommentId : string
}
export async function CommentsPost({postId, content,parentCommentId} : CommentAPIType  ) {
  const response = await Authapi.post(`/nova/posts/${postId}/comments`,{content,parentCommentId});
  return response.data;
}