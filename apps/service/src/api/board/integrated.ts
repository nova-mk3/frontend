
import { PostType } from "@/src/constant/board";
import { Authapi } from "../core";

export interface IntegradePostRequest {
  title : string,
    content : string,
    postType : string,
    fileIds : string[]
    boardId : string
}


/*
게시글 작성
*/
export async function IntegratedBoardPost(
  {
    title,
    content,
    postType,
    fileIds,
    boardId,
  } : IntegradePostRequest
) {
  const response = await Authapi.post(`/nova/boards/${boardId}/posts`, {
    title,
    content,
    postType,
    fileIds
  });
  return response.data;
}

interface Params {
  size? : number
  sort? : string
  boardId? : string
  postType? : PostType
  page? : number
  postId? : string
}



/*
카테고리별 목록 조회
*/
export async function IntegratedBoardGet({postType,page,size,sort,boardId} : Params ) {
  const response = await Authapi.get(`/nova/boards/${boardId}/posts?postType=${postType}&page=${page}&size=${size}&sort=${sort}`);
  return response.data;
}




/*
게시글 상세 조회
*/

export async function IntegratedBoardGetDetail({postId, boardId} : Params ) {
  const response = await Authapi.get(`/nova/boards/${boardId}/posts/${postId}`);
  return response.data;
}

/*
전체 게시판 목록 조회
*/

export async function BoardAllList({ boardId ,page,size,sort} : Params ) {
  const response = await Authapi.get(`/nova/boards/${boardId}/posts/all?page=${page}&size=${size}&sort=${sort}`);
  return response.data;
}

/*
각 PostType(QnA, 자유게시판, 자기소개, 공지사항)별 최신 6개 게시글을 가져옵니다.
*/

export async function BoardLatestList({ boardId } : Params ) {
  const response = await Authapi.get(`/nova/boards/${boardId}/posts/latest`);
  return response.data;
}