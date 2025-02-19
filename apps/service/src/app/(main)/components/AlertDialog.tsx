import React from 'react'
import  { AlertModal, AlretModalAction, AlretModalCancel, AlretModalContent, AlretModalOverlay, AlretModalTrigger, }  from '@nova/ui/components/ui/alert-dialog'
import { Button } from '@nova/ui/components/ui/button';

interface AlertDialogProps{
  title : string
  triggerName : string
  onAction? : (e? : React.MouseEvent<HTMLButtonElement> )=>void;
  onCancel? : (e? : React.MouseEvent<HTMLButtonElement>)=>void;
}
export default function AlertDialog({title,onAction,onCancel,triggerName} : AlertDialogProps) {
  return (
    <AlertModal>
      <AlretModalTrigger>{triggerName}</AlretModalTrigger>
      <AlretModalOverlay>
      <AlretModalContent className='w-[400px] h-[204px] p-8 flex flex-col'>
    
          <p className='t-l '>{title} 삭제</p>
          <p className='t-m text-text02'>{title}을 정말로 삭제하시겠습니까?</p>
          <div className='flex flex-row gap-2 ml-auto mt-auto'>
          <AlretModalCancel className='w-[72px]' onClick={onCancel}>취소</AlretModalCancel>
          <AlretModalAction className='w-[72px]' onClick={onAction}>확인</AlretModalAction>
          </div>
        
      </AlretModalContent>
      </AlretModalOverlay>
    </AlertModal>
  )
}
