"use client";
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React from 'react'
import AgentTestimonial from '../shared/AgentTestimonial'
import { useGetReviews } from '@/hooks/useGetReviews';
import { BiLoaderAlt } from 'react-icons/bi';

type Props = {
    slug: string | string[]
}

const AgentTestimonials = ({ slug }: Props) => {
    const { data, loading } = useGetReviews(slug)

    const formatDate = (dateString: any) => {
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    const returnRating = (rating: string) => {
        if (rating === "Star 1 - Poor") {
            return "1"
        } else if (rating === "Star 2 - Fair") {
            return "2"
        } else if (rating === "Star 3 - Average") {
            return "3"
        } else if (rating === "Star 4 - Good") {
            return "4"
        } else if (rating === "Star 5 - Excellent") {
            return "5"
        }
    }

    return (
        <section className='bg-[#FCFCFC] mt-8 flex flex-col space-y-3 rounded-[10px] w-full  p-[20px]'>
            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#b1b3c4] text-[20px] font-bold leading-normal'>Testimonials</h1>
                <IconShowcaseBox text='View All' textColor='#FCFCFC' color='#3EB87F' textCenter noBorder />
            </div>

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }

            {/* the testimonials */}
            <div className='grid xl:grid-cols-3 lg:grid-cols-2 max-lg:flex max-lg:flex-wrap max-lg:justify-center'>
                {
                    data?.map((testimonial: any) => (
                        <AgentTestimonial key={testimonial?.id} rating={returnRating(testimonial?.attributes?.rating)} profilepic={testimonial?.attributes?.client_profile?.data?.attributes?.profile_pic?.data?.attributes?.url}  firstname={testimonial?.attributes?.client_profile?.data?.attributes?.first_name} user={testimonial?.attributes?.client_profile?.data?.attributes?.user?.data?.attributes?.username} lastname={testimonial?.attributes?.client_profile?.data?.attributes?.last_name} description={testimonial?.attributes?.review} date={formatDate(testimonial?.attributes?.publishedAt)} />
                    ))
                }
            </div>
        </section>
    )
}

export default AgentTestimonials