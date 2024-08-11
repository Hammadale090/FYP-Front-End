"use client";
import { Calendar } from '@/components/ui/calendar'
import { ProfSettingsContext } from '@/context/ProfSettingsContext';
import { Listing } from '@/context/types';
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import AgentEvent from '@/features/ProfilePages/MortgageBrokerView/shared/AgentEvent'
import { useGetListings } from '@/hooks/useGetListings';
import React, { useContext, useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type Props = {}

const ProfSettingsHighlitEvents = (props: Props) => {
    const { data, loading, allData } = useGetListings()
    const { selectedListing, days, setDays } = useContext(ProfSettingsContext)
    const [listingsData, setListingsData] = useState([])

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setListingsData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);



    return (
        <section>

            {/* the calender and events */}
            <div className='flex md:space-x-7'>
                {/* the calendar */}
                <div className='w-full lg:w-[65%]  rounded-[20px] border border-[#000] bg-[#fefefe] py-[20px] px-[20px]'>

                    {/* the event and the calendar navigation */}
                    <div className='flex flex-col max-xl:space-y-2 xl:flex-row xl:justify-between items-center'>

                        <div className='w-full xl:w-[70%]'>
                            {
                                selectedListing?.id && (
                                    <AgentEvent banner={selectedListing.banner} name={selectedListing.name} price={selectedListing.price} />
                                )
                            }
                        </div>

                        <div className='hidden md:flex space-x-2 items-center'>
                            {/* the arrow side */}
                            {/* <IconShowcaseBox px='6px' py='6px' textCenter RealIcon={IoIosArrowBack} borderColor='#000' rounded='8px' width='w-fit' /> */}
                            {/* the text */}
                            {/* <IconShowcaseBox text='March’24' textCN='text-[20px] text-black' textCenter borderColor='#000' rounded='4px' py='6px' px='11px' /> */}
                            {/* the arrow right */}
                            {/* <IconShowcaseBox px='6px' py='6px' textCenter RealIcon={IoIosArrowForward} borderColor='#000' rounded='8px' width='w-fit' /> */}
                        </div>
                    </div>
                    {/* the calander view and map view toggle */}
                    <div className='w-full my-1 rounded-[6px] border border-ravinna p-[10px] '>
                        <div className='flex items-center'>
                            <div className='w-1/2 py-[8px] px-[16px] cursor-pointer bg-[#3EB87F] text-[16px] font-semibold text-white rounded-[6px] flex flex-col justify-center items-center'>
                                Calendar View
                            </div>
                            <div className='w-1/2 cursor-pointer text-[16px] font-semibold text-ravinna flex flex-col justify-center items-center'>
                                Map View
                            </div>
                        </div>
                    </div>
                    {/* the calendar */}
                    <Calendar
                        mode="multiple"
                        
                        styles={{
                            // caption: {
                            //     display: "none"
                            // }
                        }}
                        selected={days}
                        onSelect={(e: any) => {
                            if (selectedListing?.id) {
                                if (setDays) {
                                    setDays(e)
                                }

                            }
                        }}
                    />
                </div>

                {/* the events */}
                <div className='hidden lg:flex lg:flex-col lg:space-y-10 xl:space-y-7 lg:w-[35%] lg:h-[500px] overflow-y-auto'>
                    {
                        listingsData?.map((listing: Listing) => (
                            <AgentEvent event={listing.attributes.event?.data} eventId={listing?.attributes?.event?.data?.id} id={listing.id} circle banner={listing?.attributes?.Gallery} name={listing?.attributes?.name} price={listing?.attributes?.price} key={listing.id} />
                        ))
                    }
                    {
                        loading && (
                            <div className="flex justify-center">
                                <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' />
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default ProfSettingsHighlitEvents