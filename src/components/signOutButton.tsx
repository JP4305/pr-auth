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
        Sign Out
      </button>
    </div>
  )
}
