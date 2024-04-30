"use client"

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

import { FaMap } from "react-icons/fa";

import GetDistance from '@/components/Calculator/getDistance'
import GetVehicles from '@/components/Calculator/getVehicles'
import GetResult from '@/components/Calculator/getResult'
import ViewMaps from '@/components/Maps/viewMaps'

function page() {

  const searchParams = useSearchParams();

  const distance = searchParams.get('distance')
  const vehicles = searchParams.get('vehicles')
  const [useMaps, setUseMaps] = useState(true);

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      {!distance && (<button className='w-12 h-12 p-2 flex justify-center items-center rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]
      absolute top-12 right-4 z-10' onClick={() => setUseMaps(!useMaps)} ><FaMap className='text-3xl text-[#D69359] drop-shadow-sm' /></button>)}
      {useMaps ? !distance && (<ViewMaps />) : !distance && (<GetDistance />)}
      {distance && !vehicles && (<GetVehicles distance={distance} />)}
      {distance && vehicles && (<GetResult distance={distance} vehicles={vehicles} />)}
    </div>
  )
}

export default page