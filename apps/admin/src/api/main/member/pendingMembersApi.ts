import { Authapi } from "@/src/api/core";
import { throwError } from "@/src/utils/throwError";

// Get pending members
export async function GetPendingMembers() {
  try {
    const response = await Authapi.get(`/pending-members`);
    return response.data.data;
  } catch (error: unknown) {
    throwError(error);
  }
}

export async function GetSpecificPendingMember(pendingMemberId: string) {
  try {
    const response = await Authapi.get(`/pending-members/${pendingMemberId}`);
    return response.data.data;
  } catch (error: unknown) {
    throwError(error);
  }
}

// Reject pending member
export async function RejectPendingMember(pendingMemberId: string) {
  try {
    const response = await Authapi.post(
      `/pending-members/${pendingMemberId}/rejected`
    );
    return response.data;
  } catch (error: unknown) {
    throwError(error);
  }
}

// Approve pending member
export async function ApprovePendingMember(pendingMemberId: string) {
  try {
    const response = await Authapi.post(`/pending-members/${pendingMemberId}`);
    return response.data;
  } catch (error: unknown) {
    throwError(error);
  }
}
