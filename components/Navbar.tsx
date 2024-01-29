import React from 'react'
import Link from 'next/link'
import { BookOpen, PlusSquare } from 'lucide-react';

const Navbar = () => {

    return (
        <div className='fixed bottom-0 z-[10] h-fit border-t-2 py-2 flex items-center w-full'>
            <div className='flex items-center gap-2'>
                <div className='flex flex-col gap-1 items-center cursor-pointer'>
                    <PlusSquare className='h-8 w-8 mb-1' />
                    <p>WorkShop</p>
                </div>
                <div className='flex flex-col gap-1 items-center cursor-pointer'>
                    <BookOpen className='h-8 w-8 mb-1' />
                    <p>Library</p>

                </div>
            </div>
        </div>
    )
}

export default Navbar