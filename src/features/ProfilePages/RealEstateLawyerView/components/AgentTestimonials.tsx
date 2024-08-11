import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React from 'react'
import AgentTestimonial from '../shared/AgentTestimonial'

type Props = {}

const AgentTestimonials = (props: Props) => {
    return (
        <section className='bg-[#FCFCFC] mt-8 flex flex-col space-y-3 rounded-[10px] w-full  p-[20px]'>
            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Testimonials</h1>
                <IconShowcaseBox text='View All' textColor='#FCFCFC' color='#3EB87F' textCenter noBorder />
            </div>

            {/* the testimonials */}
            <div className='grid xl:grid-cols-3 lg:grid-cols-2 max-lg:flex max-lg:flex-wrap max-lg:justify-center'>
                <AgentTestimonial />
                <AgentTestimonial />
                <AgentTestimonial />
            </div>
        </section>
    )
}

export default AgentTestimonials