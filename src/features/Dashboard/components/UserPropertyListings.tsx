import React from 'react'
import IconShowcaseBox from '../shared/IconShowcaseBox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import FeedPropertyCard from '@/features/Feed/components/FeedPropertyCard'

type Props = {}

function UserPropertyListings({ }: Props) {
    return (
        <div className='rounded-[15px] bg-white px-2 py-[20px] my-5'>

            {/* the header */}
            <div className='flex flex-col max-md:space-y-2 md:flex-row md:justify-between md:items-center '>
                <h1 className='text-[18px] font-semibold text-[#11142D]'>My listings</h1>

                <div className='flex flex-wrap'>
                    <IconShowcaseBox mx='mx-2' my='my-2' text='Popular' color='#3EB87F' px='15px' noBorder textCN='text-[12px] font-semibold text-[#FCFCFC]' />
                    <IconShowcaseBox mx='mx-2' my='my-2' text='Recommended' color='#F7F7F7' textCN='text-[12px] font-semibold text-[#808191]' />
                    <IconShowcaseBox mx='mx-2' my='my-2' text='Newest' color='#F7F7F7' textCN='text-[12px] font-semibold text-[#808191]' />

                    <Select>
                        <SelectTrigger className=" bg-white text-[14px] w-[114px] max-md:mx-2 max-md:my-2 text-[#1A1A1A] leading-[18px] font-normal">
                            <SelectValue className='text-[12px] font-semibold text-[#808191]' placeholder={"Most Recent"} />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value={`Default value`}>Default value</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>


            {/* the property listings */}
            <div className='max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 ' >
                <FeedPropertyCard featuredClassName />
                <FeedPropertyCard featuredClassName />
                <FeedPropertyCard featuredClassName />
                <FeedPropertyCard featuredClassName />
                <FeedPropertyCard featuredClassName />
                <FeedPropertyCard featuredClassName />
                <FeedPropertyCard featuredClassName />
                <FeedPropertyCard featuredClassName />
            </div >

            {/* the pagination */}
            <div className='flex justify-center' >
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
            </div >


        </div>
    )
}

export default UserPropertyListings