"use client";

import Image from "next/image";
import Link from "next/link";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";

import { FaGoogle } from "react-icons/fa";

export default function Home() {
  
  const { data: session } = useSession();
  if (session) redirect("/calculator");

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [error,setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {

      const res = await signIn("credentials", {
        email, password, redirect: false
      });

      if (res.error) {
        setError("ข้อมูลไม่ถูกต้อง !");
        return;
      }

    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: `/dashboard` })
  };

  return (
    <div className="flex flex-col items-center">
      <Image 
        src={"/GreenGlobeGo.png"} 
        width={50} 
        height={50} 
        alt="Green Globe Go Logo" 
        priority={ true }
        className="w-[106px] h-[141px] mt-20" 
      />

      {error && (
        <div className="text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center mt-10">
        <input onChange={(e) => setEmail(e.target.value)} className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]" type="text" placeholder="อีเมลล์" />
        <input onChange={(e) => setPassword(e.target.value)} className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]" type="password" placeholder="รหัสผ่าน" />
        <button className="text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]" type="submit">เข้าสู่ระบบ</button>
        <Link href={"/register"} className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#D69359] bg-[#DEAC80]' >ลงทะเบียน</Link>
        <a onClick={loginWithGoogle} className='flex justify-center items-center gap-3 text-2xl text-black px-8 py-2 rounded-full border-b-4 border-[#bbbbbb] bg-[#e9e9e9]' > เข้าสู่ระบบด้วย <FaGoogle /></a>
      </form>
    </div>
  );
}
