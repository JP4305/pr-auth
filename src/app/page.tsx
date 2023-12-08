import React from "react"
import SignOutButton from "../components/signOutButton"
import { getServerSession } from 'next-auth'
import { authOptions } from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

export default async function Home() {

  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="bg-purple-500 font-bold p-4 rounded-md mb-6">Hello Duniya, Kaisan Ba!</h1>
        <p>
          {JSON.stringify(session)}
        </p>
        <SignOutButton />
      </div>
    </div>
  )

} 