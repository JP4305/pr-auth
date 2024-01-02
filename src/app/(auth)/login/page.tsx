'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { signIn } from 'next-auth/react' 
import Image from 'next/image'
import Toast from '../../../components/Toast'
// import Toast from "@/components/Toast";

export default function Login() {

  const params = useSearchParams();

    const [ authState, setAuthState ] = useState({
        email:'',
        password:'',
    })

    const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<loginErrorType>({});

    const submitForm = () => {
        console.log('The auth state is', authState);
        
        axios.post("api/auth/login", authState)
      .then((res) => {
        setLoading(false)
        const response = res.data
        if (response.status == 200) {
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            callbackUrl: "/",
            redirect: true,
          })
          
        } else if (response?.status == 400) {
          setErrors(response?.errors);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log("Something went wrong");

      })
    }

    // To sign in with GitHub
    const gitHubSignin = async () => {
      await signIn("github", {
        callbackUrl: "/",
        redirect: true
      })};

      // To sign in with Google
     const googleSignin = async () => {
      await signIn("google", {
        callbackUrl: "/",
        redirect: true
      })
     };

  return (
    <section>
      <Toast/>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="h-full w-full rounded-md object-cover object-top"
              src="https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3 className="text-4xl font-bold text-white">
                Authentication for TSC
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            { params.get("message") ? <p className='bg-green-400 font-bold rounded-md p-4'>{params.get("message")}</p> : <></> }
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setAuthState({ ...authState, email:e.target.value })}
                    ></input>
                    <span className='text-red-500 font-bold'>{errors?.email}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      Password
                    </label>
                    <a
                      href="/forgot-password"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      {' '}
                      Forgot password?{' '}
                    </a>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setAuthState({ ...authState, password:e.target.value })}
                    ></input>
                    <span className='text-red-500 font-bold'>{errors?.password}</span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 ${
                      loading ? "bg-gray-500" : "bg-black"
                    }`}
                    onClick={submitForm}
                  >
                    {loading ? "Processing" : "Login"}
                  </button>
                </div>
              </div>
            </form>

            <p className='my-5 text-center'>--OR--</p>

            {/* GitHub */}
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border bg-black px-3.5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-black/80 focus:bg-gray-100 focus:text-black focus:outline-none"
                onClick={gitHubSignin}
              >
                <span className='inline-block mr-2'></span>
                <Image src="/github_icon.png" height={30} width={30} alt='Github' className='mr-3'/>
                Sign in with GitHub
              </button>
            </div>

            {/* Google */}
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border bg-black px-3.5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-black/80 focus:bg-gray-100 focus:text-black focus:outline-none"
                onClick={googleSignin}
              >
                <span className='inline-block mr-2'></span>
                <Image src="/google_icon.png" height={30} width={30} alt='Google' className='mr-3'/>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
