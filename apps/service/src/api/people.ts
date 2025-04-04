import { throwErrorMessage } from "../libs/utils/throwError";
import { Authapi } from "./core";

export async function UserListGet({ grade }: { grade: string }) {
  try {
    const response = await Authapi.get(`/members?grade=${grade}`);
    return response.data.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throwErrorMessage(error);
  }
}
