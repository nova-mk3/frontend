import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";

export async function getMember({ memberId }: { memberId: string }) {
  try {
    const res = await Authapi.get(`/members/${memberId}`);
    return res.data.data.memberResponse;
  } catch (error) {
    throwErrorMessage(error);
  }
}
