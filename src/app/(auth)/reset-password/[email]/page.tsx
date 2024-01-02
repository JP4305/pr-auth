'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ResetPassword({params}:{params:{email:string}}) {

    const searchParam = useSearchParams()

    const [authState, setAuthState] = useState({
        password: '',
        cpassword: ''
    })

    const [loading, setLoading] = useState(false)

    const submit = (event:React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        axios.post("/api/auth/reset-password", {
            email:params.email,
            signature:searchParam.get("signature"),
            password:authState.password,
            password_confirmation:authState.cpassword
        })
        .then((res) => {
            setLoading(false)
            const response = res.data;
            if (response.status == 400) {
                toast.error(response.message, {theme: 'colored'})
            } else if(response.status == 200) {
                toast.success(response.message, {theme: 'colored'})
            } 
        })
        .catch((err) => {
            setLoading(false)
            console.log("Err..", err);
            
        })
    }

  return (
  <>
    <ToastContainer />
    <div className='h-screen w-screen flex justify-center items-center'>
    <div className='w-[500px] p-5 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold'>Reset Password</h1>
        {/* <p className='text-sm mt-4'>You can now use your new password to log in to your account.</p> */}
        <form onSubmit={submit}>
            <div className='mt-5'>
                <label htmlFor="" className='block'>Password</label>
                <input 
                className='w-full h-10 p-2 border rounded-md outline-red-300' 
                type="password" 
                placeholder='Enter new password'
                onChange={(event) => setAuthState({...authState, password:event.target.value})}
                />
            </div>
            <div className='mt-5'>
                <label htmlFor="" className='block'>Confirm Password</label>
                <input 
                className='w-full h-10 p-2 border rounded-md outline-red-300' 
                type="password" 
                placeholder='Confirm new password'
                onChange={(event) => setAuthState({...authState, password:event.target.value})}
                />
            </div>
            <div className='mt-5'>
                <button className='w-full bg-black text-white p-2 rounded-md' disabled={loading}>
                    {loading ? "Processing.." : "Submit"}
                </button>
            </div>
            <div className='mt-5 text-center'>
                <Link href='/login' className='text-cyan-500'>Back to Login</Link>
            </div>
        </form>
    </div>
</div>
</>
  )
}
