
import { Authapi } from "../core";

export interface IntegradePostRequest {
  title : string,
    content : string,
    postType : string,
    fileIds : string[]
    boardId : string
}
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



/*
카테고리별 목록 조회
*/
export async function IntegratedBoardGet({postType,page,size,sort = "title" ,boardId} : {postType : string, page : number, size : number, sort : string , boardId : string} ) {
  const response = await Authapi.get(`/nova/boards/${boardId}/posts?postType=${postType}&page=${page}&size=${size}&sort=${sort}`);
  return response.data;
}




/*
게시글 상세 조회
*/

export async function IntegratedBoardGetDetail({postId, boardId} : {postId : string, boardId : string} ) {
  const response = await Authapi.get(`/nova/boards/${boardId}/posts/${postId}`);
  return response.data;
}


/*
*/