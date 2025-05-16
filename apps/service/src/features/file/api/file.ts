import { ERROR_MESSAGES } from "@/src/constant/error";
import { Authapi } from "@/src/shared/api/core";
import { throwErrorMessage } from "@/src/shared/utils/throwError";

/*
카테고리별 파일 업로드
*/
export const UploadFilesAPI = async (formdata: FormData, postType: string) => {
  try {
    const response = await Authapi.post(
      `/files?postType=${postType}`,
      formdata
    );
    return response.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
};

/*
파일 다운로드
*/
export const DownloadFilesAPI = async (
  fileId: string,
  onProgress?: (percent: number) => void
) => {
  try {
    const response = await Authapi.get(`/files/${fileId}/download`, {
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress?.(percent);
        }
      },
    });
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;

    let filename = "downloaded-file";
    const contentDisposition = response.headers["content-disposition"];
    if (contentDisposition) {
      const filenameStarMatch = contentDisposition.match(
        /filename\*\=UTF-8''(.+)/
      );
      if (filenameStarMatch?.[1]) {
        filename = decodeURIComponent(filenameStarMatch[1]);
      } else {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch?.[1]) {
          filename = filenameMatch[1];
        }
      }
    }

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error) {
    alert(ERROR_MESSAGES.FILE_ERROR);
    throwErrorMessage(error);
  }
};

/*
파일 삭제
*/

export const DelelteFilesAPI = async (fileId: string) => {
  try {
    const response = await Authapi.delete(`/files/${fileId}`);
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
};
