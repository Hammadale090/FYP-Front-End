import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import IconShowcaseButton from '@/features/Dashboard/shared/IconShowcaseButton'
import { Modal } from '@mantine/core'
import { useToast } from '@/components/ui/use-toast'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { format } from "date-fns"
import { ProfSettingsContext } from '@/context/ProfSettingsContext'
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Cert } from '@/context/types'
import NeighborhoodHighlights from './NeighborhoodHighlights'
// import { DateInput } from '@mantine/dates';

type Props = {
    opened: boolean;
    close: () => void;
    address?: string;
    selectedTab?: string;
}

const ShowOnMap = ({ opened, close, address }: Props) => {
    const [loader, setLoader] = useState<boolean>(false)
    const { toast } = useToast();
    const { profileId, professionalId, jwt } = useContext(AuthContext)
    const [currentTab, setCurrentTab] = useState('school');

    const handleTabClick = (tab: string) => {
        setCurrentTab(tab);
    };


    return (
        <Modal opened={opened} size={"55rem"} onClose={() => {
            close()
        }} title={`Neighborhood Highlights`} >

            <div className='w-full flex items-center justify-between pb-8'>
                {/* Tab navigation */}
                {[
                    { title: "School Name", value: 'school' },
                    { title: "Famous Hotel", value: 'hotel' },
                    { title: "Amusement Park", value: 'park' },
                    { title: "Airport", value: 'airport' },
                    { title: "Famous Restaurant", value: 'restaurant' },
                    { title: "Shopping Mall", value: 'shopping mall' },
                ].map((tab, index) => (
                    <div
                        key={index}
                        className={`flex flex-row justify-between items-center mt-4 cursor-pointer`}
                        onClick={() => handleTabClick(tab.value)}
                    >
                        <h1 className={`${currentTab === tab.value ? 'text-[#3EB87F]' : 'text-[#34495D]'} ${currentTab === tab.value ? 'border-b-2	' : 'border-0'} border-[#3EB87F] text-[14px] font-[600] leading-[18px] tracking-[0.5px]`}>{tab.title}</h1>
                    </div>
                ))}
            </div>

            <NeighborhoodHighlights address={address} selectedTab={currentTab} showMap={true} />


            {/* <IconShowcaseButton loading={loader} text={`${certToUpdate?.id ? "Update" : "Add"} Certification`} color='#3EB87F' textCenter width='w-full' textCN='text-[16px] font-semibold leading-[26px] text-white mx-[19px]' px='19px' py='9px' rounded={"4px"} noBorder /> */}
        </Modal >
    )
}

export default ShowOnMap