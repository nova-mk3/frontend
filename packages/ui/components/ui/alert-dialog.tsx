import { cn } from '@nova/ui/lib/utils';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Button, ButtonProps } from './button';



interface AlertModalContextProps {
  isOpen: boolean;
  toggle: (e: React.MouseEvent<HTMLDivElement>) => void;
  close : ()=>void;
}

//컨텍스트를 생성
const AlertModalContext = createContext<AlertModalContextProps>({
  isOpen: false,
  toggle: () => {},
  close: ()=>{},
});

interface ModalProps{
  children?: React.ReactNode
}
export function AlertModal( {children} :  ModalProps) {

  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setIsOpen(prev => !prev)
  };

  const close = () => setIsOpen(false);




    
  
  return (
    <AlertModalContext.Provider value={{isOpen,toggle,close}}>
      {children}
    </AlertModalContext.Provider>
  )
}

interface AlretModalOverlayProps{
  children?: React.ReactNode
}

export const AlretModalOverlay = ({children} : AlretModalOverlayProps)=>{
  const { isOpen } = useContext(AlertModalContext);
  return (
    <AlretModalPortal>
    <div 
    data-state={isOpen ? "open" : "closed"}
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0')}>
      {children}
    </div>
    </AlretModalPortal>
  );
}

interface AlretModalContentProps{
  children?: React.ReactNode
  className? : string
}
export const AlretModalContent = ({children,className} : AlretModalContentProps)=>{
  const { isOpen,close } = useContext(AlertModalContext);
  return (
    <div 
    data-state={isOpen ? "open" : "closed"}
    className={cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background01 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
      className
    )}
    >
      {children}
    </div>
  );
}



interface AlretModalTriggerProps {
  children?: React.ReactNode;
}

export const AlretModalTrigger = ({ children }: AlretModalTriggerProps) => {
  const { toggle } = useContext(AlertModalContext);

  return (
    <div
      className="cursor-pointer p-1"
      onClick={toggle}
    >
      {children}
    </div>
  );
};



export const AlretModalPortal = ({ children }: AlretModalTriggerProps) => {
  const { isOpen } = useContext(AlertModalContext);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // 모달이 열리면 바로 렌더링
      setShouldRender(true);
    } else {

     setTimeout(() => {
        setShouldRender(false);
      }, 100);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return <>{children}</>;
};

interface AlretModalCancelProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e? : React.MouseEvent<HTMLButtonElement>) => void;
}
export const AlretModalCancel = ({ children,className,onClick }: AlretModalCancelProps) => {
  const { toggle,close } = useContext(AlertModalContext);

  const handleonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e); // 외부에서 전달된 함수 실행
    close(); // 모달 닫기
  };
  
  return (
    <Button
      variant={"text"}
      className={cn('',className)}
      onClick={close}
    >
      {children}
    </Button>
  );
};
interface AlretModalActionProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e? : React.MouseEvent<HTMLButtonElement>) => void;
}
export const AlretModalAction = ({ children,className,onClick }: AlretModalActionProps) => {
  const { close} = useContext(AlertModalContext);
  
  const handleonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e); // 외부에서 전달된 함수 실행
    close(); // 모달 닫기
  };

  return (
    <Button
      variant={"default"}
      className={cn('',className)}
      onClick={handleonClick}
    >
      {children}
    </Button>
  );
};
