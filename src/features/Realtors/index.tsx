"use client";
import React, { useEffect, useState } from 'react'

import RealtorNavbar from './components/RealtorNavbar'
import RealtorCard from './components/RealtorCard'
import RightSideBar from './components/FindAgent'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import FindAgent from './components/FindAgent'
import LatestPosts from './components/LatestPosts'
import FeaturedProperties from './components/FeaturedProperties'
import { useSession } from 'next-auth/react'
import { useGetAllRealtors } from '@/hooks/useGetAllRealtors';
import { BiLoaderAlt } from 'react-icons/bi';
import { Profile } from '@/context/types';

type Props = {}

const Realtors = (props: Props) => {
    const { data, loading, allData } = useGetAllRealtors()
    const [realtorData, setRealtorData] = useState([])

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setRealtorData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);




    return (
        <section className='flex flex-col md:flex-row md:space-x-7'>
            {/* the main realtor field */}
            <div className=' max-w-[900px]  md:mx-auto my-7 flex flex-col space-y-8 px-4 md:px-0'>
                <RealtorNavbar />

                {/* the realtor cards */}
                <div className='flex flex-wrap justify-center md:justify-between'>

                    {
                        realtorData?.map((realtor: Profile) => (
                            <RealtorCard key={realtor.id} url={realtor.attributes.professional_profile?.data?.attributes.url_link} phone={realtor.attributes.professional_profile?.data?.attributes?.phone} profile_pic={realtor.attributes.professional_profile?.data?.attributes.professional_photo?.data?.attributes?.url} lastname={realtor.attributes.last_name} firstname={realtor.attributes.first_name} email={realtor.attributes.user?.data?.attributes.email} Agency_name={realtor.attributes.agency?.data?.attributes.Agency_name} />
                        ))
                    }


                </div>

                {
                    loading && (
                        <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                    )
                }



                {/* the pagination */}
                <div className='flex justify-center'>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink className='border' href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>

            {/* The right section */}
            <div className='flex flex-col px-4 md:px-0'>
                <div>
                    <FindAgent />
                    <FeaturedProperties />
                    <LatestPosts />

                </div>

            </div>
        </section>
    )
}

export default Realtors