"use client";
import { AuthContext } from '@/context/AuthContext';
import { fetcher } from '@/lib/fetchers';
import axios from 'axios';
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { useToast } from "@/components/ui/use-toast";
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BiLoaderAlt } from 'react-icons/bi';

type Props = {}

const ProfilePictureSetting = (props: Props) => {
    const { profilepic, jwt, profileId, reload, setReload } = useContext(AuthContext);
    const [loader, setLoader] = useState<boolean>(false)
    const { toast } = useToast();
    const [fileSizeError, setFileSizeError] = useState<string>('');
    const [image, setImage] = useState();
    const [imagesrc, setImagesrc] = useState<string>();

    // function to update the profile pic
    const updateProfilePic = async (image: any) => {

        if (image) {

            setLoader(true);
            const body = new FormData();
            body.append("files", image);

            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload/`,
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                if (response) {
                    const data = {
                        profile_pic: response.data[0].id,
                    };
                    const res = await fetcher(
                        `${process.env.NEXT_PUBLIC_STRAPI_URL}/client-profiles/${profileId}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${jwt}`,
                            },
                            body: JSON.stringify({
                                data: data,
                            }),
                            method: "PUT",
                        }
                    );
                    setLoader(false);
                    if (setReload) {
                        setReload(!reload);
                    }

                    toast({
                        description: "Profile pic changed successfully",
                        action: (
                            <IoCheckmarkDoneCircleSharp className='text-blue' />
                        ),
                    });
                } else {
                    setLoader(false);
                }
            } catch (error) {
                setLoader(false);
                toast({
                    variant: "destructive",
                    description: "Something went wrong",
                });
            }
        }
    };


    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                // File size is greater than 2 MB
                setFileSizeError('File size should not exceed 2 MB.');
            } else {
                // File size is within the limit

                setImage(file);
                setFileSizeError('');
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    setImagesrc(event.target.result as string);
                };
                reader.readAsDataURL(file);
                updateProfilePic(file)
            }
        }
    };

    return (
        <div className='relative h-[307.2px] w-full px-5 md:w-[360.533px]'>
            <Image className=' object-cover rounded-[15px] flex-shrink-0 w-[360.53px] h-[307.2px]' src={imagesrc ? imagesrc : profilepic ? profilepic : "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"} height={1000} width={1000} alt='profile pic' />

            {/* the change photo container */}
            <div className='absolute bottom-[23px] left-11 gap-[10px] cursor-pointer bg-white rounded-[8px] px-[15px] py-[10px]'>
                <div className='flex space-x-2 items-center'>
                    {/* the camera */}
                    <Image className='w-[18px] h-[18px]' src={"/Dashboard/filled.svg"} height={500} width={500} alt='camera' />

                    <Label htmlFor="picture" className='text-[14px] leading-[22px] font-normal  '>
                        {loader ? (
                            <BiLoaderAlt className='text-center animate-spin' />
                        ) : (
                            "Change Photo"
                        )}
                    </Label>
                    <Input
                        id='picture'
                        type='file'
                        name='files'
                        className='h-20 w-52'
                        accept='image/*'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>


            </div>
            <h1 className='text-red-500 text-center'>{fileSizeError}</h1>
        </div>
    )
}

export default ProfilePictureSetting