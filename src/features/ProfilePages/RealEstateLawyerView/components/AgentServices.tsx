'use client'
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React, { useEffect, useState } from 'react'
import ServicesCard from '../shared/ServicesCard'
import { useGetUserServices } from '@/hooks/useGetUserServices'
import { Service } from '@/context/types'
import { BiLoaderAlt } from 'react-icons/bi'

type Props = {
    slug: string | string[]
}

const AgentServices = (props: Props) => {
    const { slug } = props;
    const [servicesData, setServicesData] = useState([])
    const { data, loading, allData } = useGetUserServices(slug)

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setServicesData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);

    return (
        <section className='bg-[#FCFCFC] mt-8 flex flex-col space-y-3 rounded-[10px] w-full  p-[20px]'>
            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Services</h1>
                <IconShowcaseBox text='View All' textColor='#FCFCFC' color='#3EB87F' textCenter noBorder />
            </div>

            {/* the services */}
            <div className='max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4' >

                {
                    servicesData?.map((service: Service) => (
                        <ServicesCard   key={service?.id} banner={service?.attributes?.Gallery} title={service?.attributes?.name} description={service.attributes.description} location={service.attributes.location} price={service.attributes.price} noArrow />
                    ))
                }

            </div >

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }

            {/* the services */}
            {/* <div className='grid xl:grid-cols-3 lg:grid-cols-2 max-lg:flex max-lg:flex-wrap max-lg:justify-center'>
                <ServicesCard featuredClassName />
                <ServicesCard featuredClassName />
                <ServicesCard featuredClassName />
            </div> */}
        </section>
    )
}

export default AgentServices