

import { Authapi } from "../core";

export interface CommentAPIType {
    postId? : string,
    content? : string,
    parentCommentId? : string
}

/*
댓글 작성
*/
export async function CommentsPost({postId, content,parentCommentId} : CommentAPIType  ) {
  const response = await Authapi.post(`/nova/posts/${postId}/comments`,{content,parentCommentId});
  return response.data;
}

/*
게시글의 모든 댓글 조회
*/
 
export async function CommentsGetList( {postId} : CommentAPIType  ) {
  const response = await Authapi.get(`/nova/posts/${postId}/comments?postId=${postId}`);
  return response.data;
}