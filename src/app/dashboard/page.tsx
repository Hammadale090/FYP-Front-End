
"use client";
import { AuthContext } from '@/context/AuthContext';
import ProfessionalDashboard from '@/features/Dashboard/ProfessionalDashboard'
import UserDashboard from '@/features/Dashboard/UserDashboard'
import { Loader } from '@mantine/core';
import React, { useContext } from 'react'

type Props = {}

const Dashboard = (props: Props) => {
    const { profileId, profilepic, userRole, loading } = useContext(AuthContext)

    return (
        <div className=' px-2'>

            {/* show the dahboard in order of user role */}
            {
                (profileId && !loading) && (
                    <>    {
                        userRole === "user" ? (
                            <section>
                                {/* the user dashboard */}
                                <UserDashboard />
                            </section>
                        ) : (
                            <section>
                                {/* the professional dashboard */}
                                <ProfessionalDashboard />
                            </section>
                        )
                    }
                    </>
                )
            }

            {/* the loader  */}


            {
                (loading && !profileId) && (
                    <div className='flex-1 w-full h-[80vh] flex flex-col justify-center items-center'>
                        <Loader color="#3eb87f" size={"lg"} />
                    </div>
                )
            }


        </div>
    )
}

export default Dashboard