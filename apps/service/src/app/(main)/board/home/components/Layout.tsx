"use client";
import Link from 'next/link'
import { Button } from '@nova/ui/components/ui/button'
import ErrorBoundaryWrapper from '../../../components/ErrorBoundaryWrapper';
import dynamic from 'next/dynamic';
import PendingFallbackUI from '../../../components/PendingFallbackUI';


// TODO: 이렇게 하면 에러를 피할거같긴한데 왜 계속 에러가 나는지는 연구필요
const Post = dynamic(() => import('./Post'), {
  ssr: false, // 클라이언트에서만 렌더링
  loading: () => <PendingFallbackUI />,
});

export default function Layout() {
  return (
    <div className='flex flex-col justify-center gap-5 pt-10'>
      <div className={`flex flex-col  border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center w-full mobile:gap-2`}>
      <p className="d-l text-primary mx-auto mobile:d-s">Welcome to Club Nova</p>

      <div className="flex flex-row items-center gap-[15px] ml-auto mt-auto mobile:flex-col mobile:w-full">
        
      <Link href="/board/newpost" className="mobile:w-full">
          <Button variant="default" className="mobile:w-full">
            글쓰기
          </Button>
        </Link>        
      </div>

    </div>
          <ErrorBoundaryWrapper>
            <Post/>
          </ErrorBoundaryWrapper>
    </div>
  )
}
