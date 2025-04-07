import { api } from "@/src/api/core";
import { throwError } from "@/src/utils/throwError";

export interface AdminLoginRequest {
  studentNumber: string;
  password: string;
}

export async function AdminLogin({
  studentNumber,
  password,
}: AdminLoginRequest) {
  try {
    const response = await api.post("/nova/members/login", {
      studentNumber,
      password,
    });
    if (response.status === 200) {
      window.location.href = "/admin/"; // 성공시 대시보드로 이동
    } else {
      alert("로그인 실패: " + response.data.message);
      throwError(response.data.message);
    }
  } catch (error: unknown) {
    alert("로그인 실패 :" + error);
    throwError(error);
  }
}
