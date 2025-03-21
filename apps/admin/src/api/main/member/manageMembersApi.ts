import { Authapi } from "@/src/api/core";
import { throwError } from "@/src/utils/throwError";

export async function GetAllMembers() {
    try{
        const response = await Authapi.get(`/nova/executive-histories/members`)
        return response.data.data
    }catch(error:unknown){
        throwError(error)
    }
}
