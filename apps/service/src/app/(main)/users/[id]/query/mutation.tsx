import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "./qureies";
import {
  PutProfileIdAPI,
  UserProfileDeleteAPI,
  UserProfileUploadAPI,
} from "@/src/features/user/list/api/user";

export function useUserProfilePostMutation({ memberId }: { memberId: string }) {
  const UserProfilePutMutation = useUserProfilePutMutation({ memberId });

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
      UserProfilePutMutation.mutate({
        profileMemberId: memberId,
        fileId: data.id,
      });
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

      // queryClient.invalidateQueries({
      //   queryKey: userKeys.user(memberId),
      //   refetchType: "all",
      // });
      queryClient.invalidateQueries({
        queryKey: [userKeys.profile],
        refetchType: "all",
      });
    },
    onError: (error) => {
      alert(error.message);
      console.log(error);
    },
  });
}

export const useDeleteProfileMuation = ({ memberId }: { memberId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileMemberId: string) =>
      UserProfileDeleteAPI({ profileMemberId }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [userKeys.profile],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: userKeys.user(memberId),
        refetchType: "all",
      });
      alert("삭제 성공\n기본이미지의 경우 삭제가 불가능합니다");
      // 필요한 경우 캐시 무효화
    },

    onError: (error) => {
      alert(error.message);
    },
  });
};
