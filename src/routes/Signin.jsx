import React, { useState } from 'react'
import {
  AiFillLock,
  AiOutlineMail
} from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'


export const Signin = () => {

  const[email ,setemail]=useState("")
  const[password ,setepassword]=useState("")
  const[error ,seterror]=useState()
  const navigate = useNavigate()
  const {login }=UserAuth()

  const handlesubmit =async (e)=>{
    e.preventDefault()
    seterror("")
    try {
      await login(email , password)
      navigate("/account")
    } catch (e) {
      seterror(e.message)
      console.log(e.message)
    }
    setemail("")
    setepassword("")
    }



  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 b py-20 '>
        <h1 className='text-2xl font-bold '>Sign In</h1>
        <form  onSubmit={handlesubmit}>

          <div className='my-4'>
            <label >Email</label>
            <div className='my-2  w-full relative  rounded-2xl shadow-xl '>
              <input onChange={(e)=>setemail(e.target.value)}   className='w-full p-2 bg-primary border border-input rounded-2xl 'type="email" placeholder='Enter email ...' />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400'/>
            </div>
          </div>

          <div className='my-4'>
            <label >Password</label>
            <div  className='my-2  w-full relative  rounded-2xl shadow-xl ' >
              <input onChange={(e)=>setepassword(e.target.value)}   className='w-full p-2 bg-primary border border-input rounded-2xl '  type="password"placeholder='Enter password ...' />
              <AiFillLock className='absolute right-2 top-3 text-gray-400'  />
            </div>
          </div>

          <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl '>Sign In</button>
        </form>
        <p className='my-4 '>Don't have an account? <Link to="/signup" className='text-accent font-bold'>Sign Up</Link></p>
      </div>
    </div>
  )
}