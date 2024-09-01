"use client";
import Image from 'next/image'
import React, { useContext } from 'react'
import { DashboardIcon } from '../svgs'
import { SidebarList } from '../data'
import { usePathname, useRouter } from 'next/navigation';
import { FeedContext } from '@/context/FeedContext';

type Props = {}

const Sidebar = (props: Props) => {
    const params = usePathname()
    const router = useRouter()
    const { showFilters, setShowFilters } = useContext<any>(FeedContext)

    function checkTextAfterDashboard(text: string) {
        if (text === "Mortgage Broker") {
            text = "Brokers";
        }

        // if (text === "Running Adds") {
        //     text = "running-adds"
        // }

        // Split the URL by "/"
        const segments = params.split('/');

        // Find the index of the first occurrence of "/dashboard/"
        const dashboardIndex = segments.findIndex(segment => segment === 'dashboard');

        // If "/dashboard/" is found in the URL and the index of the next segment is within bounds
        if (dashboardIndex !== -1 && dashboardIndex + 1 < segments.length) {
            // Get the text after the first "/"
            const textAfterFirstSlash = segments[dashboardIndex + 1];

            // If the text after the first "/" is not undefined and matches the provided text, return true
            if (textAfterFirstSlash && textAfterFirstSlash.toLowerCase() === text.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    if (!showFilters) {
        return (
            <div>
                {
                    SidebarList.map((list) => (
                        <div onClick={() => {
                            if (list.text === "Filters") {
                                setShowFilters(true)
                            } else {
                                router.push(list.link)
                            }

                        }} key={list.id} className={`hidden md:flex px-[23px] py-[16px] my-1 space-x-4 items-center ${checkTextAfterDashboard(list.text) && "bg-[#3EB87F]"} cursor-pointer hover:bg-green-200 rounded-[8px]`}>
                            <list.Icon white={checkTextAfterDashboard(list.text) ? true : false} />
                            <h1 className={`font-bold text-[16px] leading-[22.31px] text-nowrap ${checkTextAfterDashboard(list.text) ? "text-white" : "text-[#34495D]"}`}>{list.text}</h1>
                        </div>
                    ))
                }

            </div >
        )
    }

}

export default Sidebar