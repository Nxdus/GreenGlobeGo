import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function getDistance() {

    const router = useRouter();
    const [distance, setDistance] = useState(0);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!distance) return;
        
        router.push(`/calculator?distance=${distance}`)
    }

    return (
        <main className='w-auto h-auto flex flex-col justify-center items-center gap-3'>
            <h1 className='text-2xl' > ระยะทางในการเดินทาง ? </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center mt-6">
                <input onChange={(e) => setDistance(e.target.value)} className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]" type="number"  placeholder='ระยะทางในการเดินทาง ?' />
                <p className='text-red-400'> หน่วยเป็นกิโลเมตร </p>
                <button className="text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]" type='submit' > ถัดไป </button>
            </form>
        </main>
    )
}

export default getDistance