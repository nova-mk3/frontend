import React, { Suspense } from 'react'
import Title from './components/Title'
import List from './components/SuggestionList'
import PendingFallbackUI from '../components/PendingFallbackUI'
import SearchPost from './SearchPost'

export default function page() {
  return (
     <Suspense fallback={<PendingFallbackUI/>}>
          <SearchPost />
      </Suspense>
  )
}

