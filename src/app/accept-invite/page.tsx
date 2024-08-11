"use client";
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthContext } from '@/context/AuthContext';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox';
import axios from 'axios';
import { BiLoaderAlt } from 'react-icons/bi';
import { useToast } from "@/components/ui/use-toast";
import Image from 'next/image';
import Navbar from '@/features/DashboardLayout/components/Navbar';
import { Avatar } from '@mantine/core';

type Props = {}

const AcceptInvite = (props: Props) => {
    const { status } = useSession();
    const { profileId, loading, jwt, professionalId } = useContext(AuthContext)
    const [referData, setReferData] = useState<any>({})
    const [accepted, setAccepted] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const referral_code = searchParams.get("referral_code");
    const property = searchParams.get("property");


    useEffect(() => {
        const getReferrer = async () => {
            try {
                setLoader(true)
                const refId = await axios.get(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/listing-invites?filters[$and][0][listing][id][$eq]=${property}&filters[$and][1][referrer_code][$eq]=${referral_code}&populate[0]=invited_professional.professional_photo&populate[1]=listing.coverPhoto&populate[2]=listing_owner.professional_photo`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                setLoader(false)

                if (refId?.data?.data) {
                    setReferData(refId?.data?.data[0])
                }
            } catch (error) {
                setLoader(false)
                console.error("An error occured", error)
            }
        }

        if (referral_code && property) {
            getReferrer()
        }

    }, [jwt, property, referral_code])


    const handleAcceptInvite = async () => {
        if (referral_code && property) {
            const refId = await axios.get(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/listing-invites?filters[$and][0][listing][id][$eq]=${property}&filters[$and][1][referrer_code][$eq]=${referral_code}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            if (refId?.data?.data) {
                let proper = referData?.attributes?.invited_professional?.data?.id
                const apiData = refId?.data?.data?.[0];

                if (apiData.attributes?.status === "accepted") {
                    toast({
                        description: "This referral has already been accepted!",
                        action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
                    });
                    return;
                }


                const data = {
                    data: {
                        invites: {
                            connect: [proper],
                        },
                    },
                };



                const updateListing = await axios.put(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings/${property}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                const updateRefferals = await axios.put(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/listing-invites/${apiData?.id}`,
                    {
                        data: {
                            status: "accepted",
                        },
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                toast({
                    description: "This Invitation has been accepted!",
                    action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
                });
                setAccepted(true);


            }
        }
    }


    console.log("this is the referData", referData)



    if (loading || loader) {
        return (
            <div className='my-5'>
                <Navbar />
                <div className='h-screen flex flex-col space-y-2 justify-center items-center'>
                    <BiLoaderAlt className='text-ravinnabg h-10 w-10' />

                </div>
            </div>
        )
    }
    else if (!loading && !profileId && status === "unauthenticated" && !loader) {
        return (
            <div className='my-5'>
                <Navbar />
                <div className='h-screen flex flex-col space-y-2 justify-center items-center'>
                    <IoMdClose className='h-10 w-10 text-red-500' />
                    <h1>You are not authorise to access this page, please Sign In below</h1>
                    <IconShowcaseBox onClick={() => { router.push("/log-in") }} text={"Sign In"} color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />

                </div></div>
        )
    } else if (
        professionalId && (referData?.attributes?.invited_professional?.data?.id !== professionalId) && !loading && !loader && status === "authenticated"
    ) {

        return (
            <div className='my-5'>
                <Navbar />
                <div className='h-screen flex flex-col space-y-2 justify-center items-center'>
                    <IoMdClose className='h-10 w-10 text-red-500' />
                    <h1>You are not authorise to access this page</h1>
                    <IconShowcaseBox onClick={() => { router.push("/dashboard") }} text={"Dashboard"} color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />

                </div></div>
        )

    } else if (status === "authenticated" && !loading && !loader && (referData?.attributes?.invited_professional?.data?.id === professionalId)) {
        return (
            <div className='my-5'>
                <Navbar />
                <div className='h-screen flex flex-col space-y-2 mt-20 items-center px-5'>
                    {/* the image of the invitee and the invited */}
                    <div className='flex space-x-2 items-center'>
                        <Avatar.Group>
                            <Avatar size={'xl'} src={referData?.attributes?.invited_professional?.data?.attributes?.professional_photo?.data?.attributes?.url} alt="Profile Image" />
                            <Avatar size={'xl'} src={referData?.attributes?.listing_owner?.data?.attributes?.professional_photo?.data?.attributes?.url} alt="Profile image" />
                        </Avatar.Group>
                    </div>

                    <Image width={700} height={700} alt="property image" className='max-h-[500px] max-sm:w-full sm:max-w-[500px] object-cover rounded-xl' src={referData?.attributes?.listing?.data?.attributes?.coverPhoto?.data?.attributes?.url} />
                    <h1>Accept Invitation to this property : {referData?.attributes?.listing?.data?.attributes?.name}</h1>
                    <h1>Invited by : {referData?.attributes?.listing_owner?.data?.attributes?.full_name}</h1>
                    {
                        accepted || referData?.attributes?.status === "accepted" ? (
                            <IconShowcaseBox text={"Invitation Accepted"} color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />
                        ) : (
                            <IconShowcaseBox onClick={handleAcceptInvite} text={"Accept"} color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />
                        )
                    }


                </div>

            </div>
        )
    }

}

export default AcceptInvite