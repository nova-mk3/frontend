"use client"

import { Button } from '@nova/ui/components/ui/button';
import { FallbackProps } from 'react-error-boundary';
import Link from 'next/link';

// 나오는 에러별로 정리해도 좋을 것 같다
export default function FallbackErrorUI({ error, resetErrorBoundary }: FallbackProps) {
 
  return (
    <div className='w-full h-[745px] bg-background02 flex flex-col items-center justify-center mt-8'>
      <span className="text-xl font-bold text-center">
        {error.message}
        <br />
       
      </span>
      <span> 오류가 발생했습니다! 아래 버튼을 통해 재시도를 해보세요!</span>
      <div className="flex justify-center mt-8 flex-row gap-8">
        <Button
        variant={"default"}
          
          onClick={() => resetErrorBoundary()}
        >
          다시 불러오기!
        </Button>
        <Link href="/">
        <Button
        variant={"text"}
          
        >
          메인으로
        </Button>
        </Link>
      </div>
    </div>
  );
}
