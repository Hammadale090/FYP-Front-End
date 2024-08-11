'use client'
import { Portfolio } from '@/context/types'
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import FeedPropertyCard from '@/features/Feed/components/FeedPropertyCard'
import { useGetPortfolios } from '@/hooks/useGetPortfolios'
import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

type Props = {
    slug: string | string[]
}

const AgentPortfolio = (props: Props) => {
    const { slug } = props;
    const [portfolioData, setPortfolioData] = useState([])
    const { data, loading, allData } = useGetPortfolios(slug)

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setPortfolioData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);

    return (
        <section className='bg-[#FCFCFC] mt-8 flex flex-col space-y-3 rounded-[10px] w-full  p-[20px]'>
            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Portfolio</h1>
                <IconShowcaseBox text='View All' textColor='#FCFCFC' color='#3EB87F' textCenter noBorder />
            </div>

            {/* the portfolios */}
            <div className='max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4' >

                {
                    portfolioData?.map((portfolio: Portfolio) => (
                        <FeedPropertyCard id={portfolio?.id} banner={portfolio?.attributes?.Gallery} key={portfolio?.id} title={portfolio?.attributes?.name} description={portfolio.attributes.description} location={portfolio.attributes.location} price={portfolio.attributes.price} currency={portfolio.attributes.currency} featuredClassName />
                    ))
                }

            </div >

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }

        </section>
    )
}

export default AgentPortfolio