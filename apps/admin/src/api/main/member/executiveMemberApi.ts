import {
  PostExecutiveMemberRequest,
  enumRoleType,
} from "@/src/types/executiveMember";
import { Authapi } from "@/src/api/core";
import { throwError } from "@/src/utils/throwError";

export async function GetExecutvieYears() {
  try {
    const response = await Authapi.get(`/executive-histories/years`);
    return response.data.data;
  } catch (error: unknown) {
    throwError(error);
  }
}

export async function PostExecutiveYear() {
  try {
    const response = await Authapi.post(`/executive-histories/year`);
    return response.data;
  } catch (error: unknown) {
    throwError(error);
  }
}

export async function DeleteExecutiveYear() {
  try {
    const response = await Authapi.delete(`/executive-histories`);
    return response.data;
  } catch (error: unknown) {
    throwError(error);
  }
}

export async function GetExecutiveMemberByYear(year: number) {
  try {
    const response = await Authapi.get(`/executive-histories/${year}`);
    return response.data.data;
  } catch (error: unknown) {
    throwError(error);
  }
}

export async function PostExecutiveMember(request: PostExecutiveMemberRequest){
    try{
        const response = await Authapi.post(`/executive-histories`, request)
        return response.data
    } catch (error:unknown){
        throwError(error)
    }
}

export async function DeleteExecutiveMember(executiveHistoryId: string) {
  try {
    const response = await Authapi.delete(
      `/executive-histories/${executiveHistoryId}`
    );
    return response.data;
  } catch (error: unknown) {
    throwError(error);
  }
}

export async function PutExecutiveMember(
  executiveHistoryId: string,
  role: enumRoleType
) {
  try {
    const response = await Authapi.put(
      `/executive-histories/${executiveHistoryId}/${role}`
    );
    return response.data;
  } catch (error: unknown) {
    throwError(error);
  }
}
