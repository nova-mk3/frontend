import { PostExecutiveMemberRequest , enumRoleType } from "@/src/types/executiveMember";
import { Authapi } from "../../core";

export async function GetExecutvieYears(){
    try{
        const response = await Authapi.get(`/nova/executive-histories/years`)
        return response.data.data
    }catch(error:any){
        console.error("Error fetching executive years:", error);
        throw new Error("임원 연도를 불러오는 중 오류가 발생했습니다.");
    }
}

export async function GetExecutiveMemberByYear(year: number){
    try{
        const response = await Authapi.get(`/nova/executive-histories/${year}`)
        console.log(response)
        console.log(year)
        return response.data.data
    }catch(error:any){
        console.error("Error fetching executive members:", error);
        throw new Error("임원 목록을 불러오는 중 오류가 발생했습니다.");
    }
}

export async function PostExecuvtieMember(request: PostExecutiveMemberRequest){
    try{
        const response = await Authapi.post(`/nova/executive-histories`, request)
        console.log(response)
        return response.data
    } catch (error:any){
        console.error("Error posting executive member:", error);
        throw new Error("임원을 추가하는 중 오류가 발생했습니다.");
    }
}

export async function DeleteExecutiveMember(executiveHistoryId: string){
    try{
        const response = await Authapi.delete(`/nova/executive-histories/${executiveHistoryId}`)

        return response.data
    } catch (error:any){
        console.error("Error deleting executive member:", error);
        throw new Error("임원을 삭제하는 중 오류가 발생했습니다.");
    }
}

export async function PostExecutiveYear(){
    try{
        const response = await Authapi.post(`/nova/executive-histories/year`)
        return response.data
    } catch (error:any){
        console.error("Error posting executive year:", error);
        throw new Error("임원 연도를 추가하는 중 오류가 발생했습니다.");
    }
}

export async function PutExecutiveMember(executiveHistoryId: string, role: enumRoleType){
    try{
        const response = await Authapi.put(`/nova/executive-histories/${executiveHistoryId}/${role}`, )
        console.log(`/nova/executive-histories/${executiveHistoryId}/${role}`)
        console.log("안녕하세요",response)
        return response.data
    } catch (error:any){
        console.error("Error putting executive member:", error);
        throw new Error("임원을 수정하는 중 오류가 발생했습니다.");
    }
}