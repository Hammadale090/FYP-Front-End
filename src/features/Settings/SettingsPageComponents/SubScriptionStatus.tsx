'use client'
import React, { useContext, useEffect, useState } from 'react'
import Plan from '../components/Plan'
import { getPlans } from '../functions'
import { AuthContext } from '@/context/AuthContext'

type Props = {}

const SubScriptionStatus = (props: Props) => {

    const { profile } = useContext(AuthContext)
    const [plans, setPlans] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { jwt } = useContext(AuthContext)

    const fetchPlans = async () => {
        setIsLoading(true);
        try {
            const plans = await getPlans(jwt)
            setPlans(plans?.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (jwt) {
            fetchPlans();
        }
    }, [jwt]);


    return (
        <div className='flex justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    plans.length > 0 && plans?.map((item: any, index: any) => {
                        const plan = item?.attributes;
                        return (
                            <Plan id={item?.id} header={plan?.title} price={plan?.price} benifits={plan?.benefits} key={index} white={parseInt(profile?.attributes?.planId) != item?.id} />
                        )
                    })
                }
            </div>
        </div>

    )
}

export default SubScriptionStatus