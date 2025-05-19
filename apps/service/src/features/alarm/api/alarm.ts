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
    await new Promise((resolve) => setTimeout(resolve, 500));
    return response.data.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function PatchReadAlarm({
  notificationId,
}: {
  notificationId: string;
}) {
  try {
    const response = await Authapi.patch(
      `/notifications/${notificationId}/read`
    );

    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function PatchReadAlarms() {
  try {
    const response = await Authapi.patch(`/notifications/read-all`);

    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}
