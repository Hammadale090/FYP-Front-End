
'use client'
import React, { useContext, useEffect, useState } from 'react'
import KeywordsInput from '../shared/KeywordsInput'
import Image from 'next/image'
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { AuthContext } from '@/context/AuthContext'
import { uploadRefferelCodeToDb } from '../functions'
import copy from 'clipboard-copy';
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BiLoaderAlt } from 'react-icons/bi';


type Props = {}

const ReferAColleague = (props: Props) => {

    const { jwt, profileId } = useContext(AuthContext)
    const [opened, { open, close }] = useDisclosure(false);
    const [emailSuccess, setEmailSuccess] = useState<boolean>(false)
    const [emailLoading, setEmailLoading] = useState<boolean>(false)
    const [emailFailure, setEmailFailure] = useState<boolean>(false)
    const [KeywordsPreferences, setKeywordsPreferences] = useState<any[]>([])
    const [allReferrals, setAllReferrals] = useState([])
    const [copied, setCopied] = useState(false);
    const [email, setEmail] = useState("")
    const [copyOpen, setCopyOpen] = useState<boolean>(false)
    const { toast } = useToast()

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setEmail(value)
    }

    const OpenCopy = () => {
        setCopyOpen(true)
    }

    const CloseCopy = () => {
        setCopyOpen(false)
    }

    useEffect(() => {

        const fetchAllRefferels = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/referrals?filters[referrer_id][$eq]=${profileId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to fetch referrals');
            }

            // Parse the response as JSON
            const allReferralsEmails = await response.json();

            if (allReferralsEmails?.data?.length > 0) {
                setAllReferrals(allReferralsEmails?.data)
            }
        }

        if (jwt && profileId) {
            fetchAllRefferels()
        }
    }, [profileId])


    const handleSendEmail = async () => {
        if (!KeywordsPreferences?.length) {
            toast({
                variant: "destructive",
                description: "Enter valid email",
            });
            return;
        }

        setEmailLoading(true);

        try {
            const subject = "Join Ravinna Property Management App Today!";

            const sendEmail = async (email: any) => {
                const random6DigitNumber = Math.floor(Math.random() * 900000) + 100000;
                const body = `
                    <p>Ravinna Property Management helps you manage properties effortlessly. It's easy to use and saves you time.</p>
                    <p>To get started, click on the link below:</p>
                    <p><a href="${process.env.NEXT_PUBLIC_WEBSITE_URL}/sign-up?referral_code=${random6DigitNumber}&referrer_id=${profileId}">${process.env.NEXT_PUBLIC_WEBSITE_URL}/sign-up?referral_code=${random6DigitNumber}&referrer_id=${profileId}</a></p>
                    <p>Join now and enjoy:</p>
                    <ul>
                        <li>Easy property management</li>
                        <li>Time-saving features</li>
                    </ul>
                    <p>See you there!</p>
                    <p>Best,<br/>The Ravinna Team</p>
                `;

                const res = await fetch("/api/email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, subject, body }),
                });

                if (!res.ok) {
                    throw new Error("Failed to send email");
                }

                const data = {
                    referrer_id: profileId.toString(),
                    referral_code: random6DigitNumber.toString(),
                    referee_email: email,
                    status: 'Pending',
                };

                const referralResponse = await uploadRefferelCodeToDb(data, jwt);

                if (referralResponse?.data?.data) {
                    return referralResponse.data.data;
                } else {
                    throw new Error("Failed to save referral data");
                }
            };

            const results = await Promise.all(KeywordsPreferences.map(sendEmail));

            // Update state with new referrals
            setAllReferrals(prevReferrals => [...prevReferrals, ...results]);
            setEmailLoading(false);
            setEmailFailure(false);
            setEmailSuccess(true);
            setKeywordsPreferences([]);
        } catch (error) {
            console.error("Error sending emails or saving referral data:", error);
            setEmailLoading(false);
            setEmailSuccess(false);
            setEmailFailure(true);
        }
    };


    const generateReferralLink = async () => {

        const random6DigitNumber = Math.floor(Math.random() * 900000) + 100000;

        const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sign-up?referral_code=${random6DigitNumber}&referrer_id=${profileId}`

        // Copy the URL to the clipboard
        copy(url);

        // Set copied state to true to provide feedback to the user
        setCopied(true);


        const data = {
            referrer_id: profileId.toString(),
            referral_code: random6DigitNumber.toString(),
            referee_email: email,
            status: 'Pending',
        };

        try {
            setEmailLoading(true);
            const referralResponse = await uploadRefferelCodeToDb(data, jwt);
            if (referralResponse?.data?.data) {
                setEmailLoading(false)
                CloseCopy()
                toast({
                    description: "Invitation link has been generated/copied",
                });
            } else {
                setEmailLoading(false)
                CloseCopy()
                toast({
                    variant: "destructive",
                    description: "Could not generate invitation link now",
                });
            }

        } catch (error) {
            setEmailLoading(false)
            CloseCopy()
            toast({
                description: "Invitation link has been generated/copied",
            });
        }



        // Reset copied state after a short delay
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }



    return (
        <div className='w-full border border-[#34495D] rounded-[8px] gap-[81px] px-[23px] py-[20px]'>
            <div className='flex max-md:flex-col md:justify-between '>


                <div className='md:w-[30%]'>
                    <h1 className='text-[40px] leading-normal font-medium text-[#222529] '>
                        Refer a Colleague
                    </h1>

                    <h1 className='text-[#34495D] text-[20px] font-normal leading-tight max-md:text-center'>
                        Want to know more about our referral system and its benefits?  <br />

                        <span onClick={() => {
                            open()
                        }} className='font-bold cursor-pointer text-[#3EB87F] underline '>Click Here </span>

                    </h1>
                </div>

                <div className='md:w-[65%] flex flex-col space-y-3'>

                    <div>
                        <h1 className='text-[#34495D] text-[14px] font-normal leading-[22px]'>Refer via email</h1>
                        <KeywordsInput refer placeholder='Enter Emails' KeywordsPreferences={KeywordsPreferences} setKeywordsPreferences={setKeywordsPreferences} onclick={handleSendEmail} loading={emailLoading} />
                    </div>

                    <div >
                        <div className='flex justify-between items-center'>
                            <h1 className='text-black text-[16px] font-bold '>Invited Professionals</h1>

                            <div className='flex items-center space-x-2 cursor-pointer' onClick={OpenCopy}>
                                <Image src={"/link.svg"} className='w-[18px] h-[18px] cursor-pointer' alt='link' width={500} height={500} />
                                <h1 className='text-black text-[16px] font-bold'>Copy invitation link</h1>
                            </div>
                        </div>

                        {/* the email, invited or joined */}
                        {
                            allReferrals &&
                            allReferrals
                                // Use Set to filter out duplicate emails
                                .filter((ref, index, self) =>
                                    index === self.findIndex((r) => r.attributes.referee_email === ref.attributes.referee_email)
                                )
                                .map((ref, i) => {
                                    return (
                                        <div className='border-b flex border-[#c4c3cb] justify-between py-4' key={i}>
                                            <h1 className='text-[#534F6B] text-[14px] font-normal '>{ref?.attributes?.referee_email ?? "johndoe@gmail.com"}</h1>
                                            <div className='flex space-x-2 items-center '>
                                                <h1 className='text-[14px] font-bold text-[#34495D]'>{ref?.attributes?.status ?? "Invited"}</h1>
                                                <Image src={"/Emaildropdown.svg"} alt='dropdown' width={500} height={500} className='w-[12px] h-[6px]' />
                                            </div>
                                        </div>
                                    )
                                })
                        }


                        {/* joined
                        <div className='border-b flex border-[#c4c3cb] justify-between py-4'>
                            <h1 className='text-[#534F6B] text-[14px] font-normal '>johndoe@gmail.com</h1>

                            <div className='flex space-x-2 items-center '>
                                <h1 className='text-[14px] font-bold text-[#34495D]'>Joined</h1>
                                <Image src={"/Emaildropdown.svg"} alt='dropdown' width={500} height={500} className='w-[12px] h-[6px]' />
                            </div>
                        </div> */}


                    </div>

                </div>
            </div>

            <Modal opened={copyOpen} onClose={CloseCopy} title="Generate Invitation link">
                <form onSubmit={(e) => { e.preventDefault(); generateReferralLink(); }}>
                    <h1>Enter the person&apos;s email you want to invite</h1>

                    <Input value={email} name='email' onChange={handleChange} required type='email' placeholder='Enter email here' className='my-2' />
                    <Button type='submit' className='my-2 bg-[#3EB87F]'> {emailLoading ? (
                        <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />
                    ) : (
                        "Generate/Copy invitation link"
                    )}</Button>
                </form>

            </Modal>

            {/* the modal for refer a colleague clickhere */}
            <Modal opened={opened} size={"xl"} onClose={close} title="Our Referral system">

            </Modal>
        </div>
    )
}

export default ReferAColleague