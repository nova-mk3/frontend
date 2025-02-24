import { PropsWithChildren, useEffect, useState } from 'react';

// ** 지연시간 200ms 미만일 때 스켈레톤 미노출 / 200ms 이상일 때 스켈레톤 노출 **
const DeferredComponent = ({ children }: PropsWithChildren) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsDeferred(true);
    }, 500);
    return () => clearTimeout(timeOut);
  }, []);

  if (!isDeferred) return <div className='w-full h-[900px] animate-pulse  mt-8'></div>;
  return <>{children}</>;
};

export default DeferredComponent;