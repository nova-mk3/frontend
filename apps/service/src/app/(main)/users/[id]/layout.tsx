import React from 'react'
import Navigation from '../components/Navigation';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navigation/>
      {children}
    </div>
  )
}
