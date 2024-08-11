"use client";
import { Listing } from '@/context/types';
import FeedPropertyCard from '@/features/Feed/components/FeedPropertyCard'
import { useGetListings } from '@/hooks/useGetListings';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import AddListing from '../shared/AddListing';

type Props = {}

const AgentProfListings = (props: Props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [listingsData, setListingsData] = useState([])
    const { data, loading, allData } = useGetListings()

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setListingsData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);

    return (
        <section className='bg-[#FCFCFC] flex flex-col space-y-3 mt-10 rounded-[10px] w-full  p-[20px]'>

            {/* the header */}
            <div>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Active Listing</h1>
            </div>

            {/* the listings */}
            <div className='max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4' >
                <FeedPropertyCard featuredClassName Add Addtext='Add New Listing' AddOnclick={open} />
                {
                    listingsData?.map((listing: Listing) => (
                        <FeedPropertyCard bannerTrue key={listing?.id} id={listing?.id} banner={listing?.attributes?.Gallery} title={listing?.attributes?.name} description={listing.attributes.description} location={listing.attributes.location} price={listing.attributes.price}  currency={listing.attributes.currency} featuredClassName />
                    ))
                }
            </div >

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }

            <AddListing opened={opened} close={close} />

        </section>
    )
}

export default AgentProfListings