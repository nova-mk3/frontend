
import { PostType } from "@/src/constant/board";
import { Authapi } from "../core";
import { throwErrorMessage } from "@/src/libs/utils/throwError";

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

  try{
    const response = await Authapi.post(`/nova/boards/${boardId}/posts`, {
      title,
      content,
      postType,
      fileIds
    });
    return response.data.data;
  }catch(error : any){
     throwErrorMessage(error);
  }
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
 * 카테고리별 목록 조회
 */
export async function IntegratedBoardGet({ postType, page, size, sort, boardId }: Params) {
  try {
    const response = await Authapi.get(`/nova/boards/${boardId}/posts?postType=${postType}&page=${page}&size=${size}&sort=${sort}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 게시글 상세 조회
 */
export async function IntegratedBoardGetDetail({ postId, boardId }: Params) {
  try {
    const response = await Authapi.get(`/nova/boards/${boardId}/posts/${postId}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 전체 게시판 목록 조회
 */
export async function BoardAllList({ boardId, page, size, sort }: Params) {
  try {
    const response = await Authapi.get(`/nova/boards/${boardId}/posts/all?page=${page}&size=${size}&sort=${sort}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 각 PostType(QnA, 자유게시판, 자기소개, 공지사항)별 최신 6개 게시글 조회
 */
export async function BoardLatestList({ boardId }: Params) {
  try {
    const response = await Authapi.get(`/nova/boards/${boardId}/posts/latest`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}


/*
게시글 수정!
*/

export interface IntegratedPutRequest {
  title : string,
  content : string,
  boardId : string,
  fileIds : string[],
  postId : string,
  deleteFileIds : string[];
}

export async function IntegratedBoardPut(
{
    title,
    content,
    fileIds,
    boardId,
    postId,
    deleteFileIds
  } : IntegratedPutRequest
) {

  try{
    const response = await Authapi.put(`/nova/boards/${boardId}/posts/${postId}`, {
      title,
      content,
      fileIds,
      deleteFileIds
    });
    return response.data.data;
  }catch(error : any){
     throwErrorMessage(error);
  }
}


/*
게시글 삭제
*/

export interface IntegratedPutRequest {
  title : string,
  content : string,
  boardId : string,
  fileIds : string[],
  postId : string,
  deleteFileIds : string[];
}

export async function IntegratedBoardDelete(
{

    boardId,
    postId,

  } : {boardId: string, postId: string}
) {

  try{
    const response = await Authapi.delete(`/nova/boards/${boardId}/posts/${postId}`);
    return response.data.data;
  }catch(error : any){
     throwErrorMessage(error);
  }
}