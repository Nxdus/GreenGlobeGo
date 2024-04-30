"use client"

import React from 'react'
import { useRouter } from 'next/navigation';

import { FaTrashAlt } from "react-icons/fa";

function DeleteButton({ id }) {

    const router = useRouter();

    const removeLocations = async() => {
        const confirmed = confirm("Are you sure?");

        if (confirmed) {
            const res = await fetch(`https://localhost:3000/api/Posts/Location/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            }
        }
    }

    return (
        <button type="button" onClick={removeLocations} className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#c52f2f] bg-[#ff4242]'>
            <FaTrashAlt />
        </button>
    )
}

export default DeleteButton