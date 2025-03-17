/*
pendingMembers 에서 사용하는 react-query hooks 모음
*/
import { useMutation, useSuspenseQuery , useQueryClient , useQuery} from '@tanstack/react-query';
import { GetPendingMembers, GetSpecificPendingMember, ApprovePendingMember, RejectPendingMember } from '../api/main/member/pendingMembers';


export const pendingMembersKeys = {
    list: () => ['pendingMembers'] as const,
    detail: (pendingMemberId: string) => ['pendingMembers', pendingMemberId] as const,
};

// export const usePendingMembersQuery = () => {
//     return useSuspenseQuery({
//         queryKey: pendingMembersKeys.list(),
//         queryFn: () => GetPendingMembers(),
//     });
// };

// ✅ Suspense를 사용하지 않는 방식 (Suspense 필요하면 suspense: true 추가)
export const usePendingMembersQuery = () => {
    return useQuery({
      queryKey: pendingMembersKeys.list(),
      queryFn: GetPendingMembers,
    });
  };


export const useSpecificPendingMemberQuery = (pendingMemberId: string) => {
    return useSuspenseQuery({
        queryKey: pendingMembersKeys.detail(pendingMemberId), 
        queryFn: () => GetSpecificPendingMember(pendingMemberId),
    });
};

export const useApprovePendingMemberMutation = () => {
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: (pendingMemberId: string) => ApprovePendingMember(pendingMemberId),
        onSuccess: () => {
            console.log("📌 회원 승인 완료. 목록 갱신 중...");
            queryClient.invalidateQueries({
                queryKey: pendingMembersKeys.list(),
              });
        },
        onError: (error) => {
            console.error("🚨 회원 승인 실패:", error);
        }
    });
};

export const useRejectPendingMemberMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (pendingMemberId: string) => RejectPendingMember(pendingMemberId),
        onSuccess: () => {
            console.log("📌 회원 거부 완료. 목록 갱신 중...");
            queryClient.invalidateQueries({
                queryKey: pendingMembersKeys.list(),
              });
        },
        onError: (error) => {
            console.error("🚨 회원 거부 실패:", error);
        }
    });
};