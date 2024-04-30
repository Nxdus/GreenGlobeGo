import Link from 'next/link'
import React from 'react'

import { FaCompass , FaCar, FaBars  } from "react-icons/fa";

function Navbar() {
  return (
    <div className="w-full h-16 flex justify-around items-center px-12 fixed bottom-0 rounded-t-2xl bg-[#D69359]">
        <Link href={"/compass"}><FaCompass className='text-3xl text-white' /></Link>
        <Link href={"/calculator"}><FaCar className='text-3xl text-white' /></Link>
        <Link href={"/infomation"}><FaBars className='text-3xl text-white' /></Link>
    </div>
  )
}

export default Navbar