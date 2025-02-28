import { api } from '@/src/api/core';
import { throwErrorMessage } from '../../../../service/src/libs/utils/throwError';

// 관리자 로그인

export interface AdminLoginRequest {
    admin : string,
    password : string,
}

export async function AdminLogin(
    {
        admin ,
        password,
    }: AdminLoginRequest
){
    try{
        // 아직 관리자로그인 api가 없어서 임의로 작성
        const response = await api.post('/admin/auth/login', {
            admin,
            password,
        })
        return response.data;
    }catch(error:any){
        alert(error);
    }
}