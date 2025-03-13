import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi, EXTERNAL_URL } from "../core";

export async function getMember({ memberId }: { memberId: string }) {
  try {
    const res = await Authapi.get(`${EXTERNAL_URL}/members/${memberId}`);
    return res.data.data.memberResponse;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function logout() {
  try {
    const response = await Authapi.get(`nova/members/logout`);
    return response.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}
