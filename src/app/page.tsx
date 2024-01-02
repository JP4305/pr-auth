import React from "react"
import { getServerSession } from 'next-auth'
import { authOptions } from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import DashboardOne from '../../../ams-fe/src/sections/DashboardOne/index'
import DashboardTwo from '../../../ams-fe/src/sections/DashboardTwo/index'
import DashboardThree from '../../../ams-fe/src/sections/DashboardThree/index'

export default async function Home() {

  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login");
  }

  return (
    <main className='grid gap-y-10 m-6'>
      <DashboardOne/>
      <DashboardTwo/>
      <DashboardThree/>
    </main>
  )
  
} 