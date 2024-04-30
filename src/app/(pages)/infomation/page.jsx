"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React, { useState } from 'react'

import Logout from '@/components/Logout'
import { useRouter } from 'next/navigation';

import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function page({ searchParams }) {

  const router = useRouter();

  const {data: session} = useSession();
  const { d: change } = searchParams

  const [username, setUsername] = useState(session.user.name);
  const [password, setPasswrod] = useState("");
  const [newPassword, setNewPasswrod] = useState("");

  const handleChangeUsername = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(`https://localhost:3000/api/Register/${session.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ newUsername : username })
      })

      if (res.ok) {
        session.user.name = username;
        router.replace("/infomation");
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangePassword = async(e) => {
    e.preventDefault();

    try {

      const resCheckPasswrod = await fetch(`https://localhost:3000/api/Register/checkPassword/${session.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Password : password })
      })
  
      const {passwordMatched: matched } = await resCheckPasswrod.json()
  
      if (!matched) return

      const res = await fetch(`https://localhost:3000/api/Register/${session.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ newPassword : newPassword })
      })

      if (res.ok) {
        router.replace("/infomation");
      }
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <main className='w-full h-full flex flex-col justify-start items-center' >

      <h1 className='text-2xl mt-24'> สวัสดีคุณ {session.user.name}</h1>

      {change === "changeUsername" && (
        <div className='absolute w-full h-5/6 flex justify-center items-center backdrop-blur'> 
          <form onSubmit={handleChangeUsername} className='w-auto h-auto py-4 px-6 flex flex-col justify-center items-center gap-3 rounded-3xl border-b-4 border-slate-500 bg-slate-50'>
            <p className='text-2xl drop-shadow-md'> เปลี่ยนชื่อผู้ใช้ </p>
            <input type="text" onChange={(e) => {setUsername(e.target.value)}} value={username} className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]"/>
            <div className="flex gap-2">
              <button onClick={() => {router.replace("/infomation");}} className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#D69359] bg-[#DEAC80]' type='button' > <FaXmark /> </button>
              <button className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]' type='submit' > <FaCheck /> </button>
            </div>
          </form>
        </div>
      )}
      {change === "changePassword" && (        
        <div className='absolute w-full h-5/6 flex justify-center items-center backdrop-blur'> 
          <form onSubmit={handleChangePassword} className='w-auto h-auto py-4 px-6 flex flex-col justify-center items-center gap-3 rounded-3xl border-b-4 border-slate-500 bg-slate-50'>
            <p className='text-2xl drop-shadow-md'> เปลี่ยนรหัสผ่าน </p>
            <input type="password" onChange={(e) => {setPasswrod(e.target.value)}} value={password} placeholder='รหัสผ่านของคุณ' className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]"/>
            <input type="password" onChange={(e) => {setNewPasswrod(e.target.value)}} value={newPassword} placeholder='รหัสผ่านใหม่' className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]"/>
            <div className="flex gap-2">
              <button onClick={() => {router.replace("/infomation");}} className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#D69359] bg-[#DEAC80]' type='button' > <FaXmark /> </button>
              <button className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]' type='submit' > <FaCheck /> </button>
            </div>
          </form>
        </div>
      )}

      <ul className='w-full h-auto flex flex-col justify-center items-center gap-4 mt-12'>
        <li className='text-lg text-center w-72 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]'><Link href={"?d=changeUsername"}> เปลี่ยนชื่อผู้ใช้ </Link></li>
        <li className='text-lg text-center w-72 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]'><Link href={"?d=changePassword"}> เปลี่ยนรหัสผ่าน </Link></li>
        {session.user.role === 'admin' && (<li className='text-lg text-center w-72 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]'><Link href={"/dashboard"}> แอดมินแดชบอร์ด </Link></li>)}
        <li className='text-lg text-center w-72 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]'><Logout /></li>
      </ul>

    </main>
  )
}

export default page