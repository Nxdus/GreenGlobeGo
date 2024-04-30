import React from 'react'

import EditLocations from "@/components/Dashboard/Posts/EditPosts"
import DeleteButtons from "@/components/Dashboard/Posts/DeleteButton"
import AddLocations from "@/components/Dashboard/Posts/AddPosts"

import { FaPlus, FaChevronLeft, FaPen } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

const getPosts = async() => {
  try {
    const res = await fetch("https://green-globe-go.vercel.app/api/Posts", {
      method: "GET",
      cache: "no-store"
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
  } catch (error) {
    console.log(error)
  }
}

async function page({ searchParams }) {

  const { posts } = await getPosts();
  const { e, id } = searchParams;

  return (
    <main className='w-full h-full flex flex-col justify-start items-center'>
      <div className="absolute top-6 right-6 text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]"><Link href={"?e=add"}><FaPlus /></Link></div>
      <div className="absolute top-6 right-32 text-2xl text-white px-8 py-2 rounded-full border-b-4 border-red-600 bg-red-500"><Link href={"/dashboard"}><FaChevronLeft /></Link></div>

      {e === 'add' && (<AddLocations />)}
      {e === 'edit' && (<EditLocations id={id} />)}

      <div className="w-auto h-4/5 flex flex-col gap-3 overflow-auto mt-20">
        {posts.map((posts) => (
          <div key={posts._id} className="w-80 flex flex-col items-center gap-2 px-8 py-4 border-b-4 border-slate-300 rounded-2xl bg-slate-50">
            <Image
              src={posts.img}
              sizes='(max-width: 768px) 100vw, 33vw'
              quality={100}
              alt="รูปภาพ"
              className='bg-white rounded-2xl'
            />
            <p className='px-6 py-2 max-w-64 text-center text-xl rounded-3xl border-b-4 border-[#E2B274] bg-[#F7DCB9]'>{posts.title}</p>
            <p className='px-6 py-2 max-w-72 text-center text-xl rounded-3xl border-b-4 border-[#E2B274] bg-[#F7DCB9]'>{posts.desc || "ไม่มีรายละเอียด"}</p>
            <div className="flex justify-center items-center gap-3">
              <button className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#c5842f] bg-[#ffb049]'><Link href={`?e=edit&id=${posts._id}`}><FaPen /></Link></button>
              <DeleteButtons id={posts._id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default page