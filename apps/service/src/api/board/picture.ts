import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";

/*
게시글 작성
*/

export interface PicturePostReqeust {
  title: string;
  content: string;
  imageFileIds: string[];
  boardId: string;
}

export async function PicturePost({
  title,
  content,
  imageFileIds,
  boardId,
}: PicturePostReqeust) {
  try {
    const response = await Authapi.post(
      `/nova/boards/${boardId}/picture-posts`,
      {
        title,
        content,
        imageFileIds,
      }
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}
