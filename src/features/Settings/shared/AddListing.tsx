import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import IconShowcaseButton from '@/features/Dashboard/shared/IconShowcaseButton'
import { Modal } from '@mantine/core'
import { useToast } from '@/components/ui/use-toast'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { ProfSettingsContext } from '@/context/ProfSettingsContext'
import { Label } from '@/components/ui/label'
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import { Skeleton } from '@/components/ui/skeleton'
import { validateNewListingFields } from '@/utils/Validations'
import { IoCheckmarkCircleOutline } from "react-icons/io5";

type Props = {
    opened: boolean;
    close: () => void;
}

const AddListing = ({ opened, close }: Props) => {
    const [loader, setLoader] = useState<boolean>(false)
    const { toast } = useToast();
    const { profileId, professionalId, jwt } = useContext(AuthContext)
    const { setListingsLoader, listingsLoader } = useContext(ProfSettingsContext)
    const [response, setResponse] = useState("")
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");
    const [aiOpen, setAiOpen] = useState(false)
    const [aiLoader, setAILoader] = useState<boolean>(false)
    const [articleBanner, setArticleBanner] = useState<any>()
    const [form, setForm] = useState({
        name: "",
        location: "",
        price: "",
        description: "",
        address: "",
        city: "",
        country: "",
        zip: "",
        status: "active"
    })

    const closeAiOpen = () => {
        setAiOpen(false)
    }

    const openAiOpen = () => {
        setAiOpen(true)
    }

    const handleChange = (e: any) => {
        setError("")
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // File size is within the limit
            setArticleBanner(file)
        }
    }

    const resetForm = () => {
        setForm({
            name: "",
            location: "",
            price: "",
            description: "",
            address: "",
            city: "",
            country: "",
            zip: "",
            status: "active"
        })
        setArticleBanner(null)
    }

    const handleAddListing = async (e: any) => {
        e.preventDefault();
        setLoader(true)

        const errorMsg = validateNewListingFields(form);
        if (errorMsg) {
            setError(errorMsg);
            setLoader(false);
            return;
        }

        try {

            let response;
            let dat;
            if (articleBanner) {
                const body = new FormData();
                body.append('files', articleBanner);

                response = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload/`,
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
            }
            if (response) {
                dat = {
                    Gallery: response.data[0].id,
                    ...form,
                }
            } else {
                dat = {
                    ...form
                }
            }

            const addProf = await axios.post(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings`,
                {
                    data: {
                        ...dat,
                        client_profile: profileId,
                        professional_profile: professionalId
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            if (addProf?.data?.data?.id) {
                if (setListingsLoader) {
                    setListingsLoader(!listingsLoader)
                }
                toast({
                    description: "Listing created successfully.",
                    action: (
                        <IoCheckmarkCircleOutline className='text-green-500' />
                    ),
                });
                setLoader(false)
                resetForm()
                setError("")
                close()
            }


        } catch (error) {
            console.error(error);
            setLoader(false)
            toast({
                variant: "destructive",
                description: "Something went wrong, could not add listing",
            });
        }
    }


    const handleAiDescriptionSuggestion = async () => {
        setAILoader(true);
        openAiOpen();
        const formData = new FormData();

        formData.append("propertyFields", JSON.stringify(form));


        fetch("/api/ai-property", {

            method: "POST",

            body: formData,

        }).then((res) => {

            // create a stream from the response

            const reader = res.body?.getReader();

            return new ReadableStream({

                start(controller) {

                    return pump();

                    function pump(): any {

                        return reader?.read().then(({ done, value }) => {

                            // no more data - exit our loop

                            if (done) {

                                controller.close();
                                setAILoader(false)
                                setDone(true)
                                return;

                            }
                            // decode the current chunk and append to our response value

                            const decoded = new TextDecoder("utf-8").decode(value);

                            let trimmedResponse = decoded.trim().replace(/0:"/g, '').replace(/"/g, '').replace(/\\n/g, '');
                            setResponse((prev) => `${prev}${trimmedResponse}`);

                            return pump();

                        });

                    }

                },

            });

        });

    }



    return (
        <Modal opened={opened} size={"55rem"} onClose={() => {
            resetForm()

            close()
        }} title="Add Listing" >

            <form onSubmit={handleAddListing}>

                <div className='mt-4 w-full  flex flex-col space-y-1'>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture"> Banner</Label>
                        <Input onChange={handleFileChange} id="picture" type="file" />
                    </div>
                </div>

                {/* the listing name */}
                <div className='mt-4 w-full  flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Name (max : 100 characters)<span className='text-red-500'>*</span></h1>
                    <Input name='name'
                        value={form.name}
                        maxLength={100}
                        onChange={handleChange}
                        required
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter name of the listing' />
                </div>

                {/* the listing location */}
                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Location (max : 60 characters)<span className='text-red-500'>*</span></h1>

                    <Input name='location'
                        required
                        maxLength={60}
                        value={form.location}
                        onChange={handleChange}
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter location' />
                </div>

                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Country (max : 40 characters)<span className='text-red-500'>*</span></h1>

                    <Input name='country'
                        required
                        maxLength={40}
                        value={form.country}
                        onChange={handleChange}
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter country' />
                </div>

                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Address (max : 100 characters)<span className='text-red-500'>*</span></h1>

                    <Input name='address'
                        required
                        maxLength={100}
                        value={form.address}
                        onChange={handleChange}
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter address' />
                </div>

                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Zip (max : 10 characters)<span className='text-red-500'>*</span></h1>

                    <Input name='zip'
                        required
                        maxLength={10}
                        value={form.zip}
                        onChange={handleChange}
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter zip' />
                </div>

                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>City (max : 40 characters)<span className='text-red-500'>*</span></h1>

                    <Input name='city'
                        required
                        maxLength={40}
                        value={form.city}
                        onChange={handleChange}
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter city' />
                </div>

                {/* the listing price */}
                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Price (max : 40 characters)<span className='text-red-500'>*</span></h1>

                    <Input name='price'
                        required
                        maxLength={40}
                        value={form.price}
                        onChange={(e: any) => {
                            if (/^\d*$/.test(e?.target?.value)) {
                                handleChange(e);
                            }
                        }}
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter price' />
                </div>

                {/* the listing description */}
                <div className='mt-4 flex flex-col space-y-1 my-2'>
                    <div className="flex items-center justify-between">
                        <h1 className='text-[#808191] text-[14px] leading-[22px]'>Description (max : 300 characters)<span className='text-red-500'>*</span></h1>
                        <IconShowcaseBox onClick={handleAiDescriptionSuggestion} text="AI enhance" color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />
                    </div>

                    <Textarea name='description'
                        value={form.description}
                        maxLength={300}
                        onChange={handleChange}
                        required
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter listing description' />

                </div>

                <h1 className='text-center my-1 text-[14px] text-red-500'> {error}</h1>

                {/* Add listing button */}
                <IconShowcaseButton loading={loader} text='Add Listing' color='#3EB87F' textCenter width='w-full' textCN='text-[16px] font-semibold leading-[26px] text-white mx-[19px]' px='19px' py='9px' rounded={"4px"} noBorder />
            </form>

            <Modal closeOnClickOutside={false} closeOnEscape={false} opened={aiOpen} size={"55rem"} onClose={() => {
                closeAiOpen()
                setDone(false)
                setResponse("")
            }} title={`Ai Enhanced Property Description`}>

                {
                    aiLoader && (
                        <div className="flex flex-col space-y-3 mt-7">
                            <Skeleton className="h-[50px] w-[80%] bg-ravinnabg rounded-xl" />
                        </div>
                    )
                }

                {
                    response?.trim() !== "" && (
                        <div className={"flex justify-start my-5"} >
                            <div className={`py-4 px-4 text-white ${"bg-slate-800 max-w-[100%]"} ${"rounded-b-[6px] rounded-tr-[6px]"}`}>
                                <div>
                                    <h1> {response}</h1>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    done && (
                        <IconShowcaseBox onClick={() => {
                            setForm({
                                ...form,
                                description: response?.replace(/\s+/g, ' ').trim(),
                            });
                            closeAiOpen()
                            setDone(false)
                            setResponse("")
                        }} text="Use AI description" color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />
                    )
                }

            </Modal>

        </Modal >
    )
}

export default AddListing