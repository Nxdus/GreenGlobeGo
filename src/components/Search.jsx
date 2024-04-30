"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

import useSWR from 'swr';
import useAutocomplete from '@mui/material/useAutocomplete';

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Search() {

    const [locate, setLocate] = useState(null);

    const { data, error, isLoading } = useSWR('/api/Posts/Location', fetcher, {
        onSuccess: (data) => {
            setLocate(data.locations)
        }
    })

    const router = useRouter();

    const onSearch = (e) => {
        e.preventDefault();
        const encodeSearchQuery = getInputProps().value;

        router.push(`/compass?location=${encodeSearchQuery}`);
    }

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
      } = useAutocomplete({
        id: 'Locations',
        options: locate,
        isOptionEqualToValue: (data, value) => data._id === value._id,
        getOptionLabel: (data) => data.location,
        getInputProps: (data) => ({ onMouseDown: data.location })
    });


    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <form className='w-64 mt-6 flex justify-center items-center' onSubmit={onSearch}>
            <div>
                <div {...getRootProps()}>
                    <input {...getInputProps()} type='text' placeholder='จังหวัดที่คุณอยู่ ?' className='rounded-full px-3 py-1 border-b-2 border-[#E2B274] bg-[#F7DCB9]' />
                </div>
                {groupedOptions.length > 0 ? (
                    <ul 
                    className='w-60 max-h-36 h-auto absolute overflow-auto' 
                    {...getListboxProps()}>
                    {groupedOptions.map((option, index) => (
                        <li className='px-2 bg-white border-b-2 hover:bg-slate-500 active:bg-slate-700' {...getOptionProps({ option, index })} key={index}>{option.location}</li>
                    ))}
                    </ul>
                ) : null}
            </div>
        </form>
    )
}

export default Search