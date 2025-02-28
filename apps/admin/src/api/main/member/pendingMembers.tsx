import { api } from "../../core";
import { EXTERNAL_URL } from "../../core";

export async function GetPendingMembers() {
    try {
        const response = await api.get(`${EXTERNAL_URL}/pendingMembers`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching pending members:", error);
        throw new Error("회원가입 요청 목록을 불러오는 중 오류가 발생했습니다.");
    }
}
