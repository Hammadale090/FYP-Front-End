import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import IconShowcaseButton from '@/features/Dashboard/shared/IconShowcaseButton'
import { Modal } from '@mantine/core'
import { useToast } from '@/components/ui/use-toast'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { ProfSettingsContext } from '@/context/ProfSettingsContext'
import { Label } from '@/components/ui/label'
import { Portfolio } from '@/context/types'
import Image from 'next/image'
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import { Skeleton } from '@/components/ui/skeleton'
import { validatePortfolioFields } from '@/utils/Validations'

type Props = {
    opened: boolean;
    close: () => void;
    portToUpdate?: Portfolio;
    deletePort?: (id: string | number | undefined) => void;
    deleteLoader?: boolean;
}

const AddPortfolio = ({ opened, close, portToUpdate, deletePort, deleteLoader }: Props) => {
    const [loader, setLoader] = useState<boolean>(false)
    const { toast } = useToast();
    const { profileId, professionalId, jwt } = useContext(AuthContext)
    const { setPortfolioLoader, portfolioLoader } = useContext(ProfSettingsContext)
    const [articleBanner, setArticleBanner] = useState<any>()
    const [response, setResponse] = useState("")
    const [done, setDone] = useState(false);
    const [aiOpen, setAiOpen] = useState(false)
    const [aiLoader, setAILoader] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [imagesrc, setImagesrc] = useState<string>();
    const [form, setForm] = useState({
        name: "",
        location: "",
        price: "",
        description: ""
    })

    const closeAiOpen = () => {
        setAiOpen(false)
    }

    const openAiOpen = () => {
        setAiOpen(true)
    }


    useEffect(() => {

        setForm({
            name: portToUpdate?.attributes?.name ?? '',
            location: portToUpdate?.attributes?.location ?? '',
            price: portToUpdate?.attributes?.price ?? '',
            description: portToUpdate?.attributes?.description ?? '',
        })

    }, [portToUpdate])

    const handleChange = (e: any) => {
        setError("")
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setError("")
        setArticleBanner(null)
        setImagesrc(null)
        setLoader(false)
        setForm({
            name: "",
            location: "",
            price: "",
            description: ""
        })
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // File size is within the limit
            const reader = new FileReader();
            reader.onload = (event: any) => {
                setImagesrc(event.target.result as string);
            };
            reader.readAsDataURL(file);
            setArticleBanner(file)
        }
    }

    const handleAddPortfolio = async (e: any) => {
        e.preventDefault();
        setLoader(true)

        const errorMsg = validatePortfolioFields(form);
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

            let addPort;

            if (portToUpdate?.id) {
                addPort = await axios.put(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/portfolios/${portToUpdate?.id}`,
                    {
                        data: {
                            ...dat,
                        },
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
            } else {
                addPort = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/portfolios`,
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
            }




            if (addPort?.data?.data?.id) {
                if (setPortfolioLoader) {
                    setPortfolioLoader(!portfolioLoader)
                }
                toast({
                    description: `${portToUpdate?.id ? "Portfolio updated successfully" : "Portfolio added successfully"}`
                    ,
                    action: <IoCheckmarkDoneCircleSharp className='text-blue' />,
                });
                setLoader(false)
                resetForm()
                close()
            }


        } catch (error) {
            console.error(error);
            setLoader(false)
            toast({
                variant: "destructive",
                description: "Something went wrong, could not add portfolio",
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
        <Modal opened={opened}  onClose={() => {
            if (!portToUpdate?.id) {

                resetForm()
            }
            setImagesrc(null)
            close()
        }} title={`${portToUpdate?.id ? "Update" : "Add"} Portfolio`} >

            <form onSubmit={handleAddPortfolio}>

                {
                    portToUpdate?.id && (portToUpdate?.attributes?.Gallery?.data || imagesrc) && (
                        <div>
                            <Image width={500} height={500} alt='the profile picture' className='max-h-[350px] w-full object-cover rounded-[6px]' src={imagesrc ? imagesrc : portToUpdate?.attributes?.Gallery?.data ? portToUpdate?.attributes?.Gallery?.data[0]?.attributes?.url : ""} />
                        </div>
                    )
                }
                {/* the portfolio banner */}
                <div className='mt-4 w-full  flex flex-col space-y-1'>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Portfolio Banner</Label>
                        <Input onChange={handleFileChange} id="picture" type="file" />
                    </div>
                </div>

                {/* the portfolio name */}
                <div className='mt-4 w-full  flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Name (max : 100 characters)<span className='text-red-500'>*</span></h1>
                    <Input name='name'
                        value={form.name}
                        maxLength={100}
                        onChange={handleChange}
                        required
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter name of the portfolio' />
                </div>

                {/* the portfolio location */}
                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Location (max : 60 characters)<span className='text-red-500'>*</span></h1>

                    <Input name='location'
                        required
                        maxLength={60}
                        value={form.location}
                        onChange={handleChange}
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter location' />
                </div>

                {/* the portfolio price */}
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

                {/* the portfolio description */}
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
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter portfolio description' />

                </div>

                <h1 className='text-center my-1 text-[14px] text-red-500'> {error}</h1>

                {/* Add portfolio button */}
                <IconShowcaseButton disabled={loader ? loader : deleteLoader ? deleteLoader : false} loading={loader} text={`${portToUpdate?.id ? "Update" : "Add"} Portfolio`} color='#3EB87F' textCenter width='w-full' textCN='text-[16px] font-semibold leading-[26px] text-white mx-[19px]' px='19px' py='9px' rounded={"4px"} noBorder />

            </form>
            <div className='text-center my-1 h-[10px] ' />
            {
                portToUpdate?.id && (
                    <IconShowcaseButton disabled={loader ? loader : deleteLoader ? deleteLoader : false} onClick={() => deletePort && deletePort(portToUpdate?.id)} loading={deleteLoader} text={`Delete Portfolio`} color='#3EB87F' textCenter width='w-full' textCN='text-[16px] font-semibold leading-[26px] text-white mx-[19px]' px='19px' py='9px' rounded={"4px"} noBorder />
                )
            }

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

export default AddPortfolio