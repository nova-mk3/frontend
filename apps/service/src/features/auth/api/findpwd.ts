import { api } from "@/src/shared/api/core";
import { throwErrorMessage } from "@/src/shared/utils/throwError";

export async function restPassword({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  try {
    const response = await api.post(`/members/reset-password`, {
      email,
      name,
    });
    return response.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throwErrorMessage(error);
  }
}
