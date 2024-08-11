"use client";
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/AuthContext';
import { ProfSettingsContext } from '@/context/ProfSettingsContext';
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@/components/ui/popover";
import { TiSocialAtCircular } from "react-icons/ti";

type Props = {}

const AgentProfSettings = (props: Props) => {
    const [imagesrc, setImagesrc] = useState<string>();
    const [error, setError] = useState<string>("");
    const [fileError, setFileError] = useState('');
    const [imageSize, setImageSize] = useState("")
    const { profDetails, setProfDetails, setProfessionalPhoto } = useContext(ProfSettingsContext)
    const { prof } = useContext(AuthContext)

    const [isDeleteSocialLinks, setIsDeleteSocialLinks] = useState<boolean>(false)
    const [selectedLinks, setSelectedLinks] = useState(profDetails?.social_links || [])
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [customUrl, setCustomUrl] = useState("")
    const [currentOption, setCurrentOption] = useState(null)

    useEffect(() => {
        if (profDetails && profDetails.social_links) {
            setSelectedLinks(profDetails.social_links);
        }
    }, [profDetails]);


    const handleFileChange = (e: any) => {
        setImageSize("");
        setFileError("");
        const file = e.target.files[0];

        if (file) {
            if (!['image/png', 'image/jpeg'].includes(file.type)) {
                // File format is not PNG or JPG
                setFileError('Please select a PNG or JPG file.');
            } else if (file.size > 2 * 1024 * 1024) {
                // File size is greater than 2 MB
                setFileError('File size should not exceed 2 MB.');
            } else {
                // File size is within the limit and format is correct
                const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB
                setImageSize(`Your Image size : ${fileSizeInMB} MB`);
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    setImagesrc(event.target.result as string);
                };
                reader.readAsDataURL(file);

                if (setProfessionalPhoto) {
                    setProfessionalPhoto(file);
                }
            }
        }
    };

    const handleChange = (e: any) => {
        setError("");
    
        const formatPhoneNumber = (phoneNumber: string) => {
          // Remove all non-digit characters
          let cleaned = phoneNumber.replace(/\D/g, "");
    
          // Ensure the length is no more than 11 digits
          if (cleaned.length > 11) {
            cleaned = cleaned.slice(0, 11); // Truncate to 11 digits
        }
          // Add the formatting
          const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    
          if (match) {
            return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
          }
    
          return phoneNumber;
        };
    
        let { name, value } = e.target;
    
        if (name === "phone") {
          value = formatPhoneNumber(value);
        }
    
        if (setProfDetails && profDetails) {
          setProfDetails({
            ...profDetails,
            [name]: value,
          });
        }
      };

    const handleSelect = (option: any) => {
        setCurrentOption(option)
        setIsPopoverOpen(true)
    }

    const handleUrlSubmit = () => {
        if (customUrl && currentOption) {
            const existingLinkIndex = selectedLinks.findIndex((link) => link.value === currentOption.value);

            if (existingLinkIndex !== -1) {
                // Update existing URL
                setSelectedLinks((prevLinks) => {
                    const updatedLinks = [...prevLinks];
                    updatedLinks[existingLinkIndex] = {
                        ...updatedLinks[existingLinkIndex],
                        url: customUrl,
                    };

                    if (setProfDetails) {
                        setProfDetails((prevDetails) => ({
                            ...prevDetails,
                            social_links: updatedLinks,
                        }));
                    }

                    return updatedLinks;
                });
            } else {
                // Add new URL
                const newLink = { value: currentOption.value, url: customUrl, src: currentOption.src };
                setSelectedLinks((prevLinks) => {
                    const newLinks = [newLink, ...prevLinks];

                    if (setProfDetails) {
                        setProfDetails((prevDetails) => ({
                            ...prevDetails,
                            social_links: newLinks,
                        }));
                    }

                    return newLinks;
                });
            }

            setCustomUrl("");
            setIsPopoverOpen(false); // Close popover after adding/updating URL
        }
    };

    const handleDelete = (indexToDelete: any) => {
        setSelectedLinks((prevLinks) => prevLinks.filter((_, index) => index !== indexToDelete));
        // If necessary, update profile details to remove the deleted link
        if (setProfDetails) {
            setProfDetails((prevDetails) => ({
                ...prevDetails,
                social_links: prevDetails.social_links.filter((_, index) => index !== indexToDelete),
            }));
        }
    };

    return (
        <section className='bg-[#FCFCFC] flex flex-col space-y-3 mt-10 rounded-[10px] w-full  p-[20px]'>

            <div className='flex max-md:flex-col max-md:space-y-3 md:space-x-6 '>

                {/* the image/ change photo */}
                <div className='relative max-h-[307.2px] w-full px-5 md:w-[360.533px]'>
                    <Image className='object-cover max-h-[307.2px] md:h-[307.2px] flex-shrink-0 rounded-md '
                        src={imagesrc
                            ? imagesrc
                            : prof?.data?.attributes?.professional_photo?.data
                                ? prof?.data?.attributes?.professional_photo?.data?.attributes?.url ?? "/Realtor/Profile.png"
                                : "/Realtor/Profile.png"
                        }
                        height={1000} width={1000} alt='profile pic' />

                    {/* the change photo container */}
                    <div>
                        <label htmlFor="fileProfilePic">
                            <div className='absolute bottom-5 left-7 gap-[10px] cursor-pointer bg-white rounded-[8px] px-[15px] py-[10px]'>
                                <div className='flex space-x-2 items-center'>
                                    {/* the camera */}
                                    <Image className='w-[18px] h-[18px]' src={"/Dashboard/filled.svg"} height={500} width={500} alt='camera' />

                                    <h1 className='text-[14px] leading-[22px] font-medium '>Change Photo</h1>

                                </div>
                            </div>
                        </label>

                        <input
                            id="fileProfilePic"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>


                    <h1 className="text-center text-red-500 ">{fileError}</h1>

                    <h1 className="text-center  ">{imageSize}</h1>
                </div>



                {/* the details settings */}
                <form className='flex flex-col'>
                    {/* the details */}
                    <div className='flex flex-col space-y-2 h-full md:justify-between'>
                        {/* full name and experience */}
                        <div className='flex max-md:flex-col max-md:space-y-2 md:space-x-5  md:items-center'>
                            {/* full name */}
                            <div className='flex flex-col space-y-2'>
                                <h1 className='text-[#808191] text-[14px] leading-[22px]'>Full Name</h1>
                                <Input name='full_name' type='text' onChange={handleChange}
                                    value={profDetails?.full_name} placeholder='Enter your full name' className='w-full md:w-[261px]' />
                            </div>
                            {/* the experience */}
                            <div className='flex flex-col space-y-2'>
                                <h1 className='text-[#808191] text-[14px] leading-[22px]'>Experience</h1>
                                <Input name='Experience' type='text' onChange={handleChange}
                                    value={profDetails?.Experience} placeholder='Enter your experience' className='w-full md:w-[261px]' />
                            </div>
                        </div>

                        {/* phone number and email */}
                        <div className='flex max-md:flex-col max-md:space-y-2 md:space-x-5  md:items-center'>
                            <div className='flex flex-col space-y-2'>
                                <h1 className='text-[#808191] text-[14px] leading-[22px]'>Phone Number</h1>
                                <Input name='phone' type='text' onChange={handleChange}
                                    value={profDetails?.phone} placeholder='Enter your phone number' className='w-full md:w-[261px]' />
                            </div>

                            <div className='flex flex-col space-y-2'>
                                <h1 className='text-[#808191] text-[14px] leading-[22px]'>Email</h1>
                                <Input name='email' type='email' onChange={handleChange}
                                    value={profDetails?.email} placeholder='Enter your email' className='w-full md:w-[261px]' />
                            </div>
                        </div>

                        {/* city and age */}
                        <div className='flex max-md:flex-col max-md:space-y-2 md:space-x-5  md:items-center'>
                            <div className='flex flex-col space-y-2'>
                                <h1 className='text-[#808191] text-[14px] leading-[22px]'>City</h1>
                                <Input name="city" type='text' onChange={handleChange}
                                    value={profDetails?.city} placeholder='Enter your city' className='w-full md:w-[261px]' />
                            </div>

                            {/* <div className='flex flex-col space-y-2'>
                                <h1 className='text-[#808191] text-[14px] leading-[22px]'>Age</h1>
                                <Input name='age' type='text' onChange={handleChange}
                                    value={profDetaillms?.full_name != "" ?
                                        profDetails?.full_name
                                        : prof?.data?.attributes.full_name
                                            ? prof?.data.attributes.full_name
                                            : ""} placeholder='Hussain Ahmed' className='w-full md:w-[261px]' />
                            </div> */}
                        </div>

                        {/* the social media links */}
                        <div className='flex max-md:flex-col md:space-x-7 md:items-center'>
                            <h1 className='text-[#808191] text-[14px] leading-[22px]'>Social Media Links:</h1>

                            <div className="flex space-x-2 items-center">
                                {selectedLinks.map((link, index) => (
                                    <div key={index} className="relative inline-block"
                                        onClick={() => {
                                            setIsDeleteSocialLinks(true); // Set to true when delete button is clicked
                                            setTimeout(() => {
                                                setIsDeleteSocialLinks(false); // Set back to false after two seconds
                                            }, 2000);
                                        }}
                                    >
                                        <Image src={link.src} alt={link.alt} width={38} height={38} className="w-[38px] h-[38px]" />
                                        {
                                            isDeleteSocialLinks &&
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="absolute top-0 right-0 w-4 h-4 bg-white rounded-full text-white flex items-center justify-center hover:bg-red-600"
                                            >
                                                <Image src={"/trash.svg"} alt='trash' width={14} height={14} />
                                            </button>
                                        }
                                    </div>
                                ))}

                                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <button className='relative'>
                                            <TiSocialAtCircular className="w-[38px] h-[38px]  rounded-full text-slate-500" />

                                            <div className="h-3 absolute top-0 right-0 text-ravinnabg w-3 rounded-full flex border border-ravinnabg flex-col justify-center items-center">
                                                +
                                            </div>
                                            {/* <Image src="/Realtor/Tiktok.svg" alt="Select social link" width={38} height={38} className="w-[38px] h-[38px]" /> */}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-4">
                                        <div className="grid grid-cols-1 gap-2">
                                            {[
                                                { value: 'facebook', src: '/Realtor/Facebook.svg' },
                                                { value: 'twitter', src: '/Realtor/Twitter.svg' },
                                                { value: 'linkedin', src: '/Realtor/Linkedin.svg' },
                                                { value: 'tiktok', src: '/Realtor/TiktokActive.svg' },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleSelect(option)}
                                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
                                                >
                                                    <Image src={option.src} alt={'icon'} width={20} height={20} className="w-[20px] h-[20px]" />
                                                    <span>{option.value.charAt(0).toUpperCase() + option.value.slice(1)}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {currentOption && (
                                            <div className="mt-4">
                                                <input
                                                    type="text"
                                                    value={customUrl}
                                                    onChange={(e) => setCustomUrl(e.target.value)}
                                                    placeholder={`Enter ${currentOption.value} URL`}
                                                    className="w-full p-2 border rounded-md"
                                                />
                                                <button
                                                    onClick={handleUrlSubmit}
                                                    className="mt-2 w-full p-2 text-white rounded-md bg-[#3EB87F]"
                                                >
                                                    Add URL
                                                </button>
                                            </div>
                                        )}
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* <Popover
                            // onValueChange={(e) => {
                            //     setForm({
                            //         ...form,
                            //         socialMedia: e,
                            //     });
                            // }}
                            >
                                <PopoverTrigger className="w-[361px] h-[46px] bg-white rounded-[8px] mt-4">
                                    <SelectValue placeholder="Select social media link" />
                                </PopoverTrigger>
                                <SelectContent>
                                    {[
                                        { value: 'facebook', src: '/Realtor/Facebook.svg', alt: 'Facebook link' },
                                        { value: 'twitter', src: '/Realtor/Twitter.svg', alt: 'Twitter link' },
                                        { value: 'linkedin', src: '/Realtor/Linkedin.svg', alt: 'LinkedIn link' },
                                        { value: 'tiktok', src: '/Realtor/Tiktok.svg', alt: 'TikTok link' },
                                    ].map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <div className='flex space-x-2 items-center'>
                                                <Image src={option.src} alt={option.alt} width={38} height={38} className='w-[38px] h-[38px]' />
                                                <span>{option.alt.split(' ')[0]}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Popover> */}

                        </div>
                    </div>

                </form>
            </div>

        </section>
    )
}

export default AgentProfSettings