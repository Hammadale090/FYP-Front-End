'use client'
import { Input } from '@/components/ui/input'
import React, { useContext, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import { fetcher } from '@/lib/fetchers'
import { toast } from '@/components/ui/use-toast'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { AuthContext } from '@/context/AuthContext'

type Props = {}

const AgentReview = (props: Props) => {
    const { jwt } = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '',
        title: '',
        rating: '',
        videoUrl: '',
        review: '',
    });

    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false)

    const handleChange = (e: any) => {
        setError('');
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError('');
        setLoader(true);

        try {
            const responseData = await fetcher(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({ data: form }),
                    method: 'POST',
                }
            );

            if (responseData?.data) {
                setLoader(false)
                toast({
                    description: "Review added successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
                setForm({
                    email: '',
                    title: '',
                    rating: '',
                    videoUrl: '',
                    review: '',
                });
            }

            if (responseData?.error) {
                toast({
                    variant: "destructive",
                    description: responseData?.error?.message,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong",
            });
            setLoader(false)
        }
    }

    return (
        <section className='bg-[#FCFCFC] mt-8 flex flex-col space-y-3 rounded-[10px] w-full  p-[20px]'>

            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Write a Review</h1>
            </div>


            <form className='w-full my-3' onSubmit={(e) => handleSubmit(e)}>
                {/* the email */}
                <div className='w-full flex flex-col space-y-2'>
                    <h1 className='text-[16px] text-[#0B0C0E] font-semibold leading-[26px]'>Email</h1>
                    <Input required={true} type='email' placeholder='you@emample.com' name='email' value={form.email} onChange={handleChange} />
                </div>

                {/* the title and rating */}
                <div className='flex flex-col md:flex-row md:space-x-10 my-5'>
                    <div className='w-full md:w-[50%] flex flex-col space-y-2'>
                        <h1 className='text-[16px] text-[#0B0C0E] font-semibold leading-[26px]'>Title</h1>
                        <Input required placeholder='Enter a title' name='title' value={form.title} onChange={handleChange} />
                    </div>

                    <div className='w-full md:w-[50%] flex flex-col space-y-2'>
                        <h1 className='text-[16px] text-[#0B0C0E] font-semibold leading-[26px]'>Rating</h1>
                        <Select
                            onValueChange={(e) => {
                                setForm({
                                    ...form,
                                    rating: e
                                });
                            }}
                        >
                            <SelectTrigger className=" bg-white text-[14px] w-full text-[#1A1A1A] leading-[18px] font-normal">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value={`Star 1 - Poor`}>{"1 Star - Poor"}</SelectItem>
                                <SelectItem value={`Star 2 - Fair`}>{"2 Star - Fair"}</SelectItem>
                                <SelectItem value={`Star 3  - Average`}>{"3 Star - Average"}</SelectItem>
                                <SelectItem value={`Star 4 - Good`}>{"4 Star - Good"}</SelectItem>
                                <SelectItem value={`Star 5 - Excellent`}>{"5 Star - Excellent"}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/*Upload Video(Optional)*/}
                <div className='w-full flex flex-col space-y-2 my-2'>
                    <h1 className='text-[16px] text-[#0B0C0E] font-semibold leading-[26px]'>Upload Video (Optional)</h1>
                    <Input placeholder='Enter URL or Upload from Device' name='videoUrl' value={form.videoUrl} onChange={handleChange} />
                </div>

                {/*Upload Video(Optional)*/}
                <div className='w-full flex flex-col space-y-2 my-4'>
                    <h1 className='text-[16px] text-[#0B0C0E] font-semibold leading-[26px]'>Review</h1>
                    <Textarea minLength={7} className='' placeholder='write a review' name='review' value={form.review} onChange={handleChange} />
                </div>

                {/* the submit review */}
                <button type='submit'>
                    <IconShowcaseBox width='w-full md:w-[254.2px]' text='Submit Review' px='28px' py='12px' textCenter textCN='text-white text-[16px] font-semibold leading-[26px]' color='#3EB87F' rounded='4px' />
                </button>
            </form>

        </section>
    )
}

export default AgentReview