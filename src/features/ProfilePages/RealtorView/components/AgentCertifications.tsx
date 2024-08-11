'use client'
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React, { useEffect, useState } from 'react'
import AgentCertificationCard from '../shared/AgentCertificationCard'
import { useGetCertifications } from '@/hooks/useGetCertifications'
import { Cert } from '@/context/types';
import { BiLoaderAlt } from 'react-icons/bi';

type Props = {
    slug?: string | string[];
}

const AgentCertifications = (props: Props) => {

    const { slug } = props;
    const [certData, setCertData] = useState([])
    const { data, loading, allData } = useGetCertifications(slug)

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setCertData(allData?.data);
            }
        };
        loadData();

    }, [allData, data]);

    return (
        <section className='bg-[#FCFCFC] mt-8 flex flex-col space-y-3 rounded-[10px] w-full  p-[20px]'>

            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Certifications, Awards & Achievements</h1>
                <IconShowcaseBox text='View All' textColor='#FCFCFC' color='#3EB87F' textCenter noBorder />
            </div>


            {/* the certifications card */}
            <div className='max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4'>
                {
                    certData?.map((cert: Cert) => (
                        <AgentCertificationCard name={cert?.attributes?.name} issue_date={cert?.attributes?.issue_date} issued_by={cert?.attributes?.issued_by} key={cert?.id} />
                    ))
                }


            </div>

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }

        </section>
    )
}

export default AgentCertifications