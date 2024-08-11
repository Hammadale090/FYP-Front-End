"use client";
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React, { useContext } from 'react'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { updateBannerPic } from '../../functions/functions'
import { useToast } from '@/components/ui/use-toast'
import { AuthContext } from '@/context/AuthContext'
import { ProfSettingsContext } from '@/context/ProfSettingsContext'

type Props = {}

const RealtorSettingsHeader = (props: Props) => {
    const { banner, setBannerLoader, bannerLoader } = useContext<any>(ProfSettingsContext)
    const { jwt, professionalId } = useContext(AuthContext)
    const { toast } = useToast();

    const updateProfile = async () => {        
        if (banner) {
            try {
                const profileUpdate = await updateBannerPic(banner, setBannerLoader, jwt, professionalId)
                toast({
                    description: "profile updated successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: "Something went wrong",
                });
            }


        }
    }

    return (
        <div className='flex flex-col max-md:space-y-2 md:flex-row justify-between'>
            {/* the header */}
            <h1 className='text-[#11142D] text-[25px] font-bold '>Real Estate Profile Page</h1>

            <div className='flex max-md:flex-col md:items-center max-md:space-y-2 md:space-x-4'>
                <IconShowcaseBox text='Generate A.I. Assets' width='w-full md:w-[220px]' textCenter noBorder rounded='4px' color='#3EB87F' py='12px' textCN='text-white text-[14px] font-semibold leading-[24px] tracking-[0.5px]' />
                <IconShowcaseBox loading={bannerLoader} onClick={updateProfile} text='Save Changes' width='w-full md:w-[220px]' textCenter noBorder rounded='4px' color='#3EB87F' py='12px' textCN='text-white text-[14px] font-semibold leading-[24px] tracking-[0.5px]' />
            </div>
        </div>
    )
}

export default RealtorSettingsHeader