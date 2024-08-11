"use client";
import React, { ReactNode, useContext } from 'react'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { FeedContext } from '@/context/FeedContext';
import FeedFilters from '../Feed/components/FeedFilters';

interface Props {
    children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
    const { showFilters } = useContext<any>(FeedContext)
    return (
        <section className='md:max-w-[1550px]  mx-auto py-5  w-full'>
            {/* the nav bar */}
            <Navbar />
            <div className=' mx-auto md:py-[25px] grid gap-[24px]'>
                <main className='flex  flex-col px-3 md:flex-row gap-[24px]'>
                    {/* sidebar here */}
                    {
                        showFilters ? (
                            <FeedFilters />) : (
                            <Sidebar />

                )
                    }



                    {/* main feed here */}
                    <div className='flex-1  '>{children}</div>
                </main>
            </div>
        </section>
    )
}

export default DashboardLayout