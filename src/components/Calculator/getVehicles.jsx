import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaCarSide,FaShuttleVan,FaMotorcycle,FaPlaneDeparture,FaTrain,FaBicycle } from "react-icons/fa";


function getVehicles(props) {

    const router = useRouter();

    const [vehicles, setVehicles] = useState("");
    const distance = props.distance;

    const selectedVehicles = () => {
        if (!vehicles || !distance) return;

        router.push(`/calculator?distance=${distance}&vehicles=${vehicles}`)
    }

    return (
        <main className='w-auto h-auto flex flex-col justify-center items-center gap-5'>
            <h1 className='text-2xl' > คุณเดินทางด้วยวิธีใด ? </h1>

            <div className="w-auto h-auto grid grid-flow-row grid-cols-3 grid-rows-2 gap-4">
                <button onClick={() => setVehicles("Car")} className={buttonCSS}><FaCarSide className={iconCSS} /></button>
                <button onClick={() => setVehicles("Van")} className={buttonCSS}><FaShuttleVan className={iconCSS} /></button>
                <button onClick={() => setVehicles("Motor")} className={buttonCSS}><FaMotorcycle className={iconCSS} /></button>
                <button onClick={() => setVehicles("Plane")} className={buttonCSS}><FaPlaneDeparture className={iconCSS} /></button>
                <button onClick={() => setVehicles("Train")} className={buttonCSS}><FaTrain className={iconCSS} /></button>
                <button onClick={() => setVehicles("Bike")} className={buttonCSS}><FaBicycle className={iconCSS} /></button>
            </div>

            <button onClick={selectedVehicles} className="text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]" > ถัดไป </button>

        </main>
    )
}

export default getVehicles

const buttonCSS = 'w-20 h-20 flex justify-center items-center rounded-2xl border-b-2 border-[#E2B274] bg-[#F7DCB9] drop-shadow-md focus:border-4'
const iconCSS = 'text-white text-5xl drop-shadow-md'