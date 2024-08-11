import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import IconShowcaseButton from '@/features/Dashboard/shared/IconShowcaseButton'
import { Modal } from '@mantine/core'
import { useToast } from '@/components/ui/use-toast'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { DatePicker } from '@mantine/dates';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import '@mantine/dates/styles.css';
import { format } from "date-fns"
import { ProfSettingsContext } from '@/context/ProfSettingsContext'
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Cert } from '@/context/types'
import { isOnlySpecialCharacters } from '@/utils/Validations'
// import { DateInput } from '@mantine/dates';

type Props = {
    opened: boolean;
    close: () => void;
    certToUpdate?: Cert;
}

const AddCertification = ({ opened, close, certToUpdate }: Props) => {
    const [loader, setLoader] = useState<boolean>(false)
    const { toast } = useToast();
    const { profileId, professionalId, jwt } = useContext(AuthContext)
    const { setCertLoader, certLoader } = useContext(ProfSettingsContext)
    const [error, setError] = useState<string>("")
    const [form, setForm] = useState<any>({
        name: "",
        issued_by: "",
        issue_date: "",
        type: "Certification"
    })


    const handleChange = (e: any) => {
        setError("")
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setError("")
        setLoader(false)
        setForm({
            name: "",
            issued_by: "",
            issue_date: "",
            type: "Certification"
        })
    }

    const handleAddCertification = async (e: any) => {
        e.preventDefault();
        setLoader(true)

        if (form?.name?.trim() === "" || isOnlySpecialCharacters(form?.name?.trim())) {
            setError("Name cannot be empty or only special characters");
            setLoader(false)
            return
        }

        if (form?.issued_by?.trim() === "" || isOnlySpecialCharacters(form?.issued_by?.trim())) {
            setError("Issued by cannot be empty or only special characters");
            setLoader(false)
            return
        }

        if (form.issue_date === "") {
            setError("Please enter an issue date")
            setLoader(false)
            return
        }

        let fomartedDate = format(form.issue_date, "y-LL-dd")
        try {
            let addCert;
            if (certToUpdate?.id) {
                addCert = await axios.put(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/certifications/${certToUpdate?.id}`,
                    {
                        data: {
                            ...form,
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
                addCert = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/certifications`,
                    {
                        data: {
                            ...form,
                            issue_date: fomartedDate,
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


            if (addCert?.data?.data?.id) {
                if (setCertLoader) {
                    setCertLoader(!certLoader)
                }
                toast({
                    description: `${certToUpdate?.id ? "Certification updated successfully" : "Certification added successfully"}`,
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
                description: "Something went wrong, could not add certification",
            });
        }
    }


    useEffect(() => {

        setForm({
            name: certToUpdate?.attributes?.name ?? '',
            issued_by: certToUpdate?.attributes?.issued_by ?? '',
            issue_date: certToUpdate?.attributes?.issue_date ?? '',
            type: "Certification"
        })

    }, [certToUpdate])



    return (
        <Modal opened={opened} size={"55rem"} onClose={() => {
            if (!certToUpdate?.id) {
                resetForm()
            }

            close()
        }} title={`${certToUpdate?.id ? "Update" : "Add"} Certication`} >

            <form onSubmit={handleAddCertification}>
                {/* the certification name */}
                <div className='mt-4 w-full  flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Name (max : 100 characters)<span className='text-red-500'>*</span></h1>
                    <Input name='name'
                        value={form.name}
                        maxLength={100}
                        onChange={handleChange}
                        required
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter name of the certification' />
                </div>

                {/* issued by certification */}
                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Issued By (max : 60 characters)<span className='text-red-500'>*</span></h1>

                    <Input name='issued_by'
                        required
                        maxLength={60}
                        value={form.issued_by}
                        onChange={handleChange}
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Issued By?' />
                </div>

                {/* issued date*/}
                <div className='mt-4 w-full flex z-50 flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Issued Date <span className='text-red-500'>*</span></h1>

                    <div className='flex  w-full justify-center'>
                        <DatePicker

                            defaultDate={certToUpdate?.id ? new Date(form.issue_date) : new Date()}
                            type="default"
                            value={new Date(form.issue_date)}
                            maxDate={new Date()}
                            size={"xl"}
                            onChange={(e) => {
                                setError("")
                                setForm({
                                    ...form,
                                    issue_date: e,
                                });
                            }}

                        />;
                    </div>


                    {/* <Calendar
                        mode="single"
                        required
                        disabled={[
                            { after: new Date() },
                        ]}
                        selected={new Date(form.issue_date)}
                        defaultMonth={certToUpdate?.id ? new Date(form.issue_date) : new Date()}
                        onSelect={(e) => {
                            console.log("down there", e)
                            setError("")
                            setForm({
                                ...form,
                                issue_date: e,
                            });
                        }}
                        initialFocus
                    /> */}


                </div>

                {/* The certification type */}
                {/* <div className='mt-4 w-full flex flex-col space-y-1 my-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Type</h1>


                    <Select onValueChange={(e) => {
                        setForm({
                            ...form,
                            type: e
                        });
                    }}>
                        <SelectTrigger className="bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ">
                            <SelectValue placeholder="Certification" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="Award">Award</SelectItem>
                            <SelectItem value="Certification">Certification</SelectItem>
                        </SelectContent>
                    </Select>

                </div> */}


                <h1 className='text-center my-1 text-[14px] text-red-500'> {error}</h1>
                {/* Add portfolio button */}
                <IconShowcaseButton loading={loader} text={`${certToUpdate?.id ? "Update" : "Add"} Certification`} color='#3EB87F' textCenter width='w-full' textCN='text-[16px] font-semibold leading-[26px] text-white mx-[19px]' px='19px' py='9px' rounded={"4px"} noBorder />
            </form>

        </Modal >
    )
}

export default AddCertification