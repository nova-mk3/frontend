import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";

export const LikeAPI = async(postId : string)=>{

  try{
    const response = await Authapi.post(`/nova/posts/${postId}/like`);
    return response.data.data;
  }catch(error : any){
    throwErrorMessage(error);
  }
}

export const UnLikeAPI = async(postId : string)=>{

    try{
      const response = await Authapi.post(`/nova/posts/${postId}/unlike`);
      return response.data.data;
    }catch(error : any){
      throwErrorMessage(error);
    }
  }