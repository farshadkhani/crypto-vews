import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Themetoggle } from './Themetoggle'
import {AiOutlineMenu ,AiOutlineClose } from "react-icons/ai"
import { UserAuth } from '../context/AuthContext'



export const Navbar = () => {

  const[nav ,setnav]=useState(false)
  const{user ,logout} = UserAuth()
  const handlenav =()=>{
    setnav(!nav)
  }


  const navigate = useNavigate()

  const handlesignout = async()=>{
    try{
    await logout()
    navigate("/")
    } catch(e){
      console.log(e.message)
    }
  }




  return (
    <div className='rounded-div flex items-center justify-between h-20 font-bold'>
        <Link to="/">
          <h1 className='text-2xl '>Cryptobase</h1>
        </Link> 

        <div className='hidden md:block'> 
          <Themetoggle/>
        </div>


     {
      user?.email ? (
        <div className='hidden md:block '>
        <Link to="/account" className='p-4 hover:text-accent'>Account</Link>
        <button  onClick={handlesignout}  to="/signup" className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg  hover:shadow-2xl '>Log Out</button>
      </div>

      ) : (
        <div className='hidden md:block '>
        <Link to="/signin" className='p-4 hover:text-accent'>Sign In</Link>
        <Link to="/signup" className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg  hover:shadow-2xl '>Sign Up</Link>
      </div>
      )}




        <div
        onClick={handlenav}
        className='block md:hidden cursor-pointer z-10 '>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>  }
        </div>

        <div className={nav ? " md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-0 " 
        :"fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300"}>
          <ul className='w-full p-4 '>
            <li onClick={handlenav}   className='border-b py-6 '>
              <Link to="/home">Home</Link>
            </li>
            <li  onClick={handlenav}    className='border-b py-6 '       >
              <Link to="/account">Account</Link>
            </li>
            <li className=' py-6 ' >
              <Themetoggle/>
            </li>
          </ul>

          <div className='flex flex-col w-full p-4 '>
            <Link to="/signin">
              <button  onClick={handlenav}    className='w-full my-2 p-3 bg-primary text-primary  rounded-2xl shadow-xl'>Sign In</button>
            </Link>
            <Link to="/signup">
              <button  onClick={handlenav}    className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign Up</button>
            </Link>
          </div>

        </div>


    </div>
  )
}
