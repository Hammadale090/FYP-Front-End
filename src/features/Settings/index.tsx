"use client";
import { Divider } from '@mantine/core'
import React, { useContext } from 'react'
import UserDetails from './SettingsPageComponents/UserDetails'
import PasswordChange from './SettingsPageComponents/PasswordChange'
import SubScriptionStatus from './SettingsPageComponents/SubScriptionStatus'
import ProfilePictureSetting from './SettingsPageComponents/ProfilePictureSetting'
import ReferAColleague from './SettingsPageComponents/ReferAColleague'
import { AuthContext } from '@/context/AuthContext';

type Props = {}

const Settings = (props: Props) => {
    const { userRole, profileId } = useContext(AuthContext)
    return (
        <section>
            <Divider className='hidden md:flex' my="sm" />

            <div className='max-w-[1000px] mx-auto my-10 flex flex-col space-y-8'>
                <h1 className=' text-[#34495D] px-4 md:text-[#222529]  text-[32px] md:text-[24px] font-medium md:font-normal leading-[20px] md:leading-[30px] md:text-center'>Profile settings</h1>
                {/* update profile picture */}
                <ProfilePictureSetting />
                {/* update user details */}
                <UserDetails />
                {/* change password */}
                <h1 className='text-[#222529] text-[24px] font-normal leading-[30px] text-center'>Change Password</h1>
                <PasswordChange />
                <h1 className='text-[#222529] text-[24px] font-normal leading-[30px] text-center'>Subscription Status</h1>
                {/* subscription statys */}
                <SubScriptionStatus />
                <h1 className='text-[11px] font-medium leading-[18px] tracking-[0.5px] uppercase text-center text-[#222529] mt-9'>You will be asked to log in again with your new Subscription after you save your changes.</h1>
                {/* refer a colleague */}
                {
                    (profileId && userRole !== "user") && (
                        <div className='px-4'>
                            <ReferAColleague />
                        </div>
                    )
                }


            </div>
        </section>
    )
}

export default Settings