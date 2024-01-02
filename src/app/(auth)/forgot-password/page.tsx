'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [errors , setErrors] = useState<loginErrorType>()

    const submit = (event:React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        axios.post("/api/auth/forgot-password", {email:email})
        .then((res) => {
            setLoading(false)
            const response = res.data;
            if (response.status == 200) {
                toast.success(response.message, { theme: "colored" });
            } else if(response.status == 400) {
                setErrors(response.errors)
            } else if(response.status == 500) {
                toast.success(response.message, { theme: "colored" });
            }
        })
        .catch((err) => {
            setLoading(false)
            console.log("The error is", err);
            
        })
    }

  return (
    <>
        <ToastContainer/>
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='w-[500px] p-5 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold'>Forgot Password</h1>
            <p className='text-sm'>No worries! We've got your back. Enter your email address below, and we'll work our magic to get you back into your account.</p>
            <form onSubmit={submit}>
                <div className='mt-5'>
                    <label htmlFor="" className='block'>Email</label>
                    <input 
                    className='w-full h-10 p-2 border rounded-md outline-red-300' 
                    type="email" 
                    placeholder='* abcd@gmail.com'
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    <span className='text-red-500'>{errors?.email}</span>
                </div>
                <div className='mt-5'>
                    <button className='w-full bg-black text-white p-2 rounded-md' disabled={loading}>
                        {loading ? "Processing" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
