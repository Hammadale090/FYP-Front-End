"use client";
import { Service } from '@/context/types';
import FeedPropertyCard from '@/features/Feed/components/FeedPropertyCard'
import { useGetUserServices } from '@/hooks/useGetUserServices';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import AddService from '../shared/AddService';

type Props = {}

const AgentProfServices = (props: Props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [servicesData, setServicesData] = useState([])
    const { data, loading, allData } = useGetUserServices()

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setServicesData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);

    return (
        <section className='bg-[#FCFCFC] flex flex-col space-y-3 mt-10 rounded-[10px] w-full  p-[20px]'>

            {/* the header */}
            <div>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Services</h1>
            </div>

            {/* the services */}
            <div className='max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4' >
                <FeedPropertyCard featuredClassName Add Addtext='Add Service' AddOnclick={open} />
                {
                    servicesData?.map((service: Service) => (
                        <FeedPropertyCard bannerTrue key={service?.id} id={service?.id} banner={service?.attributes?.Gallery} title={service?.attributes?.name} description={service.attributes.description} location={service.attributes.location} price={service.attributes.price} currency={service.attributes.currency} featuredClassName disabled={true} />
                    ))
                }
            </div >

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }

            <AddService opened={opened} close={close} />

        </section>
    )
}

export default AgentProfServices