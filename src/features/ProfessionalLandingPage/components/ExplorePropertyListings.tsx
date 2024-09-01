"use client";
import { Listing } from '@/context/types';
import FeedPropertyCard from '@/features/Feed/components/FeedPropertyCard'
import { useGetListings } from '@/hooks/useGetListings';
import React, { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';

type Props = {}

const ExplorePropertyListings = (props: Props) => {
    const { data, loading, allData, allIds } = useGetListings(true)


    return (
        <div>
            <h1 className='text-[#0B0C0E] text-[26px] md:text-[48px] font-bold leading-[56px] text-center my-10'>Explore Property Listings</h1>

            <div className='flex flex-wrap justify-center md:ml-7' >
                {
                    data?.map((listing: Listing) => (
                        <div key={listing?.id} className='mx-2 my-2'>
                            <FeedPropertyCard  id={listing?.id} title={listing?.attributes?.name} price={listing?.attributes?.price} currency={listing?.attributes?.currency} description={listing?.attributes?.description} banner={listing?.attributes?.Gallery} location={listing?.attributes?.location} featuredClassName />
                        </div>
                    ))
                }



                {
                    loading && (
                        <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                    )
                }
            </div >

        </div>
    )
}

export default ExplorePropertyListings