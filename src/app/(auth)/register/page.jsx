"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

function page() {

  const { data: session } = useSession();
  if (session) redirect("/pages")

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน !");
      return;
    }

    if (!username || !email || !password || !confirmPassword) {
      setError("โปรดกรอกข้อมูลให้ครบ !")
      return;
    }

    try {
      const resCheckUser = await fetch("https://green-globe-go.vercel.app/api/Register/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })

      const { user } = await resCheckUser.json();

      if (user) {
        setError("มีบัญชีผู้ใช้นี้อยู่แล้ว !")
        return;
      }

      const res = await fetch("https://green-globe-go.vercel.app/api/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, email, password
        })
      })

      if (res.ok) {
        const form = e.target;
        setError("");
        setSuccess("ลงทะเบียนสำเร็จ");
        form.reset();
      } else {
        console.log("API มีปัญหา !")
      }

    } catch (error) {
      console.log("การลงทะเบียนมีปัญหา : ", error)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Image 
        src={"/GreenGlobeGo.png"} 
        width={50} 
        height={50} 
        priority={ true }
        alt="Green Globe Go Logo" 
        className="w-[106px] h-[141px] mt-16" 
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center mt-6">

        {error && (
          <div className="text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-300">
            {success}
          </div>
        )}

        <input onChange={(e) => setUsername(e.target.value)} className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]" type="text" placeholder="ชื่อผู้ใช้" />
        <input onChange={(e) => setEmail(e.target.value)} className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]" type="text" placeholder="อีเมลล์" />
        <input onChange={(e) => setPassword(e.target.value)} className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]" type="password" placeholder="รหัสผ่าน" />
        <input onChange={(e) => setConfirmPassword(e.target.value)} className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]" type="password" placeholder="ยืนยันรหัสผ่าน" />
        <button className="text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]" type="submit">ลงทะเบียน</button>
        <Link href={"/"} className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#D69359] bg-[#DEAC80]' >มีบัญชีอยู่แล้ว</Link>
      </form>
    </div>
  )
}

export default page