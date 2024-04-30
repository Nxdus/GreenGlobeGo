import React from 'react'
import { Calculate } from '@/lib/calculator';
import { useRouter } from 'next/navigation';

function getResult(props) {

    const router = useRouter();

    const { distance, vehicles } = props;
    const Result = Calculate(distance, vehicles);

    return (
        <main className='w-auto h-auto flex flex-col justify-center items-center gap-5'>
            <h1 className='w-64 text-2xl text-center' > ปริมาณคาร์บอนฟุตปรินซ์ที่ถูกปล่อยออกมา </h1>
            <p className='px-12 py-2 text-xl flex justify-center items-center rounded-full border-b-2 border-[#E2B274] bg-[#F7DCB9] drop-shadow-md'>{Result.amountCarbon}</p>

            {Result.amountTree > 0 && (<>
            <h1 className='w-64 text-2xl text-center' > ต้องปลูกต้นไม้เพื่อดูดซับคาร์บอน </h1>
            <p className='px-12 py-2 text-xl flex justify-center items-center rounded-full border-b-2 border-[#E2B274] bg-[#F7DCB9] drop-shadow-md'>{Result.amountTree} ต้น </p>
            </>)}

            <p className='w-80 text-red-400 text-center'>ปริมาณคาร์ยอนที่ถูกปล่อยออกมาจำนวนมากกำลังค่อยๆทำร้ายโลก มาช่วยกันลดปริมาณคาร์บอนที่ถูกปล่อยออกมากันเถอะ...</p>
            <button onClick={() => {router.push('/calculator')}} className="text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]" > คำนวณใหม่อีกครั้ง </button>
        </main>
    )
}

export default getResult