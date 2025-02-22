import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";

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
건의게시판 파일 업로드
*/
export const SuggestionFileUploadAPI = async(formdata : FormData)=>{
  try{

    const response = await Authapi.post(`/nova/suggestion-files`,formdata);
    return response.data;
  }catch(error : any){
    throwErrorMessage(error);
  }
}