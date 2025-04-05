import { useQuery, QueryClient, useMutation } from '@tanstack/react-query';
import { GetAllMembers, GetMemberInfo, PutAllMemberSemester, PutMemberInfo } from '@/src/api/main/member/manageMembersApi';
import { ManageMember, ManageMemberInfoResponse, PutMemberInfoRequest } from '@/src/types/manageMember';

export const manageMembersKeys = {
    list: () => ['manageMembers'] as const,
    detail: (memberId: string) => ['manageMembers', memberId] as const,
}

export const useManageMembersQuery = () => {
    return useQuery<ManageMember[]>({
        queryKey: manageMembersKeys.list(),
        queryFn: GetAllMembers,
    });
};

export const useManageMemberInfoQuery = (memberId: string) => {
    return useQuery<ManageMemberInfoResponse>({
      queryKey: manageMembersKeys.detail(memberId),
      queryFn: () => GetMemberInfo(memberId),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    });
  };

  export const usePutMemberInfoMutation = () => {
    const queryClient = new QueryClient();
  
    return useMutation({
      mutationFn: async (props: { memberId: string; request: PutMemberInfoRequest }) => {
        const { memberId, request } = props;
        return PutMemberInfo(memberId, request);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: manageMembersKeys.list(),
        });
      },
      onError: (error) => {
        console.error('회원 정보 수정 실패:', error);
      },
    });
  };

export const usePutAllMemberSemesterMutation = () => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: () => PutAllMemberSemester(),
        onSuccess: () => {
            alert("모든 회원의 학기가 증가하였습니다.");
            queryClient.invalidateQueries({
                queryKey: manageMembersKeys.list(),
            });
        },
        onError: (error) => {
            console.error("회원 정보 수정 실패:", error);
        },
    });
}