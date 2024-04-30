import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const getPosts = async (location) => {

    try {

        if (!location) {

            const res = await fetch("https://localhost:3000/api/Posts", {
                method: "GET",
                cache: "no-store"
            });

            if (!res.ok) {
                throw new Error("Failed to fetch data.");
            }

            return res.json();
        }

        const res = await fetch(`https://localhost:3000/api/Posts?location=${location}`, {
            method: "GET",
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data.");
        }

        return res.json();
        
    } catch (error) {
        console.log(error);
    }
}

async function Posts(props) {

    if(props.location != null && props.location === '') redirect("/compass")

    const { posts } = await getPosts(props.location);

    if (!posts[0]) {
        return (        
            <div className="w-80 h-96 mt-5 py-5 overflow-hidden overflow-y-scroll flex flex-col justify-start items-center rounded-3xl border-b-4 border-[#E2B274] bg-[#F7DCB9]">
                <p className='text-red-500'> ไม่มีสถานที่ในจังหวัดนี้... </p>
            </div>
        )
    }

    return (
        <div className="w-80 h-96 mt-5 py-5 overflow-hidden overflow-y-scroll flex flex-col justify-start items-center gap-3
        rounded-3xl border-b-4 border-[#E2B274] bg-[#F7DCB9]">
            {posts.map((post) => (
                <div key={post._id} className="w-72 h-36 flex justify-between items-center px-4 py-4 rounded-2xl border-b-4 border-[#9b6a40] bg-[#D69359]">
                    <Image
                            src={post.img}
                            width={120}
                            height={120}
                            alt="รูปภาพ"
                            className='aspect-auto bg-white rounded-2xl'
                    />
                    <div className="w-56 ml-5 flex flex-col gap-2">
                        <h1 className='font-bold w-32 h-6 overflow-auto'>{post.title}</h1>
                        <div className="w-32 h-12 overflow-hidden overflow-y-scroll">
                            <p>
                                {post.desc}
                            </p>
                        </div>
                        <button className='bg-[#B5C18E] border-b-2 border-[#7a8651] rounded-xl w-24 px-3 py-1'>เดินทาง</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Posts