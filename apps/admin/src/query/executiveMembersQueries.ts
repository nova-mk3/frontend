import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { GetExecutvieYears , GetExecutiveMemberByYear , PostExecuvtieMember , DeleteExecutiveMember, PostExecutiveYear, PutExecutiveMember} from '../api/main/member/executiveMemberApi';
import { enumRoleType, ExecutiveMember , PostExecutiveMemberRequest } from '@/src/types/executiveMember';

export const executiveMembersKeys = {
    years: () => ['years'] as const,
    list: (year: number) => ['executiveMembers', year] as const,
};

export const useExecutiveYearsQuery = () => {
    return useQuery<number[]>({
        queryKey: executiveMembersKeys.years(),
        queryFn: GetExecutvieYears,
    });
};

export const useExecutiveMembersQuery = (year: number) => {
    return useQuery<ExecutiveMember[]>({
        queryKey: executiveMembersKeys.list(year),
        queryFn: () => GetExecutiveMemberByYear(year),
    });
};

export const usePostExecutiveMemberMutation = (year : number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request : PostExecutiveMemberRequest) => PostExecuvtieMember(request),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: executiveMembersKeys.list(year),
            });
            alert("임원이 추가되었습니다.");
        },
        onError: (error) => {
            console.error("임원 추가 실패:", error);
        },
    });
}

export const usePostExecutiveYearMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => PostExecutiveYear(),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: executiveMembersKeys.years(),
            });
        },
        onError: (error) => {
            console.error("임원 연도 추가 실패:", error);
        },
    });
}

export const useDeleteExecutiveMemberMutation = (year:number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (executiveHistoryId: string) => DeleteExecutiveMember(executiveHistoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: executiveMembersKeys.list(year),
            });
        },
        onError: (error) => {
            console.error("임원 삭제 실패:", error);
        }
    });
}

export const usePutExecutiveMemberMutation = (year:number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({executiveHistoryId, role }:{executiveHistoryId: string , role: enumRoleType}) => PutExecutiveMember(executiveHistoryId, role),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: executiveMembersKeys.list(year),
            });
        },
        onError: (error) => {
            console.error("임원 수정 실패:", error);
        }
    });
}