import { Divider } from '@mantine/core'
import React from 'react'
import DonutChartData from './components/DonutChartData'
import MarketTrends from './components/MarketTrends'
import TopAgent from './components/TopAgent'
import Customers from './components/Customers'
import PriceAvg from './components/PriceAvg'
import IconShowcaseBox from './shared/IconShowcaseBox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FeedPropertyCard from '../Feed/components/FeedPropertyCard'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {}

const ProfessionalDashboard = (props: Props) => {
    return (
        <div>
            <Divider my="sm" />
            {/* the prof data */}
            <div className='flex flex-wrap '>
                <DonutChartData header='Properties for Sale' amount='684' data={[{ name: 'USA', value: 400, color: '#6c5dd3' },]} />
                <DonutChartData header='Properties for Rent' amount='546' data={[{ name: 'USA', value: 400, color: '#fd8539' },]} />
                <DonutChartData header='Total Customer' amount='5,732' data={[{ name: 'USA', value: 400, color: '#2ed480' },]} />
                <DonutChartData header='Total City' amount='90' data={[{ name: 'USA', value: 400, color: '#fe6d8e' },]} />
            </div>

            {/* market trends */}
            <h1 className='mt-10 text-[#11142D] text-[18px] font-semibold'> Market Trends</h1>
            <div className='flex flex-wrap mt-5'>
                <MarketTrends />
                <MarketTrends />
                <MarketTrends />
            </div>

            {/*  top agent customer prive avg per location*/}
            <div className='flex flex-wrap mt-10'>
                {/* top Agent */}
                <TopAgent />
                {/* customer */}
                <Customers />

                {/* price avg per location */}
                <PriceAvg />

            </div>

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
        </div>
    )
}

export default ProfessionalDashboard