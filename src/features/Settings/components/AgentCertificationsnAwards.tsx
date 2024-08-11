"use client";
import { Cert } from '@/context/types';
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import AgentCertificationCard from '@/features/ProfilePages/MortgageBrokerView/shared/AgentCertificationCard'
import { useGetCertifications } from '@/hooks/useGetCertifications';
import { useDisclosure } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import AddCertification from '../shared/AddCertication';
import { useToast } from '@/components/ui/use-toast';
import { AuthContext } from '@/context/AuthContext';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { deleteCetification } from '../functions/functions';

type Props = {}

const AgentCertificationsnAwards = (props: Props) => {
    const { jwt } = useContext(AuthContext)
    const [opened, { open, close }] = useDisclosure(false);
    const [certData, setCertData] = useState([])
    const [certToUpdate, setCertToUpdate] = useState()
    const { data, loading, allData } = useGetCertifications()
    const [isEditCertification, setIsEditCertification] = useState<boolean>(false)

    const { toast } = useToast()

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setCertData(allData?.data);
            }
        };
        loadData();

    }, [allData, data]);

    const deleteCertifications = async (id: string | number | undefined) => {
        if (!id) return
        try {
            const res = await deleteCetification(id, jwt);

            if (res?.data) {
                // Assuming articlesData is initialized properly or has a type assertion
                const updatedCertData = certData.filter((cert: Cert | undefined) => cert?.id !== id);

                setCertData(updatedCertData);

                toast({
                    description: "Certification deleted successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
            }

            if (res?.error) {
                toast({
                    variant: "destructive",
                    description: res?.error?.message,
                });
            }


        } catch (error) {
            console.error("Error deleting certification:", error);
            toast({
                variant: "destructive",
                description: "Something went wrong",
            });
        }

    };

    const updateCertification = async (id: string | number | undefined) => {

        const cert = certData.find((cert: Cert | undefined) => cert?.id == id)
        setCertToUpdate(cert)
        open()
    }



    return (
        <section className='bg-[#FCFCFC] mt-8 flex flex-col space-y-3 rounded-[10px] w-full  p-[20px]'>

            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Certifications, Awards & Achievements</h1>
                <IconShowcaseBox text='Edit Certification Section' textColor='#FCFCFC' color='#3EB87F' textCenter noBorder onClick={() => setIsEditCertification(!isEditCertification)} />
            </div>

            {/* the certifications card */}
            <div className='max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4'>
                <AgentCertificationCard Add AddOnclick={() => {
                    setCertToUpdate(null);
                    open()
                }} />

                {
                    certData?.map((cert: Cert) => (
                        <AgentCertificationCard
                            key={cert?.id}
                            id={cert?.id}
                            name={cert?.attributes?.name}
                            issue_date={cert?.attributes?.issue_date}
                            issued_by={cert?.attributes?.issued_by}
                            isEditCertification={isEditCertification}
                            deleteCertification={deleteCertifications}
                            updateCertification={updateCertification}
                        />
                    ))
                }


            </div>

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }

            {/* modal to add the certification */}
            <AddCertification opened={opened} close={close} certToUpdate={certToUpdate} />

        </section>
    )
}

export default AgentCertificationsnAwards