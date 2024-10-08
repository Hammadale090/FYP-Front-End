"use client";
import { Input } from '@/components/ui/input'
import { Divider } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { BiLoaderAlt, BiMailSend } from "react-icons/bi";
import { useToast } from '@/components/ui/use-toast'
import React, { useState, useContext } from 'react'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios';
type Props = {}

const Footer = (props: Props) => {
    const router = useRouter();
    const [loader, setLoader] = useState<boolean>(false)
    const { toast } = useToast();
    const { jwt } = useContext(AuthContext)
    const [form, setForm] = useState({
        email: ""
    })


    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // handle to subscribe to the newsletter
    const handleEmailSubscription = async () => {
        setLoader(true)

        const getEmail = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/newsletters?filters[email][$eq]=${form.email}`,

        );

        if (getEmail?.data?.data?.length > 0) {
            toast({
                variant: "destructive",
                description: "Email already subscribed",
            });
            setForm({
                ...form,
                email: ""
            })
            setLoader(false)
        } else {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/newsletters/`,
                {
                    data: {
                        ...form,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response?.data?.data?.id) {
                let email = form.email
                let body = "You have successfully subscribed to our newsletter"
                let subject = "Subscription Success"
                const emailsend = await fetch("/api/email", {
                    method: "POST",
                    body: JSON.stringify({ email, body, subject }),
                })
                toast({
                    description: "Subscribed successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
                setLoader(false);
                setForm({
                    ...form,
                    email: ""
                })
            } else {
                toast({
                    variant: "destructive",
                    description: "Could not subscribe at the moment",
                });
                setLoader(false)
            }
        }



    }
    return (
        <footer className='max-w-[1200px] mx-auto my-20 px-[18px]'>
            <div className='flex max-lg:flex-col max-lg:space-y-2 lg:justify-between lg:items-center'>
                <Image src={"/Dashboard/logo-1.png"} alt='Logo' height={1500} width={1500} className='max-w-[120px] w-full h-full max-h-[100px]' />
                <h1 className='text-[16px] font-normal leading-[26px] text-[#34495D] max-w-[570px]'>Residence Realm is a powerful platform that lets you run a residential or commercial rental business online with no hassle</h1>
            </div>

            <Divider my="sm" />

            <div className='flex max-lg:flex-col max-lg:space-y-4  lg:justify-between'>
                {/* Explore */}
                <div className='flex flex-col'>
                    <h1 className='mb-7 text-ravinna text-[24px] leading-[34px] font-normal'>Explore</h1>
                    <h1 onClick={() => {
                        router.push("/dashboard")
                    }} className='text-ravinna text-[16px] font-normal leading-[40px] cursor-pointer '>Multi Family Home</h1>
                    <h1 onClick={() => {
                        router.push("/dashboard")
                    }} className='text-ravinna text-[16px] font-normal leading-[40px] cursor-pointer'>Apartment</h1>
                    <h1 onClick={() => {
                        router.push("/dashboard")
                    }} className='text-ravinna text-[16px] font-normal leading-[40px] cursor-pointer'>House</h1>
                    <h1 onClick={() => {
                        router.push("/dashboard")
                    }} className='text-ravinna text-[16px] font-normal leading-[40px] cursor-pointer'>Condo</h1>
                    <h1 onClick={() => {
                        router.push("/dashboard")
                    }} className='text-ravinna text-[16px] font-normal leading-[40px] cursor-pointer'>Studio</h1>
                    <h1 onClick={() => {
                        router.push("/dashboard")
                    }} className='text-ravinna text-[16px] font-normal leading-[40px] cursor-pointer'>Offices</h1>
                </div>

                {/* Company */}
                <div className='flex flex-col'>
                    <h1 className='mb-7 text-ravinna text-[24px] leading-[34px] font-normal'>Company</h1>
                    <h1 onClick={() => {
                        router.push("/blog")
                    }} className='text-ravinna text-[16px] font-normal leading-[40px] cursor-pointer'>Blog and Press</h1>
                    <h1 onClick={() => {
                        router.push("/active-listings")
                    }} className='text-ravinna text-[16px] font-normal leading-[40px] cursor-pointer'>Listings</h1>
                </div>

                {/* Contact Us */}
                <div className='flex flex-col'>
                    <h1 className='mb-7 text-ravinna text-[24px] leading-[34px] font-normal'>Contact Us</h1>
                    <div className='flex space-x-4 items-center'>
                        <Image src={"/Landing/location.svg"} className='w-[20px] h-[20px]' alt='location svg' height={500} width={500} />
                        <h1 className='text-ravinna text-[16px] font-normal leading-[40px]'>Jhang Road Faislabad 38000, Punjab</h1>
                    </div>
                    <div className='flex space-x-4 items-center'>
                        <Image src={"/Landing/Call.svg"} className='w-[20px] h-[20px]' alt='location svg' height={500} width={500} />
                        <h1 className='text-ravinna text-[16px] font-normal leading-[40px]'>+92 302 668 9292</h1>
                    </div>
                    <div className='flex space-x-4 items-center'>
                        <Image src={"/Landing/Phone.svg"} className='w-[20px] h-[20px]' alt='location svg' height={500} width={500} />
                        <h1 className='text-ravinna text-[16px] font-normal leading-[40px]'>+0 000 000 000</h1>
                    </div>
                    <div className='flex space-x-4 items-center'>
                        <Image src={"/Landing/Mail.svg"} className='w-[20px] h-[20px]' alt='location svg' height={500} width={500} />
                        <h1 className='text-ravinna text-[16px] font-normal leading-[40px]'>chief.outlook@email.com</h1>
                    </div>
                </div>

                {/* Subscribe to my NewsLetter */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleEmailSubscription()
                }} className='flex flex-col space-y-5 max-w-[300px]'>
                    <h1 className=' text-ravinna text-[24px] leading-[34px] font-normal'>Subscribe to my newsletter</h1>
                    <h1 className='text-ravinna text-[16px] font-normal leading-[26px]'>Choose from different template and lay them out.</h1>
                    <Input required type="email" onChange={handleChange} name="email" value={form.email} placeholder='Enter your email...' className="text-[16px] rounded-[4px] h-[50px] border border-[#34495D]" />
                    <button disabled={loader} type="submit" className='px-[36px] flex justify-center py-[12px] text-center rounded-[4px] w-fit text-white bg-ravinnabg text-[16px] font-semibold leading-[26px] '>
                        {
                            loader ? (
                                <BiLoaderAlt className='text-center animate-spin' />
                            ) : "Subscribe"
                        }
                    </button>
                </form>

            </div>


            <Divider my="sm" />
            <div className='hidden md:flex max-lg:flex-col-reverse lg:justify-between items-center my-5'>
                <div className='flex max-lg:flex-col-reverse  lg:space-x-5'>
                    <h1 className='text-[16px] font-normal leading-[26px] text-ravinna'>©2024 Nesti</h1>
                    <h1 className='text-[16px] font-normal leading-[26px] text-ravinna'>Privacy Terms</h1>
                </div>

                <div className='flex max-lg:flex-col max-lg:space-y-3 lg:space-x-5'>
                    <Image src={"/Landing/Apple.svg"} className='max-w-[114px] h-full object-cover' alt='apple button' width={500} height={500} />
                    <Image src={"/Landing/Google.svg"} className='max-w-[114px] h-full object-cover' alt='Google button' width={500} height={500} />
                </div>

                <div className='hidden md:flex max-lg:flex-col max-lg:items-center max-lg:space-y-4  lg:space-x-8'>
                    <Image src={"/Landing/Facebook.svg"} className='w-[30px] h-[30px] object-cover' alt='Facebook button' width={500} height={500} />
                    <Image src={"/Landing/Pinterest.svg"} className='w-[30px] h-[30px] object-cover' alt='Pinterest button' width={500} height={500} />
                    <Image src={"/Landing/Twitter.svg"} className='w-[30px] h-[30px] object-cover' alt='Twitter button' width={500} height={500} />
                    <Image src={"/Landing/Linkedin.svg"} className='w-[30px] h-[30px] object-cover' alt='Linkedin button' width={500} height={500} />
                    <Image src={"/Landing/Instagram.svg"} className='w-[30px] h-[30px] object-cover' alt='Instagram button' width={500} height={500} />
                </div>
            </div>
        </footer>
    )
}

export default Footer