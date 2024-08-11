"use client";
import { Input } from '@/components/ui/input'
import { Divider } from '@mantine/core'
import React, { useContext, useState } from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { BiLoaderAlt } from 'react-icons/bi';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from '@/context/AuthContext';
import { changeUserPassword } from '../functions';

type Props = {}

const PasswordChange = (props: Props) => {

    const [load, setLoad] = useState<boolean>(false)
    const { toast } = useToast();
    const { jwt } = useContext(AuthContext)

    // the validation schema for the password
    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
    });



    // function to change the password
    const handlePassword = async (
        values: any,
        actions: FormikHelpers<{
            currentPassword: string;
            password: string;
            passwordConfirmation: string;
        }>
    ) => {
        setLoad(true);
        await changeUserPassword(values, jwt)
            .then((res) => {
                if (res) {
                    // setSuccessMsg("Password changed successfully");
                    // setTimeout(() => {
                    //   setSuccessMsg("");
                    // }, 2000);
                    toast({
                        description: "password changed successfully",
                        action: (
                            <IoCheckmarkDoneCircleSharp className='text-blue' />
                        ),
                    });
                    actions.resetForm();
                    setLoad(false);
                }
            })
            .catch((err) => {
                setLoad(false);
                actions.resetForm();
                if (err?.response?.data?.error?.message) {
                    toast({
                        variant: "destructive",
                        description: err?.response?.data?.error?.message,
                    });
                }
            });
    };

    return (
        <Formik
            initialValues={{
                currentPassword: "",
                password: "",
                passwordConfirmation: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                // Handle form submission here
                handlePassword(values, actions);
                actions.setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className='my-5'>

                    <div className='my-2 grid grid-cols-1 md:grid-cols-2'>
                        <div className='flex flex-col space-y-2 px-4'>
                            <h1 className='text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] '>CURRENT PASSWORD</h1>
                            <Field type='password'
                                name='currentPassword' className='rounded-[4px] border border-[#34495D] bg-white w-full =  h-[46px]' placeholder='' />
                            <ErrorMessage
                                name='currentPassword'
                                component='div'
                                className='text-red-500'
                            />
                        </div>

                        <div className=' flex-col hidden space-y-2 px-4'>
                           
                        </div>

                    </div>

                    <div className='my-2 grid grid-cols-1 md:grid-cols-2'>
                        {/* new password */}
                        <div className='flex flex-col space-y-2 px-4'>
                            <h1 className='text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] '>NEW PASSWORD</h1>
                            <Field type='password'
                                name='password' className='rounded-[4px] border border-[#34495D] bg-white w-full  h-[46px]' placeholder='' />
                            <ErrorMessage
                                name='password'
                                component='div'
                                className='text-red-500'
                            />
                        </div>
                        {/* confirm password */}
                        <div className='flex flex-col space-y-2 px-4'>
                            <h1 className='text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] '>CONFIRM PASSWORD</h1>
                            <Field type='password'
                                name='passwordConfirmation' className='rounded-[4px] border border-[#34495D] bg-white w-full  h-[46px]' placeholder='' />
                            <ErrorMessage
                                name='passwordConfirmation'
                                component='div'
                                className='text-red-500'
                            />
                        </div>
                    </div>

                    <div className='flex justify-center my-10 mx-4 md:mx-0'>
                        <button type='submit' disabled={isSubmitting} className=' w-full md:w-[196px] h-[48px] rounded-[6px] md:rounded-[4px] text-white bg-[#3EB87F] text-[14px] leading-[24px] font-semibold tracking-[0.5px] flex flex-col justify-center items-center '>
                            {load ? (
                                <BiLoaderAlt className='text-center animate-spin' />
                            ) : (
                                "SAVE CHANGES"
                            )}
                        </button>
                    </div>
                    <h1 className='text-[11px] text-[#222529] leading-[18px] font-medium tracking-[0.5px] text-center'>You will be asked to log in again with your new password after you save your changes.</h1>

                    <Divider my="sm" />


                </Form>
            )}
        </Formik>
    )
}

export default PasswordChange