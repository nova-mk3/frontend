/*
pendingMembers 에서 사용하는 react-query hooks 모음
*/
import { useMutation, useQueryClient , useQuery} from '@tanstack/react-query';
import { GetPendingMembers, GetSpecificPendingMember, ApprovePendingMember, RejectPendingMember } from '../api/main/member/pendingMembersApi';
import { 
    SpecificPendingMemberApiResponse,
    PendingMembersApiResponse,
} from '../types/pendingMember';


export const pendingMembersKeys = {
    list: () => ['pendingMembers'] as const,
    detail: (pendingMemberId: string) => ['pendingMembers', pendingMemberId] as const,
};

export const usePendingMembersQuery = () => {
    return useQuery<PendingMembersApiResponse>({
      queryKey: pendingMembersKeys.list(),
      queryFn: GetPendingMembers,
    });
  };


export const useSpecificPendingMemberQuery = (pendingMemberId: string) => {
    return useQuery<SpecificPendingMemberApiResponse>({
        queryKey: pendingMembersKeys.detail(pendingMemberId), 
        queryFn: () => GetSpecificPendingMember(pendingMemberId),
    });
};

export const useApprovePendingMemberMutation = () => {
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: (pendingMemberId: string) => ApprovePendingMember(pendingMemberId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: pendingMembersKeys.list(),
              });
        },
        onError: (error) => {
            console.error("회원 승인 실패:", error);
        }
    });
};

export const useRejectPendingMemberMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (pendingMemberId: string) => RejectPendingMember(pendingMemberId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: pendingMembersKeys.list(),
              });
        },
        onError: (error) => {
            console.error("회원 거부 실패:", error);
        }
    });
};