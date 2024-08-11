import { ProfSettingsContext } from '@/context/ProfSettingsContext';
import { Event } from '@/context/types';
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox';
import Image from 'next/image';
import React, { useContext } from 'react'
import { FaRegCircle } from "react-icons/fa";

type Props = {
    height?: string;
    name?: string;
    price?: string;
    banner?: any;
    circle?: boolean;
    id?: number;
    eventId?: number;
    event?: Event
}

const AgentEvent = ({ height, name, price, banner, circle, id, eventId, event }: Props) => {
    const { selectedListing, setSelectedListing, setEventDetails, setDays } = useContext(ProfSettingsContext)

    // console.log("this is the selectedListing", selectedListing)
    return (
        <div onClick={() => {
            if (setSelectedListing && circle && setEventDetails) {

                if (selectedListing && (selectedListing?.id === id)) {
                    setSelectedListing(null)
                    setEventDetails({
                        location: "",
                        event_type: ""
                    })
                    if (setDays) {
                        setDays([])
                    }
                } else {
                    setEventDetails({
                        location: event?.attributes?.location || "",
                        event_type: event?.attributes?.event_type || ""
                    })
                    setSelectedListing({
                        name: name,
                        price: price,
                        banner: banner,
                        id: id,
                        eventId: eventId,
                        event: event,
                    })
                }
            }

        }} className={`flex space-x-3 ${circle && "cursor-pointer"} items-center ${height ? height : "h-[125px]"}  `}>

            {/* the image */}
            <Image src={banner?.data?.length > 0 ? banner?.data[0]?.attributes?.url : "/Broker/Event.png"} className='w-[35%] h-full object-cover rounded-lg' width={500} height={500} alt='event image' />

            {/* the event description */}
            <div className='flex flex-col space-y-1 justify-between w-[55%]'>
                <div className='flex items-center justify-between'>
                    <div>
                        <IconShowcaseBox text={price ? price : '$4800'} height='h-[16px]' width='w-fit' textCN='text-[#1F1F1F] text-[0.6rem] lg:text-[12px] font-semibold' textCenter color='#C3FFE3' rounded='5px' />
                    </div>
                    {
                        circle && (
                            <FaRegCircle className={` ${selectedListing && (selectedListing?.id === id) && "text-green-500"}`} />
                        )
                    }
                </div>
                <h1 className='text-[0.6rem] lg:text-[16px] text-[#11142D] leading-[24px] font-semibold'>{name ? name : "Metro Jayakarta Hotel & Spa"}</h1>
                <div className='flex space-x-2 items-center'>
                    <Image src={"/Broker/Location.svg"} alt='location' width={500} height={500} className='h-[18px] w-[18px]' />
                    <h1 className='text-[#808191] text-[0.6rem] lg:text-[14px] leading-[22px]'>North Carolina, USA</h1>
                </div>
                <div className='flex items-center space-x-4'>
                    <div className='flex space-x-2 items-center'>
                        <Image src={"/Broker/Bed.svg"} alt='location' width={500} height={500} className='h-[18px] w-[18px]' />
                        <h1 className='text-[#808191] text-[0.6rem] lg:text-[12px] leading-[18px]'>4 Beds</h1>
                    </div>

                    <div className='flex space-x-2 items-center'>
                        <Image src={"/Broker/Cross.svg"} alt='location' width={500} height={500} className='h-[18px] w-[18px]' />
                        <h1 className='text-[#808191] text-[0.6rem] lg:text-[12px] leading-[18px]'>28M</h1>
                    </div>
                </div>
            </div>
            <div className='lg:hidden w-[5%]'>
                <Image src={"/Broker/ArrowDown.svg"} alt='arrow down' width={500} height={500} className='h-[32px] w-[32px]' />
            </div>
        </div>
    )
}

export default AgentEvent