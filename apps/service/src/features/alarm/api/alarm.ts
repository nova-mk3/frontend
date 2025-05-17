import { Authapi } from "@/src/shared/api/core";
import { throwErrorMessage } from "@/src/shared/utils/throwError";

export async function GetUnreadAlarmCount() {
  try {
    const response = await Authapi.get(`/notifications/unread-count`);
    return response.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throwErrorMessage(error);
  }
}
