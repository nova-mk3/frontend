import { Circle } from 'lucide-react'
import React from 'react'

interface Props{
  content : string
  time : string
}
export default function AdminMessage({content,time} : Props) {
  return (
    <div className="bg-background02 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Circle size={32}/>
              <div>
                <div className="font-medium">관리자</div>
                <div className="text-sm text-muted-foreground">2024-02-23 14:30</div>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p>
                안녕하세요. 검색 기능 개선 요청 감사합니다. 현재 개선 작업을 진행 중이며, 다음 업데이트에 반영될
                예정입니다.
              </p>
            </div>
          </div>
  )
}
