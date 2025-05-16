export interface PostCommentRequest {
  postId: string;
  content: string;
  parentCommentId: string;
}

export interface PutCommentRequest {
  commentId: string;
  content: string;
}

export type CommentPostIdParams = Pick<PostCommentRequest, "postId">;
export type CommentIdParams = Pick<PutCommentRequest, "commentId">;
