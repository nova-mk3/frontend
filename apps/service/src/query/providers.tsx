// 'use client'

// // Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
// import {
//     defaultShouldDehydrateQuery,
//   isServer,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// function makeQueryClient() {
//   return new QueryClient({
//     defaultOptions: {
//       queries: {
//         // With SSR, we usually want to set some default staleTime
//         // above 0 to avoid refetching immediately on the client
//         staleTime: 60 * 1000,
//       },
//       // dehydrate: {
//       //   // include pending queries in dehydration //이걸 사용하면 await 과정이 빠지게된다.
//       //   shouldDehydrateQuery: (query) =>
//       //     defaultShouldDehydrateQuery(query) ||
//       //     query.state.status === 'pending',
//       // },
//     },
//   })
// }

// let browserQueryClient: QueryClient | undefined = undefined

// function getQueryClient() {
//   if (isServer) {
//     // Server: always make a new query client
//     return makeQueryClient()
//   } else {
//     // Browser: make a new query client if we don't already have one
//     // This is very important, so we don't re-make a new client if React
//     // suspends during the initial render. This may not be needed if we
//     // have a suspense boundary BELOW the creation of the query client
//     if (!browserQueryClient) browserQueryClient = makeQueryClient()
//     return browserQueryClient
//   }
// }

// export default function Providers({ children }: { children: React.ReactNode }) {
//   // NOTE: Avoid useState when initializing the query client if you don't
//   //       have a suspense boundary between this and the code that may
//   //       suspend because React will throw away the client on the initial
//   //       render if it suspends and there is no boundary
//   const queryClient = getQueryClient()

//   return (
//     <QueryClientProvider client={queryClient}>
//         {process.env.NODE_ENV === 'development' && (
//         <ReactQueryDevtools initialIsOpen={false} />
//       )}
//         {children}
//         </QueryClientProvider>
//   )
// }


'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';





export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
      
            staleTime: 60 * 1000,  // 1분 동안 데이터를 stale로 간주하지 않음
            retry: 0,
            throwOnError: true
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}