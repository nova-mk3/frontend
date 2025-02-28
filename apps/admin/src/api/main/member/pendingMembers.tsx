import { Authapi } from "../../core";

// Get pending members
export async function GetPendingMembers() {
    try {
        const response = await Authapi.get(`/nova/pendingMembers`);
        console.log(response)
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching pending members:", error);
        throw new Error("회원가입 요청 목록을 불러오는 중 오류가 발생했습니다.");
    }
}

export async function GetSpecificPendingMember(pendingMemberId: string) {
    try {
        const reponse = await Authapi.get(`/nova/pendingMembers/${pendingMemberId}`);
        return reponse.data;
    }
    catch (error: any) {
        console.error("Error fetching specific pending member:", error);
        throw new Error(`특정 회원가입 요청 "${pendingMemberId}"을 불러오는 중 오류가 발생했습니다.`);
    }
}


// Reject pending member
export async function RejectPendingMember(pendingMemberId: string) {
    try {
        const response = await Authapi.delete(`/nova/pendingMembers/${pendingMemberId}/rejected`);
        return response.data;
    } catch (error: any) {
        console.error("Error rejecting pending member:", error);
        throw new Error("회원가입 요청을 거부하는 중 오류가 발생했습니다.");
    }
}

// Approve pending member
export async function ApprovePendingMember(pendingMemberId: string) {
    try {
        const response = await Authapi.post(`/nova/pendingMembers/${pendingMemberId}/approved`);
        return response.data;
    } catch (error: any) {
        console.error("Error approving pending member:", error);
        throw new Error("회원가입 요청을 승인하는 중 오류가 발생했습니다.");
    }
}
