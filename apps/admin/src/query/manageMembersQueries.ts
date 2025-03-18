import { useQuery } from '@tanstack/react-query';
import { GetAllMembers } from '@/src/api/main/member/manageMembersApi';

export const manageMembersKeys = {
    list: () => ['manageMembers'] as const,
}

export const useManageMembersQuery = () => {
    return useQuery({
        queryKey: manageMembersKeys.list(),
        queryFn: GetAllMembers,
    });
};