'use client'
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React, { useEffect, useState } from 'react'
import AgentEvent from '../shared/AgentEvent'
import { useGetListings } from '@/hooks/useGetListings'
import { BiLoaderAlt } from 'react-icons/bi'
import { Listing } from '@/context/types'

type Props = {
    slug?: string | string[]
}

const AgentActiveListing = (props: Props) => {

    const { slug } = props;
    const [listingsData, setListingsData] = useState([])
    const { data, loading, allData } = useGetListings(null, slug)

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setListingsData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);

    return (
        <section className='bg-[#FCFCFC] mt-8 flex flex-col space-y-3 rounded-[10px] w-full  p-[20px]'>

            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Active Listing</h1>
                <IconShowcaseBox text='View All' textColor='#FCFCFC' color='#3EB87F' textCenter noBorder />
            </div>


            {/* the listings */}
            <div className='max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4' >

                {
                    listingsData?.map((listing: Listing) => (
                        <AgentEvent banner={listing.attributes.Gallery} key={listing?.id} name={listing?.attributes?.name} price={listing.attributes.price} />
                        // <FeedPropertyCard key={listing?.id} title={listing?.attributes?.name} description={listing.attributes.description} location={listing.attributes.location} price={listing.attributes.price} featuredClassName />
                    ))
                }

            </div >

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }


            {/* the services
            <div className='grid lg:grid-cols-2 max-lg:flex max-lg:flex-wrap max-lg:justify-center'>
                <AgentEvent noArrow />
                <AgentEvent noArrow />
                <AgentEvent noArrow />
                <AgentEvent noArrow />
            </div> */}
        </section>
    )
}

export default AgentActiveListing