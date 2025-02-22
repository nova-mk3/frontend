import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";
import { ERROR_MESSAGES } from "@/src/constant/error";

export interface SuggestionPostRequest {
    title : string
    content : string
    fileIds : string[]
    isPrivate : boolean
}


/*
   게시글 작성
*/
export async function SuggestionPost(
  {
    title,
    content,
    fileIds,
    isPrivate
  } : SuggestionPostRequest
) {

  try{
    const response = await Authapi.post(`/nova/suggestions`, {
      title,
      content,
      fileIds,
      isPrivate
    })
    return response.data.data;
  }catch(error : any){
     throwErrorMessage(error);
  }
}


/*
 *   건의게시판 파일 업로드
 */
export const SuggestionFileUploadAPI = async(formdata : FormData)=>{
  try{

    const response = await Authapi.post(`/nova/suggestion-files`,formdata);
    return response.data;
  }catch(error : any){
    throwErrorMessage(error);
  }
}

interface Params{
  page : number,
  size : number
  sort : string
  postid? : string
}
/*
 * 건의 게시판 목록 조회
 */
export async function SuggestionGet({  page, size, sort }: Params) {
  try {
    const response = await Authapi.get(`/nova/suggestions?page=${page}&size=${size}&sort=${sort}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}


/*
 *    건의 게시판 상세 조회
 */
export async function SuggestionGetDetail(postid : string) {
  try {
    const response = await Authapi.get(`/nova/suggestions/${postid}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}


/*
건의 게시판 파일 다운로드
*/
export const SuggestionDownloadFilesAPI = async (fileId: string) => {
    try {
      const response = await Authapi.get(`/nova/suggestion-files/${fileId}/download`, {
        responseType: 'blob', // Blob 데이터로 받기
      });
  
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
  
      // Content-Disposition 헤더에서 파일명을 추출 (예외 처리 추가)
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? decodeURIComponent(contentDisposition.split('filename=')[1]?.replace(/"/g, '') || 'downloaded-file')
        : 'downloaded-file';
  
      link.setAttribute('download', filename); // 파일명 설정
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url); // 메모리 해제
      link.remove();
    } catch (error) {
      alert(ERROR_MESSAGES.FILE_ERROR);
      throwErrorMessage(error);
    }
};