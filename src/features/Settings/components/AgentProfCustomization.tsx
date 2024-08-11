"use client";
import { Input } from '@/components/ui/input'
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React, { useContext, useState } from 'react'
import ColorPicker from '../shared/ColorPicker'
import { ProfSettingsContext } from '@/context/ProfSettingsContext';
import { AuthContext } from '@/context/AuthContext';
import { MdOutlineAttachment } from "react-icons/md";
import { useToast } from '@/components/ui/use-toast'
import { uploadImage, uploadImageByUrl } from '@/features/Property/function';
import axios from 'axios';
import { IoCheckmarkCircleOutline, IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { RxCross1 } from "react-icons/rx";
import Image from 'next/image';

type Props = {}

const AgentProfCustomization = (props: Props) => {
    const { profileCustomization, setProfileCustomization, profileLogo, setProfileLogo } = useContext(ProfSettingsContext)
    const { prof, jwt, professionalId, reload, setReload, logoId, setLogoId } = useContext(AuthContext)
    const [selected, setSelected] = useState(false)
    const [selectedColor, setSelectedColor] = useState("")
    const { toast } = useToast();
    const [imageUrl, setImageUrl] = useState<any>(null);

    const [imagesrc, setImagesrc] = useState<string>();
    const [error, setError] = useState<string>("");
    const [imageSize, setImageSize] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e: any) => {
        if (setProfileCustomization && profileCustomization) {
            setProfileCustomization({
                ...profileCustomization,
                [e.target.name]: e.target.value,
            });
        }
    };

    const setBrandColor = (color: string) => {
        if (setProfileCustomization && profileCustomization) {
            setProfileCustomization({
                ...profileCustomization,
                brand_color: color,
            });
        }
    }



    const handleFileChange = (e: any) => {

        setImageSize("");
        setError("");
        const file = e.target.files[0];


        // if (imageUrl && imageUrl != "") {
        //     handleUpload(imageUrl)
        //     return
        // }

        if (file) {
            if (!['image/png', 'image/jpeg'].includes(file.type)) {
                // File format is not PNG or JPG
                setError('Please select a PNG or JPG file.');
            } else if (file.size > 2 * 1024 * 1024) {
                // File size is greater than 2 MB
                setError('File size should not exceed 2 MB.');
            } else {
                // File size is within the limit and format is correct
                const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB
                setImageSize(`Your Image size : ${fileSizeInMB} MB`);
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    setImagesrc(event.target.result as string);
                };
                reader.readAsDataURL(file);

                if (setImageUrl) {
                    setImageUrl(file);
                    handleUpload(file)
                }
            }
        }
    };


    const handleUpload = async (file: any) => {
        let imageUrl = file
        setError('');
        setLoading(true)

        try {
            const logoId = typeof (imageUrl) === 'object' ? await uploadImage(jwt, imageUrl) : await uploadImageByUrl(jwt, imageUrl);

            // update the logo Id
            if (logoId?.length > 0) {
                setProfileLogo(logoId[0]?.id)
                setLogoId(logoId[0]?.id)
                // setImageUrl()
                let response;

                if (logoId[0]?.id) {
                    response = await axios.put(
                        `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-profiles/${professionalId}`,
                        {
                            data: {
                                profile_logo: logoId[0]?.id
                            },
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${jwt}`,
                            },
                        }
                    );
                }

                if (response?.data?.data?.id) {
                    toast({
                        description: "Profile logo updated successfully",
                        action: (
                            <IoCheckmarkCircleOutline className='text-green-500' />
                        ),
                    });
                } else {
                    toast({
                        variant: "destructive",
                        description: "Something went wrong, could not update the profile logo",
                    });
                }
            }

            if (typeof (logoId) == "string") {
                setError(logoId)
            }

        } catch (error) {
            setError('An error occurred while uploading the image.');
        } finally {
            setLoading(false)
        }
    };





    const handleDelete = async (file: any) => {

        setLoading(true)

        try {

            const data = {
                data: {
                    profile_logo: {
                        disconnect: [logoId],
                    },
                },
            };

            let response = await axios.put(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-profiles/${professionalId}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );


            if (response?.data?.data?.id) {
                if (setReload) {
                    setReload(!reload);
                }
                setImageUrl("")
                setImagesrc(null)
                setLogoId(null)
                const fileInput: any = document.getElementById('fileProfileLogo');
                fileInput.value = null;
                toast({
                    description: "Profile logo deleted successfully",
                    action: (
                        <IoCheckmarkCircleOutline className='text-green-500' />
                    ),
                });
            } else {
                toast({
                    variant: "destructive",
                    description: "Something went wrong, could not delete the profile logo",
                });
            }

        } catch (error) {
            setError('An error occurred while deleting the image.');
        } finally {
            setLoading(false)
        }
    };


    const checkImage = () => {
        if (!logoId) {
            return false;
        } else {
            return true
        }
    }




    return (
        <section className='bg-[#FCFCFC] flex flex-col space-y-3 mt-10 rounded-[10px] w-full  p-[20px]'>

            {/* the header */}
            <div>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Profile Customization</h1>
            </div>

            {/* custome cta button url Link */}
            <div className='flex max-md:flex-col md:space-x-7 mt-4 md:items-center'>
                <div className='mt-4 w-full md:w-1/2 flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Custom CTA Button</h1>
                    <Input name='Custom_cta_button' onChange={handleChange}
                        value={profileCustomization?.Custom_cta_button} className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Schedule a consultation' />
                </div>

                <div className='mt-4 w-full md:w-1/2 flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>URL Link</h1>
                    <Input name='url_link' onChange={handleChange}
                        value={profileCustomization?.url_link} className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter url here' />
                </div>
            </div>


            <div className='flex max-md:flex-col-reverse md:space-x-7 mt-4 md:items-center'>

                <div className='mt-4 w-full md:w-1/2 flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Choose The Color Of Your Brand</h1>
                    <div className='grid grid-cols-3 md:grid-cols-4  xl:grid-cols-7 gap-4 mt-4'>
                        {
                            [
                                "bg-[#EF4444]",
                                "bg-[#F97316]",
                                "bg-[#FACC15]",
                                "bg-[#4ADE80]",
                                "bg-[#2DD4BF]",
                                "bg-[#3B82F6]",
                                "bg-[#6366F1]",
                                "bg-[#EC4899]",
                                "bg-[#F43F5E]",
                                "bg-[#D946EF]",
                                "bg-[#8B5CF6]",
                                "bg-[#0EA5E9]",
                                "bg-[#10B981]"
                            ].map((color, index) => (
                                <ColorPicker key={index} brandColor={profileCustomization?.brand_color} color={color} onClick={setBrandColor} selected={selected} setSelected={setSelected} />
                            ))
                        }
                        <div className={`w-[30px] h-[30px] bg-white rounded-[100px] ${selected ? 'border border-gray-500' : ''} flex items-center justify-center`} onClick={() => setSelected(true)}>
                            <input
                                type="color"
                                className={`w-[24px] h-[24px] cursor-pointer rounded-[100px]`}
                                style={{ padding: '0px' }}
                                onChange={(e) => {
                                    setBrandColor(e.target.value)
                                    setSelectedColor(e.target.value)
                                }}
                                value={selectedColor}
                            />
                        </div>
                        {/* <Image src={"/Realtor/colors.svg"} alt='color picker' className='w-[24px] h-[24px] hover:scale-105 cursor-pointer' width={500} height={500} /> */}
                    </div>
                </div>

                <div className='mt-4 w-full md:w-1/2 flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Upload Your logo</h1>
                    <div className='bg-[#FCFCFC] flex items-center justify-between space-x-2 border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50'>
                        <Input
                            placeholder='Upload from device'
                            className='border-none w-[60%]'
                            // disabled={true}
                            value={typeof imageUrl === "string" ? imageUrl : imageUrl?.name ? imageUrl?.name : prof?.data?.attributes?.profile_logo?.data?.attributes?.name ?? ""}
                        // onChange={(e) => setImageUrl && setImageUrl(e.target.value)}
                        />

                        <div className='flex space-x-2 items-center'>
                            {
                                checkImage() && (
                                    <Image src={imagesrc ?? (logoId && prof?.data?.attributes?.profile_logo?.data?.attributes?.url)} className="h-[40px] w-[40px] object-contain" width={500} height={500} alt="profile logo" />
                                )
                            }

                            {
                                checkImage() && (
                                    <RxCross1 onClick={handleDelete} className='text-red-500 h-5 w-5 font-bold ' />
                                )
                            }

                            <label htmlFor="fileProfileLogo" className='cursor-pointer'>
                                <IconShowcaseBox text='Upload' py='4px' px='16px' color={'#3EB87F'} noBorder textCN='text-white text-[16px] whitespace-nowrap font-semibold leading-[26px]' loading={loading} />
                            </label>
                        </div>



                    </div>
                    <h1 className="text-left text-red-400">{error}</h1>

                    <input
                        disabled={checkImage()}
                        id="fileProfileLogo"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                </div>

            </div>

        </section>
    )
}

export default AgentProfCustomization
