import React from 'react'
import Navigation from './components/Navigation';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col t-m w-[80%] mx-auto'>
        <Navigation/>
        {children}
    </div>
  )
}
