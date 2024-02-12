import './globals.css'
import React from 'react'
import NextAuthProvider from '../provider/NextAuthProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
    
  );
}