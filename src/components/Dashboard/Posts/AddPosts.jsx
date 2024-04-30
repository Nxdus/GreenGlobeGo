"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json())

function AddPosts() {

    const router = useRouter();

    const [location, setLocation] = useState(null)

    const { data, error, isLoading } = useSWR('/api/Posts/Location', fetcher, {
        onSuccess: (data) => {
            const { locations } = data;
            setLocation(locations)
        }
    })

    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState();

    const [newtitle, setNewTitle] = useState("");
    const [newdesc, setNewDesc] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newLat, setNewLat] = useState(0.0);
    const [newLong, setNewLong] = useState(0.0);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!newtitle || !newdesc || uploading || !selectedFile) return

        setUploading(true);

        const formData = new FormData();
        formData.append("file", selectedFile)

        const resImage = await fetch("https://green-globe-go.vercel.app/api/Image", {
            method: "POST",
            body: formData,
        })

        try {

            const result = await resImage.json();

            if (result.imgUrl) setSelectedImage(result.imgUrl)

            const res = await fetch("https://green-globe-go.vercel.app/api/Posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ title: newtitle, desc: newdesc, img: result.imgUrl, location: newLocation, lat: newLat, long: newLong })
            })

            if (res.ok) {
                router.replace("/dashboard/posts");
                router.refresh();
            }

        } catch (error) {
            console.log(error)
        }

        setUploading(false);
    }

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <div className='absolute w-full h-5/6 flex justify-center items-center backdrop-blur'> 
            <form onSubmit={handleSubmit} className='w-auto h-auto py-4 px-6 flex flex-col justify-center items-center gap-3 rounded-3xl border-b-4 border-slate-500 bg-slate-50'>
                <p className='text-2xl drop-shadow-md'> เพิ่ม Locations </p>
                <input type="text" onChange={(e) => {setNewTitle(e.target.value)}} value={newtitle} placeholder='ชื่อสถานที่ท่องเทียว' className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]"/>
                <input type="text" onChange={(e) => {setNewDesc(e.target.value)}} value={newdesc} placeholder='รายละเอียด' className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]"/>
                <div className="w-full px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]">
                    <label>
                        <input type="file" hidden onChange={({target}) => {
                            if (target.files) {
                                const file = target.files[0];
                                setSelectedImage(URL.createObjectURL(file));
                                setSelectedFile(file);
                            }
                        }} />
                        <div className="flex items-center justify-center cursor-pointer">
                            {selectedImage ? (<>
                                <Image 
                                    src={selectedImage} 
                                    width={80}
                                    height={80}
                                    alt="รูปภาพ"
                                    className='rounded-2xl'
                                />
                            </>) : (<p> อัพโหลดรูปภาพ </p>)}
                        </div>
                    </label>
                </div>
                <select onChange={(e) => {setNewLocation(e.target.value)}} className="w-full px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]">
                    <option value=""> เลือกจังหวัด </option>
                    {location ? location.map((locate) => (
                    <option key={locate._id} value={locate.location}> {locate.location} </option>
                    )) : null}
                </select>
                <input type="number" onChange={(e) => {setNewLat(e.target.value)}} value={newLat} placeholder='ละติจูด' className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]"/>
                <input type="number" onChange={(e) => {setNewLong(e.target.value)}} value={newLong} placeholder='ลองติจูด' className="px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]"/>
                <div className="flex gap-2">
                    <button onClick={() => {router.replace("/dashboard/posts");}} className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#D69359] bg-[#DEAC80]' type='button' > <FaXmark /> </button>
                    <button disabled={uploading} className='text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#A6B575] bg-[#B5C18E]' type='submit' > <FaCheck /> </button>
                </div>
            </form>
        </div>
    )
}

export default AddPosts