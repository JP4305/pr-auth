import { CustomSession, authOptions } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import SignOutButton from '../../../components/signOutButton'

export default async function AdminDashboard() {

    const session:CustomSession|null = await getServerSession(authOptions)
    if(session == null || session?.user?.role !== "admin") {
        return redirect("/admin/login?error=please login first")
    }

  return (
    <div className='flex justify-center items-center px-10 pt-10 flex-col'>
        <h1>Hello Admin, how are you?</h1>
        <h1 className='text-sm font-bold'> { session && JSON.stringify(session) } </h1>

        < SignOutButton type='admin'/>
    </div>
  )
}
