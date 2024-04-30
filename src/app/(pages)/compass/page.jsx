import Search from "@/components/Search"
import Posts from "@/components/Posts"
import React from 'react'

function page({ searchParams }) { 

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <p className="text-2xl"> สถานที่ท่องเที่ยวรักโลก </p>
      <Search />
      <Posts location={searchParams.location} />
    </div>
  )
}

export default page