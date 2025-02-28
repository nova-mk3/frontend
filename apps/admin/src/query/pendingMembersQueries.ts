/*
pendingMembers 에서 사용하는 react-query hooks 모음
*/
import { useSuspenseQuery } from '@tanstack/react-query';
import { GetPendingMembers, GetSpecificPendingMember } from '../api/main/member/pendingMembers';


export const pendingMembersKeys = {
    list: () => ['pendingMembers'] as const,
    detail: (pendingMemberId: string) => ['pendingMembers', pendingMemberId] as const,
};

export const usePendingMembersQuery = () => {
    return useSuspenseQuery({
        queryKey: pendingMembersKeys.list(),
        queryFn: () => GetPendingMembers(),
    });
};

export const useSpecificPendingMemberQuery = (pendingMemberId: string) => {
    return useSuspenseQuery({
        queryKey: pendingMembersKeys.detail(pendingMemberId), 
        queryFn: () => GetSpecificPendingMember(pendingMemberId),
    });
};