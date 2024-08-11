import { ListingContext } from '@/context/ListingContext'
import KeywordsInput from '@/features/Settings/shared/KeywordsInput'
import Image from 'next/image'
import React, { useContext, useState } from 'react'

type Props = {}

const InviteProfessional = (props: Props) => {
    const [allReferrals, setAllReferrals] = useState([])
    const { KeywordsPreferences, setKeywordsPreferences } = useContext<any>(ListingContext)
    const [emailLoading, setEmailLoading] = useState<boolean>(false)

    return (
        <div className='w-full flex flex-col space-y-3 mb-7'>

            <div>
                <h1 className='text-[#34495D] text-[14px] font-normal leading-[22px]'>Invite via email</h1>
                <KeywordsInput listingInvite refer placeholder='Enter Emails' KeywordsPreferences={KeywordsPreferences} setKeywordsPreferences={setKeywordsPreferences} loading={emailLoading} setLoading={setEmailLoading} />
            </div>
            <div >

                <div className='flex justify-between items-center'>
                    <h1 className='text-black text-[16px] font-bold '>Invited Professionals</h1>

                    {/* <div className='flex items-center space-x-2 cursor-pointer' >
                        <Image src={"/link.svg"} className='w-[18px] h-[18px] cursor-pointer' alt='link' width={500} height={500} />
                        <h1 className='text-black text-[16px] font-bold'>Copy invitation link</h1>
                    </div> */}
                </div>

                {/* the email, invited or joined */}
                {
                    KeywordsPreferences &&
                    KeywordsPreferences
                        .map((ref, i) => {
                            return (
                                <div className='border-b flex border-[#c4c3cb] justify-between py-4' key={i}>
                                    <h1 className='text-[#534F6B] text-[14px] font-normal '>{ref}</h1>
                                    <div className='flex space-x-2 items-center '>
                                        <h1 className='text-[14px] font-bold text-[#34495D]'>{"pending"}</h1>
                                     
                                    </div>
                                </div>
                            )
                        })
                }


                {/* joined
                  <div className='border-b flex border-[#c4c3cb] justify-between py-4'>
                      <h1 className='text-[#534F6B] text-[14px] font-normal '>johndoe@gmail.com</h1>

                      <div className='flex space-x-2 items-center '>
                          <h1 className='text-[14px] font-bold text-[#34495D]'>Joined</h1>
                          <Image src={"/Emaildropdown.svg"} alt='dropdown' width={500} height={500} className='w-[12px] h-[6px]' />
                      </div>
                  </div> */}


            </div>

        </div>
    )
}

export default InviteProfessional