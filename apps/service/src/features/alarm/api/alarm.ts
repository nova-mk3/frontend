import { Authapi } from "@/src/shared/api/core";
import { throwErrorMessage } from "@/src/shared/utils/throwError";
import { GetAlarmsParam } from "./alarm.type";

export async function GetUnreadAlarmCount() {
  try {
    const response = await Authapi.get(`/notifications/unread-count`);
    return response.data.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function GetAlarms({ page, size, sortBy }: GetAlarmsParam) {
  try {
    const response = await Authapi.get(
      `/notifications?page=${page}&size=${size}&sort=${sortBy}`
    );

    setTimeout(() => {}, 1000);
    return response.data.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throwErrorMessage(error);
  }
}
