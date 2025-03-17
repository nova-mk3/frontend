import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { GetPendingMembers, GetSpecificPendingMember, ApprovePendingMember, RejectPendingMember } from '../api/main/member/pendingMembersApi';
import { SpecificPendingMemberApiResponse, PendingMembersApiResponse } from '../types/pendingMember';

export const pendingMembersKeys = {
    list: () => ['pendingMembers'] as const,
};

// 상세 쿼리 키를 독립적으로 분리를 통해 mutate시 영향받지않게 설정
export const specificPendingMemberKeys = {
    detail: (pendingMemberId: string) => ['specificPendingMember', pendingMemberId] as const,
};

export const usePendingMembersQuery = () => {
    return useQuery<PendingMembersApiResponse>({
        queryKey: pendingMembersKeys.list(),
        queryFn: GetPendingMembers,
    });
};
// open 상태에 따라 쿼리를 요청할지 말지 결정
// TODO 깔끔하게 변환하기 이부분 
// 문제점은 modal을 킬때에만 이 쿼리가 발생하게 해야한다. 또한 캐싱되어있는 상태에서 새로고침을 해서는 안되고
// 일정 시간이 지난후 자동으로 삭제되게 만들어야한다.
export const useSpecificPendingMemberQuery = (pendingMemberId: string, open: boolean) => {
    return useQuery<SpecificPendingMemberApiResponse>({
        queryKey: specificPendingMemberKeys.detail(pendingMemberId),
        queryFn: () => GetSpecificPendingMember(pendingMemberId),
        enabled: open,
        staleTime: Infinity,
        refetchOnWindowFocus: false, 
        refetchOnReconnect: false,  
        refetchInterval: false,
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