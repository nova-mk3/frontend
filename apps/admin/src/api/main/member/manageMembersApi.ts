import { Authapi } from "@/src/api/core";
import { throwError } from "@/src/utils/throwError";
import { PutMemberInfoRequest } from "@/src/types/manageMember";

export async function GetAllMembers() {
    try{
        const response = await Authapi.get(`/nova/admin/members`)
        return response.data.data
    }catch(error:unknown){
        throwError(error)
    }
}

export async function PutMemberInfo(memberId: number, request: PutMemberInfoRequest) {
    try{
        const response = await Authapi.put(`/nova/members/members/${memberId}`, request)
        return response.data.data
    }catch(error:unknown){
        throwError(error)
    }
}

export async function PutMemberGraduation(memberId: number, Graduation: boolean) {
    try{
        const response = await Authapi.put(`/nova/admin/members/${memberId}/graduation?isGraduation=${Graduation}`)
        return response.data.data
    }catch(error:unknown){
        throwError(error)
    }
}

export async function PutMemberGrade(memberId: number, grade: number) {
    try{
        const response = await Authapi.put(`/nova/admin/members/${memberId}/grade?grade=${grade}`)
        return response.data.data
    }catch(error:unknown){
        throwError(error)
    }
}

export async function PutMemberAbsence(memberId: number , absence: boolean) {
    try{
        const response = await Authapi.put( `/nova/admin/members/${memberId}/absence?isAbsent=${absence}`)
        return response.data.data
    }catch(error:unknown){
        throwError(error)
    }
}

export async function DeleteMember(memberId: number) {
    try{
        const response = await Authapi.put(`/nova/admin/members/${memberId}/deleted`)
        return response.data.data
    }catch(error:unknown){
        throwError(error)
    }
}

export async function PutAllMemberSemester(){
    try{
        const response = await Authapi.put(`/nova/admin/members/semester`)
        return response.data.data
    }catch(error:unknown){
        throwError(error)
    }
}