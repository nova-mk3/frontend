import { PutProfileIdAPI, UserProfileUploadAPI } from "@/src/api/user/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "./qureies";

export function useUserProfilePostMutation({ memberId }: { memberId: string }) {
  const putMutation = useUserProfilePutMutation({ memberId });

  return useMutation({
    mutationFn: ({
      formdata,
      memberId,
    }: {
      formdata: FormData;
      memberId: string;
    }) => UserProfileUploadAPI({ formdata, memberId }),
    onSuccess: (data: any) => {
      console.log(data);

      putMutation.mutate({ profileMemberId: memberId, fileId: data.id });
    },
    onError: (error) => {
      alert(error.message);
      console.log(error);
    },
  });
}

export function useUserProfilePutMutation({ memberId }: { memberId: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      profileMemberId,
      fileId,
    }: {
      profileMemberId: string;
      fileId: string;
    }) => PutProfileIdAPI({ profileMemberId, fileId }),
    onSuccess: (data: any) => {
      console.log(data);
      alert("변경 성공");

      queryClient.invalidateQueries({
        queryKey: userKeys.user(memberId),
        refetchType: "all",
      });
    },
    onError: (error) => {
      alert(error.message);
      console.log(error);
    },
  });
}
