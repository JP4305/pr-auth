import React from "react"
import { getServerSession } from 'next-auth'
import { authOptions } from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import SignoutButton from "../components/signOutButton"
// import DashboardTwo from '../../../ams-fe/src/sections/DashboardTwo/index'
// import DashboardOne from '../../../ams-fe/src/sections/DashboardOne/index'
// import DashboardThree from '../../../ams-fe/src/sections/DashboardThree/index'

export default async function Home() {

  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="h-full">
      {/* <HomeHere /> */}
      <div className="container">
        <div className="px-10 lg:px-80">
          <h1 className="text-4xl">Hi Bro</h1>
          {JSON.stringify(session)}
        </div>
      </div>
      <SignoutButton />
    </main>
  )
  
} 