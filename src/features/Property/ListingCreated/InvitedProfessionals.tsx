import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox';
import PreferenceSugestionButton from '@/features/PreferenceChatbot/components/PreferenceSugestionButton';
import { Avatar, Modal } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    invites: any;
    opened: boolean;
    close: () => void;
}

const InvitedProfessionals = ({ invites, opened, close }: Props) => {
    const router = useRouter();


    const handleRedirect = (invite: any) => {
        let role = invite?.attributes?.client_profile?.data?.attributes?.role

        if (role === "broker") {
            router.push(`/mortgage-broker/${invite?.attributes?.client_profile?.data?.attributes?.user?.data?.id}`)
        } else if (role === "realtor") {
            router.push(`/realtor/${invite?.attributes?.client_profile?.data?.attributes?.user?.data?.id}`)
        } else {
            router.push(`/realestate-lawyer/${invite?.attributes?.client_profile?.data?.attributes?.user?.data?.id}`)
        }
    }

    return (
        <Modal opened={opened} size={"55rem"} onClose={() => {
            close()
        }} title={`Other Professionals`} >
            {/* <PreferenceSugestionButton onClick={handleDownload} text='Download Asset' active /> */}
            {
                invites?.map((invite: any) => (
                    <div key={invite?.id} className='flex space-x-2 items-center justify-between'>
                        {/* tghe profile image of the professional if there are any */}
                        <div className='flex space-x-3 items-center'>
                            <Avatar size={'xl'} src={invite?.attributes?.professional_photo?.data?.attributes?.url} alt="Profile Image" />
                            {/* the name of them professinal */}
                            <div className='flex flex-col'>
                                <h1>{invite?.attributes?.full_name}</h1>

                                {/* the role */}
                                <h1 className='text-sm'>{invite?.attributes?.client_profile?.data?.attributes?.role}</h1>
                            </div>
                        </div>



                        {/* button saying view professional */}
                        <PreferenceSugestionButton onClick={() => { handleRedirect(invite) }} text='View' active />
                    </div>
                ))
            }

        </Modal>

    )
}

export default InvitedProfessionals