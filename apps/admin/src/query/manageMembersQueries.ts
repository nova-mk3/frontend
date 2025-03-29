import { useQuery, QueryClient, useMutation } from '@tanstack/react-query';
import { GetAllMembers, PutAllMemberSemester, PutMemberInfo } from '@/src/api/main/member/manageMembersApi';
import { ManageMember, PutMemberInfoRequest } from '@/src/types/manageMember';

export const manageMembersKeys = {
    list: () => ['manageMembers'] as const,
}

export const useManageMembersQuery = () => {
    return useQuery<ManageMember[]>({
        queryKey: manageMembersKeys.list(),
        queryFn: GetAllMembers,
    });
};

// info 변경은 고민을 많이 해보아야할거같다.
// export const usePutMemberInfoMuatation = () => {
//     const queryClient = new QueryClient();
//     return useMutation({
//         mutationFn: (memberId: number, request: PutMemberInfoRequest) => PutMemberInfo(memberId, request),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: manageMembersKeys.list(),
//             });
//         },
//         onError: (error) => {
//             console.error("회원 정보 수정 실패:", error);
//         },
//     });
// }

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