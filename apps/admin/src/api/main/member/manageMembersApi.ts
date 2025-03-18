import { Authapi } from "../../core";

export async function GetAllMembers() {
    try{
        const response = await Authapi.get(`/nova/executive-histories/members`)
        return response.data.data
    }catch(error: any){
        console.error("Error fetching members:", error);
        throw new Error("회원 목록을 불러오는 중 오류가 발생했습니다.");
    }
}
