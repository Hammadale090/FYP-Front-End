import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import Image from 'next/image'
import React from 'react'
import { MdOutlineEdit } from 'react-icons/md';

type Props = {
    id?: string | number;
    Add?: boolean;
    name?: string;
    issued_by?: string;
    issue_date?: string;
    AddText?: string;
    AddOnclick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    isEditCertification?: boolean | null;
    deleteCertification?: (id: string | number | undefined) => void;
    updateCertification?: (id: string | number | undefined) => void;
}

const AgentCertificationCard = ({ id, Add, AddOnclick, AddText, name, issued_by, issue_date, isEditCertification, deleteCertification, updateCertification }: Props) => {
    return (
        <div className='relative my-2 mx-2 w-full md:w-[338px] h-full'>
            <div className='relative w-full  flex flex-col space-y-5 rounded-[16px] border border-black bg-white p-[20px]'>

                 {/* Edit Section  */}
                 {
                    isEditCertification &&
                    <div className='flex items-center absolute top-[20px] right-4'>
                        <div
                            className="inline-flex p-2 justify-center items-center gap-10 rounded-full bg-white bg-opacity-42 cursor-pointer mr-[16px]"
                            onClick={() => deleteCertification && deleteCertification(id)}
                            >
                            <Image src={"/trash.svg"} width={20} height={20} alt="trash" />
                        </div>
                    </div>
                }

                <div className='flex gap-x-[10px] items-center'>
                    <Image src={"/Broker/Cert.svg"} className='w-[24px] h-[24px]' width={500} height={500} alt='certification badge' />
                    <h1 className='text-ravinna text-[16px] font-medium line-clamp-1'>{name ? name : "Certificate Name"}</h1>
                </div>

                <h1 className='text-black text-[12px] font-medium line-clamp-2 ml-[35px]'>Issued By: {issued_by ? issued_by : "dummy text"}</h1>
                <h1 className='text-black text-[12px] font-medium ml-[35px]'>Issue Date: {issue_date ? issue_date : "10/11/22"}</h1>

                <div className='w-full flex items-center justify-between'>
                    <IconShowcaseBox text='View' width='w-[46%]'  textCN='text-[16px] text-white' textCenter noBorder color='#3EB87F' />
                    <IconShowcaseBox text='Edit' width='w-[46%]'  textCN='text-[16px] text-white' textCenter noBorder color='#3EB87F' onClick={() => updateCertification && updateCertification(id)} />
                </div>

            </div>
            {
                Add && (
                    <div className='absolute top-0 w-full md:w-[338px]  flex-shrink-0 rounded-xl left-0 h-full  bg-gray-400 bg-opacity-5 backdrop-blur-lg'>
                        <div className='flex flex-col w-full h-full justify-center items-center'>
                            <IconShowcaseBox onClick={AddOnclick} text={`${AddText ? AddText : "Add Certification"}`} color='#3EB87F' width='w-fit' textCN='text-[16px] font-semibold leading-[26px] text-white mx-[19px]' px='19px' py='9px' rounded={"4px"} noBorder />
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default AgentCertificationCard