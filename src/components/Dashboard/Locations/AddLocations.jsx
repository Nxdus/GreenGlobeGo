"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function AddButton() {

    const router = useRouter();

    const [newtitle, setNewTitle] = useState("");
    const [newdesc, setNewDesc] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!newtitle || !newdesc) return

        try {

            const res = await fetch("https://localhost:3000/api/Posts/Location", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ location: newtitle, desc: newdesc })
            })

            if (res.ok) {
                router.replace("/dashboard/locations");
                router.refresh();
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='absolute w-full h-5/6 flex justify-center items-center backdrop-blur'> 
            <form onSubmit={handleSubmit} className='w-auto h-auto py-4 px-6 flex flex-col justify-center items-center gap-3 rounded-3xl border-b-4 border-slate-500 bg-slate-50'>
                <p className='text-2xl drop-shadow-md'> เพิ่ม Locations </p>
                <input type="text" onChange={(e) => {setNewTitle(e.target.value)}} value={newtitle} placeholder='ชื่อจังหวัด' className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]"/>
                <input type="text" onChange={(e) => {setNewDesc(e.target.value)}} value={newdesc} placeholder='รายละเอียด' className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]"/>
                <div className="flex gap-2">
                    <button onClick={() => {router.replace("/dashboard/locations");}} className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#D69359] bg-[#DEAC80]' type='button' > <FaXmark /> </button>
                    <button className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]' type='submit' > <FaCheck /> </button>
                </div>
            </form>
        </div>
    )
}

export default AddButton