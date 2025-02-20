import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";

export interface ExamPostRequest {
     title : string,
    content : string,
    year : number
    subject : string
    semester : string
    professorName : string
    fileIds : string[]
    boardId : string
}


/*
게시글 작성
*/
export async function ExamPost(
  {
    title,
    content,
    year,
    subject,
    semester,
    professorName,
    fileIds,
     boardId 
  } : ExamPostRequest
) {

  try{
    const response = await Authapi.post(`/nova/boards/${boardId}/exam-posts`, {
        title,
        content,
        year,
        subject,
        semester,
        professorName,
        fileIds,
    });
    return response.data.data;
  }catch(error : any){
     throwErrorMessage(error);
  }
}