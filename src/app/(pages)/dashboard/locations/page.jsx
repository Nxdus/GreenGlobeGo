import React from 'react'
import EditLocations from "@/components/Dashboard/Locations/EditLocations"
import DeleteButtons from "@/components/Dashboard/Locations/DeleteButton"
import AddLocations from "@/components/Dashboard/Locations/AddLocations"

import { FaPlus, FaChevronLeft, FaPen } from "react-icons/fa";
import Link from 'next/link';

const getLocations = async() => {
  try {
    const res = await fetch("https://green-globe-go.vercel.app/api/Posts/Location", {
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

  const { locations } = await getLocations();
  const { e, id } = searchParams;

  return (
    <main className='w-full h-full flex flex-col justify-start items-center'>
      <div className="absolute top-6 right-6 text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]"><Link href={"?e=add"}><FaPlus /></Link></div>
      <div className="absolute top-6 right-32 text-2xl text-white px-8 py-2 rounded-full border-b-4 border-red-600 bg-red-500"><Link href={"/dashboard"}><FaChevronLeft /></Link></div>

      {e === 'add' && (<AddLocations />)}
      {e === 'edit' && (<EditLocations id={id} />)}

      <div className="w-auto h-4/5 flex flex-col gap-3 overflow-auto mt-20">
        {locations.map((locate) => (
          <div key={locate._id} className="w-80 flex flex-col items-center gap-5 px-8 py-4 border-b-4 border-slate-300 rounded-2xl bg-slate-50">
            <p className='px-6 py-2 max-w-64 text-center text-xl rounded-3xl border-b-4 border-[#E2B274] bg-[#F7DCB9]'>{locate.location}</p>
            <p className='px-6 py-2 max-w-72 text-center text-xl rounded-3xl border-b-4 border-[#E2B274] bg-[#F7DCB9]'>{locate.desc || "ไม่มีรายละเอียด"}</p>
            <div className="flex justify-center items-center gap-3">
              <button className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#c5842f] bg-[#ffb049]'><Link href={`?e=edit&id=${locate._id}`}><FaPen /></Link></button>
              <DeleteButtons id={locate._id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default page