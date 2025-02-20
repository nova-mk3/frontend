import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";
import { ERROR_MESSAGES } from "@/src/constant/error";

/*
카테고리별 파일 업로드
*/
export const UploadFilesAPI = async(formdata : FormData, postType : string)=>{
  try{

    const response = await Authapi.post(`/nova/files?postType=${ postType}`,formdata);
    return response.data;
  }catch(error : any){
    throwErrorMessage(error);
  }
}

/*
파일 다운로드
*/
export const DownloadFilesAPI = async (fileId: string) => {
    try {
      const response = await Authapi.get(`/nova/files/${fileId}/download`, {
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


/*
파일 삭제
*/

export const DelelteFilesAPI = async(fileId : string)=>{

  try{
    const response = await Authapi.delete(`/nova/files/${fileId}`);
    return response.data;
  }catch(error : any){
    throwErrorMessage(error);
  }
}