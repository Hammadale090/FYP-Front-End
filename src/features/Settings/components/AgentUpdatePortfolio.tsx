"use client";
import FeedPropertyCard from '@/features/Feed/components/FeedPropertyCard'
import React, { useContext, useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox';
import AddPortfolio from '../shared/AddPortfolio';
import { useGetPortfolios } from '@/hooks/useGetPortfolios';
import { Portfolio } from '@/context/types';
import { BiLoaderAlt } from 'react-icons/bi';
import { AuthContext } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { deletePortfolio } from '../functions/functions';

type Props = {}

const AgentUpdatePortfolio = (props: Props) => {
    const { jwt } = useContext(AuthContext)
    const [opened, { open, close }] = useDisclosure(false);
    const [portToUpdate, setPortToUpdate] = useState()
    const [deleteLoader, setDeleteLoader] = useState<boolean>(false)
    const { toast } = useToast()
    const { data, loading, allData } = useGetPortfolios()
    const [portfolioData, setPortfolioData] = useState([])



    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setPortfolioData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);


    const deletePort = async (id: string | number | undefined) => {
        if (!id) return

        setDeleteLoader(true)
        try {
            const res = await deletePortfolio(id, jwt);

            if (res?.data) {

                const updatedPortData = portfolioData.filter((port: Portfolio | undefined) => port?.id !== id);

                setPortfolioData(updatedPortData);

                toast({
                    description: "Portfolio deleted successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
                setDeleteLoader(false)
                close();
            }

            if (res?.error) {
                setDeleteLoader(false)
                toast({
                    variant: "destructive",
                    description: res?.error?.message,
                });
            }


        } catch (error) {
            setDeleteLoader(false)
            console.error("Error deleting portfolio:", error);
            toast({
                variant: "destructive",
                description: "Something went wrong",
            });
        }

    };

    const updatePort = async (id: string | number | undefined) => {

        const port = portfolioData.find((port: Portfolio | undefined) => port?.id == id)
        setPortToUpdate(port)
        open()

    }


    return (
        <section className='bg-[#FCFCFC] flex flex-col space-y-3 mt-10 rounded-[10px] w-full  p-[20px]'>

            {/* the header */}
            <div >
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Update Portfolio</h1>
            </div>

            {/* the portfolios */}
            <div className='max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4' >

                <FeedPropertyCard featuredClassName Add AddOnclick={() => {
                    setPortToUpdate(null);
                    open()
                }} />
                {
                    portfolioData?.map((portfolio: Portfolio) => (
                        <FeedPropertyCard bannerTrue portfolio key={portfolio?.id} updatePort={updatePort} id={portfolio?.id} banner={portfolio?.attributes?.Gallery} title={portfolio?.attributes?.name} description={portfolio.attributes.description} location={portfolio.attributes.location} price={portfolio.attributes.price} currency={portfolio.attributes.currency} featuredClassName disabled={true} />
                    ))
                }

            </div >

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }

            {/* open up modal to add a portfolio to the user */}
            <AddPortfolio deleteLoader={deleteLoader} opened={opened} close={close} portToUpdate={portToUpdate} deletePort={deletePort} />

        </section >
    )
}

export default AgentUpdatePortfolio