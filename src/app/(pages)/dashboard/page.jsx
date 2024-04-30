import Link from 'next/link';
import React from 'react'

function page() {

    return (
        <main className='w-full h-full flex flex-col justify-start items-center py-24'>
            <h1 className='text-2xl' > แอดมินแดชบอร์ด </h1>
            <ul className='w-full h-auto flex flex-col justify-center items-center gap-4 mt-12'>
                <li className='text-lg text-center w-72 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]'><Link href={"/dashboard/locations"}> แก้ไขโลเคชั่น </Link></li>
                <li className='text-lg text-center w-72 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]'><Link href={"/dashboard/posts"}> แก้ไขสถานที่ท่องเที่ยว </Link></li>
                <li className='text-lg text-center w-72 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]'><Link href={"/dashboard/users"}> แก้ไขผู้ใช้ </Link></li>
                <li className='text-lg text-center w-72 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]'><Link href={"/infomation"}>กลับหน้าหลัก</Link></li>
            </ul>
        </main>
    )
}

export default page