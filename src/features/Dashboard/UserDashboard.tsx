import React from 'react'
import ClientProfileDetails from './components/ClientProfileDetails'
import UserPropertyListings from './components/UserPropertyListings'

type Props = {}

const UserDashboard = (props: Props) => {
    return (
        <section className='my-2'>
            <h1 className='text-[25px] font-bold text-[#11142D]'>Client Profile</h1>


            {/* client profile details */}
            <ClientProfileDetails />

            {/* the user listings */}
            <UserPropertyListings />
        </section>
    )
}

export default UserDashboard