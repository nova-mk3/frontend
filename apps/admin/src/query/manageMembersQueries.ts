import { useQuery } from '@tanstack/react-query';
import { GetAllMembers } from '@/src/api/main/member/manageMembersApi';
import { ManageMember } from '../types/manageMember';

export const manageMembersKeys = {
    list: () => ['manageMembers'] as const,
}

export const useManageMembersQuery = () => {
    return useQuery<ManageMember[]>({
        queryKey: manageMembersKeys.list(),
        queryFn: GetAllMembers,
    });
};