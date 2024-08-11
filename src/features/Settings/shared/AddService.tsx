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
import { validateNewServiceFields } from '@/utils/Validations'

type Props = {
    opened: boolean;
    close: () => void;
}

const AddService = ({ opened, close }: Props) => {
    const [loader, setLoader] = useState<boolean>(false)
    const { toast } = useToast();
    const { profileId, professionalId, jwt } = useContext(AuthContext)
    const { setServicesLoader, servicesLoader } = useContext(ProfSettingsContext)
    const [error, setError] = useState("");
    const [articleBanner, setArticleBanner] = useState<any>()
    const [form, setForm] = useState({
        name: "",
        location: "",
        price: "",
        description: ""
    })

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
            description: ""
        })
        setArticleBanner(null)
    }

    const handleAddService = async (e: any) => {
        e.preventDefault();
        setLoader(true)

        const errorMsg = validateNewServiceFields(form);
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
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/services`,
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
                if (setServicesLoader) {
                    setServicesLoader(!servicesLoader)
                }
                toast({
                    description: "Service added successfully",
                    action: <IoCheckmarkDoneCircleSharp className='text-blue' />,
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
                description: "Something went wrong, could not add service atm",
            });
        }
    }


    return (
        <Modal opened={opened} size={"55rem"} onClose={() => {
            resetForm()
            setArticleBanner(null)
            close()
        }} title="Add Service" >

            <form onSubmit={handleAddService}>

                {/* the service banner */}
                <div className='mt-4 w-full  flex flex-col space-y-1'>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Service Banner</Label>
                        <Input onChange={handleFileChange} id="picture" type="file" />
                    </div>
                </div>

                {/* the service name */}
                <div className='mt-4 w-full  flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Name (max : 100 characters)<span className='text-red-500'>*</span></h1>
                    <Input name='name'
                        value={form.name}
                        maxLength={100}
                        onChange={handleChange}
                        required
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter name of the service' />
                </div>

                {/* the service location */}
                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Location (max : 60 characters)<span className='text-red-500'>*</span></h1>

                    <Input name='location'
                        required
                        value={form.location}
                        maxLength={60}
                        onChange={handleChange}
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter location' />
                </div>

                {/* the service price */}
                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Price (max : 40 characters)<span className='text-red-500'>*</span></h1>

                    <Input name='price'
                        required
                        value={form.price}
                        maxLength={40}
                        onChange={(e: any) => {
                            if (/^\d*$/.test(e?.target?.value)) {
                                handleChange(e);
                            }
                        }}
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter price' />
                </div>

                {/* the service description */}
                <div className='mt-4 flex flex-col space-y-1 my-2'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Description (max : 300 characters)<span className='text-red-500'>*</span></h1>
                    <Textarea name='description'
                        value={form.description}
                        maxLength={300}
                        onChange={handleChange}
                        required
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter service description' />

                </div>

                <h1 className='text-center my-1 text-[14px] text-red-500'> {error}</h1>

                {/* Add service button */}
                <IconShowcaseButton loading={loader} text='Add Service' color='#3EB87F' textCenter width='w-full' textCN='text-[16px] font-semibold leading-[26px] text-white mx-[19px]' px='19px' py='9px' rounded={"4px"} noBorder />
            </form>

        </Modal >
    )
}

export default AddService