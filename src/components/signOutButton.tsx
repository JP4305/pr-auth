'use client'
import React from 'react'
import { signOut } from 'next-auth/react'

export default function signOutButton({ type }: { type?: string }) {
  return (
    <div>
      <button className='bg-orange-300 rounded-md p-2' onClick={() => signOut({
        callbackUrl: type == "admin" ? "/admin/login" : "/login",
        redirect: true
      })
      }
      >
        <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 12H21" />
        <path d="M12 5L21 12 12 19" />
        <path d="M12 5L21 12 12 19" />
      </svg>
      </button>
    </div>
  )
}
