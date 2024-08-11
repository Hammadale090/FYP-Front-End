"use client";
import React, { useEffect, useState } from 'react'
import BrokerNavbar from './components/BrokerNavbar'
import BrokerCard from './components/BrokerCard'
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
import FeaturedProperties from './components/FeaturedProperties'
import LatestPosts from './components/LatestPosts'
import { useGetAllBrokers } from '@/hooks/useGetAllBrokers';
import { Profile } from '@/context/types';
import { BiLoaderAlt } from 'react-icons/bi';

type Props = {}

const Brokers = (props: Props) => {
    const { data, loading, allData } = useGetAllBrokers()
    const [brokerData, setBrokerData] = useState([])

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setBrokerData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);

    return (
        <section className='flex flex-col md:flex-row md:space-x-7'>

            {/* the main broker feed */}
            <div className=' max-w-[900px]  md:mx-auto my-7 flex flex-col space-y-8 px-4 md:px-0'>
                <BrokerNavbar />

                {/* the brokers cards */}
                <div className='flex flex-wrap justify-center md:justify-between'>
                    {
                        brokerData?.map((broker: Profile) => (
                            <BrokerCard key={broker.id} url={broker.attributes.professional_profile?.data?.attributes.url_link} phone={broker.attributes.professional_profile?.data?.attributes?.phone} profile_pic={broker.attributes.professional_profile?.data?.attributes.professional_photo?.data?.attributes?.url} lastname={broker.attributes.last_name} firstname={broker.attributes.first_name} email={broker.attributes.user?.data?.attributes.email} Agency_name={broker.attributes.agency?.data?.attributes.Agency_name} />
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

export default Brokers