import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FaImage } from "react-icons/fa6";
import { Modal } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { BiLoaderAlt, BiMailSend } from "react-icons/bi";
import { useToast } from '@/components/ui/use-toast'
import React, { FormEvent, useState, useRef, useEffect, useLayoutEffect } from 'react'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { Skeleton } from "@/components/ui/skeleton"
import { CiCircleCheck } from "react-icons/ci";
import { CgCloseO } from "react-icons/cg";


type Props = {
    opened: boolean;
    close: () => void;
}


const ChatBot = ({ opened, close }: Props) => {
    const [file, setFile] = useState<any>()
    const [currentPic, setCurrentPic] = useState<any>()
    const [imagesrc, setImagesrc] = useState<string>();
    const [picSrc, setPicsrc] = useState<string>("");
    const [response, setResponse] = useState("");
    const [chatLoader, setChatLoader] = useState<boolean>(false)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [picOpen, setPicOpen] = useState<boolean>(false)
    const [emailOpen, setEmailOpen] = useState<boolean>(false)
    const [emailSuccess, setEmailSuccess] = useState<boolean>(false)
    const [emailLoading, setEmailLoading] = useState<boolean>(false)
    const [emailFailure, setEmailFailure] = useState<boolean>(false)
    const { toast } = useToast();
    const [form, setForm] = useState({
        location: "",
        size: "",
        built: "",
        description: "",
        email: "",
        content: ""
    })
    const [message, setMessage] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [emailMessage, setEmailMessage] = useState<string>('');


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const closePicOpen = () => {
        setPicOpen(false)
    }

    const openPicOpen = () => {
        setPicOpen(true)
    }


    const closeEmailOpen = () => {
        setEmailOpen(false)
    }

    const openEmailOpen = () => {
        setEmailOpen(true)
    }

    const handleChange = (e: any) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            scrollToBottom();
        }, 1000); // 2 seconds delay

        return () => clearTimeout(timeout);
    }, [opened, message, form?.content]);


    useLayoutEffect(() => {

        scrollToBottom();
    }, [opened, message, form?.content]);



    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                setImagesrc(event.target.result as string);
            };
            reader.readAsDataURL(file);
            // File size is within the limit
            setFile(file)
        }
    }

    const handlePicChange = (e: any) => {
        const file = e.target.files[0];
        e.target.value = null

        if (file) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                setPicsrc(event.target.result as string);
            };
            reader.readAsDataURL(file);
            openPicOpen()
            // File size is within the limit
            setCurrentPic(file)
        }
    }

    const handleAddPic = async () => {
        setChatLoader(true)
        const picMessageId = uuidv4();
        const userMessageId = uuidv4();
        const systemMessageId = uuidv4();
        // const encoded = await readFileAsBase64(currentPic);
        closePicOpen()
        let newPicMessage;
        let newShowMessage;

        if (form.content != "") {

            newPicMessage = [...messages,
            { id: userMessageId, role: "user", content: form.content },
            {
                id: picMessageId, type: "image", role: "user"
            }];

            newShowMessage = [...message,
            { id: userMessageId, role: "user", content: form.content },
            {
                id: picMessageId, file: currentPic as File, src: picSrc, type: "image", role: "user"
            }];
        } else {
            newPicMessage = [...messages, {
                id: picMessageId, file: currentPic as File, type: "image", role: "user"
            }]
            newShowMessage = [...message, {
                id: picMessageId, file: currentPic as File, src: picSrc, type: "image", role: "user"
            }]
        }

        await setMessage(newShowMessage);
        await setMessages(newPicMessage);

        newPicMessage.forEach((mess: any) => {
            delete mess?.src;
        });




        setPicsrc("")

        const formData = new FormData();
        const messagesString = JSON.stringify(newPicMessage);
        formData.append("file", currentPic as File);
        formData.append("latest", picMessageId)
        formData.append("content", form.content)
        formData.append("message", messagesString);

        fetch("/api/classify", {

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
                                setChatLoader(false)
                                return;

                            }
                            // decode the current chunk and append to our response value

                            const decoded = new TextDecoder("utf-8").decode(value);

                            let trimmedResponse = decoded.trim().replace(/0:"/g, '').replace(/"/g, '').replace(/\\n/g, '');
                            setResponse((prev) => `${prev}${trimmedResponse}`);
                            setMessage(prevMessages => updateMessage(prevMessages, systemMessageId, trimmedResponse));
                            setMessages(prevMessages => updateMessage(prevMessages, systemMessageId, trimmedResponse));
                            return pump();

                        });

                    }

                },

            });

        });
        setForm({
            ...form,
            content: ""
        })
        setCurrentPic(null)
    }

    const readFileAsBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader: any = new FileReader();
            reader.onload = () => {
                resolve(reader.result.split(',')[1]); // Extract base64 data from result
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };


    const updateMessage = (messagess: any, systemMessageId: any, trimmedResponse: any) => {
        const existingMessageIndex = messagess.findIndex((message: any) => message.id === systemMessageId);

        if (existingMessageIndex !== -1) {
            return messagess.map((message: any, index: any) =>
                index === existingMessageIndex ? { ...message, content: message.content + trimmedResponse } : message
            );
        } else {
            return [...messagess, { id: systemMessageId, role: "system", content: trimmedResponse }];
        }
    };

    const handleSendEmail = async (cont: string, email: string) => {
        setEmailLoading(true)
        const body = cont.replace(/\n/g, '');
        try {
            const response = await fetch("/api/email", {
                method: "POST",
                body: JSON.stringify({ email, body }),
            })

            setEmailLoading(false)
            setEmailFailure(false)
            setEmailSuccess(true)
        } catch (error) {
            setEmailLoading(false)
            setEmailSuccess(false)
            setEmailFailure(true)
        }

    }


    // submit it to it
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setResponse("")
        e.preventDefault();
        setChatLoader(true)
        let receivedContent = "";

        // prepare and submit our form

        const formData = new FormData();

        formData.append("file", file as File);
        formData.append('location', form.location);
        formData.append('size', form.size);
        formData.append('built', form.built);
        formData.append('description', form.description);
        formData.append("content", form.content)
        const messagesString = JSON.stringify(messages);
        formData.append("message", messagesString);

        const userMessageId = uuidv4();
        const systemMessageId = uuidv4();

        // Add user message to messages array
        const userMessage = { id: userMessageId, role: "user", content: form.content };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setMessage(prevMessages => [...prevMessages, userMessage]);

        setForm({
            ...form,
            content: ""
        })

        fetch("/api/classify", {

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
                                setChatLoader(false)
                                controller.close();
                                return;

                            }
                            // decode the current chunk and append to our response value

                            const decoded = new TextDecoder("utf-8").decode(value);

                            let trimmedResponse = decoded.trim().replace(/0:"/g, '').replace(/"/g, '').replace(/\\n/g, '');
                            setResponse((prev) => `${prev}${trimmedResponse}`);
                            setMessage(prevMessages => updateMessage(prevMessages, systemMessageId, trimmedResponse));
                            setMessages(prevMessages => updateMessage(prevMessages, systemMessageId, trimmedResponse));
                            return pump();

                        });

                    }

                },

            });

        });

    };



    return (
        <Modal opened={opened} size={"55rem"} onClose={() => {
            close()
        }} title="Get Information on a property" >

            <form onSubmit={onSubmit}>
                {/* the chosen property image */}
                {/* {
                    imagesrc && (
                        <Image className='object-cover w-full max-h-[307.2px] flex-shrink-0 rounded-md '
                            src={imagesrc}
                            height={1000} width={1000} alt='property image chosen' />
                    )
                } */}

                {/* input to get the property image  */}
                {/* <div className='mt-4 w-full my-2  flex flex-col space-y-1'>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Enter the Image of the Property you want a report on</Label>
                        <Input onChange={handleFileChange} className='w-full' id="picture" type="file" />
                    </div>
                </div> */}

                {/* the email of the user */}
                <div className='flex flex-col space-y-2'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Email</h1>
                    <Input name='email' type='email' onChange={handleChange}
                        value={form?.email} placeholder='Email' className='w-full text-[16px]' />
                </div>

                {/* house location */}
                <div className='flex flex-col space-y-2'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>location</h1>
                    <Textarea name='location' onChange={handleChange}
                        value={form?.location} placeholder='Suburbs' className='w-full text-[16px]' />
                </div>

                {/* the size of the house */}
                <div className='flex flex-col space-y-2'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Size</h1>
                    <Textarea name='size' onChange={handleChange}
                        value={form?.size} placeholder='The size of the property' className='w-full text-[16px]' />
                </div>

                <div className='flex flex-col space-y-2'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Built when</h1>
                    <Textarea name='built' onChange={handleChange}
                        value={form?.built} placeholder='1997' className='w-full text-[16px]' />
                </div>

                <div className='flex flex-col space-y-2'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Additional Property</h1>
                    <Textarea name='description' onChange={handleChange}
                        value={form?.description} placeholder='Any Additional Property' className='w-full text-[16px]' />
                </div>


                {/* <div className='w-[80%] py-2'>

                </div> */}
                <div>
                    {
                        message?.map((content: any) => (
                            <div className={content.role === "user" ? "flex justify-end my-5" : "flex justify-start my-5"} key={content?.id}>
                                <div className={`py-4 px-4 text-white ${content.role === "user" ? "bg-slate-500 max-w-[80%]" : "bg-slate-800 max-w-[80%]"} ${content.role === "user" ? "rounded-b-[6px] rounded-tl-[6px]" : "rounded-b-[6px] rounded-tr-[6px]"}`}>
                                    {
                                        content?.type === "image" ? (
                                            <div>
                                                <Image className='rounded-md max-h-[400px] object-cover' src={content?.src} alt='user property image' width={500} height={500} />
                                            </div>
                                        ) : (
                                            <div>
                                                {
                                                    content?.role === "system" && (
                                                        <BiMailSend onClick={() => {
                                                            setEmailMessage(content?.content)
                                                            openEmailOpen()
                                                        }} className='h-7 w-7 cursor-pointer text-[#3EB87F]' />
                                                    )
                                                }
                                                <h1> {content?.content}</h1>
                                            </div>


                                        )
                                    }

                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* the loading skeleton */}
                {
                    chatLoader && (
                        <div className="flex flex-col space-y-3 mt-7">
                            <Skeleton className="h-[50px] w-[80%] bg-ravinnabg rounded-xl" />
                        </div>
                    )
                }





                <div className='flex space-x-2 items-center'>
                    <Textarea value={form?.content} name="content" required onChange={handleChange} className='h-10 w-full my-5 text-[16px]' placeholder='Type any additional message in the chatbot' />
                    {/* add pictures to the chatbot */}
                    <div>
                        <Label htmlFor="pictures">
                            <FaImage className='h-7 w-7 cursor-pointer text-ravinnabg' />
                        </Label>
                        <Input onChange={handlePicChange} className='w-full hidden' id="pictures" type="file" />
                    </div>
                    <button disabled={chatLoader} type='submit' className='py-3 px-3 flex justify-center cursor-pointer text-white rounded-md bg-[#3EB87F]'>
                        {
                            chatLoader ? (
                                <BiLoaderAlt className='text-center animate-spin' />
                            ) : "Send"
                        }
                    </button>
                </div>

                {/* to select the pictures to be added to the chat bot */}
                <Modal closeOnClickOutside={false} opened={picOpen} onClose={() => {
                    setPicsrc("");
                    setCurrentPic(null)
                    closePicOpen();
                }} title="Choose Picture?">
                    {
                        picSrc != "" && (
                            <div className='px-4 flex flex-col space-y-4'>
                                <Image src={picSrc} className='w-full max-h-[400px] object-cover' alt='Confirm picture' width={500} height={500} />
                                <div className='flex justify-between items-center space-x-4'>
                                    <button onClick={() => {
                                        setPicsrc("")
                                        setCurrentPic(null)
                                        closePicOpen()
                                    }} type='submit' className='py-3 w-1/3 px-3 cursor-pointer text-white rounded-md bg-slate-700'>
                                        No
                                    </button>
                                    <button onClick={handleAddPic} type='submit' className='py-3 w-1/3 px-3 cursor-pointer text-white rounded-md bg-[#3EB87F]'>
                                        Yes
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </Modal>


                {/* Modal that opens to send an email */}


            </form>

            <Modal closeOnClickOutside={false} opened={emailOpen} onClose={() => {
                closeEmailOpen();
                setEmailMessage("")
                setEmailFailure(false)
                setEmailSuccess(false)
            }} title="Send Email?">

                <form onSubmit={(e: any) => {
                    e.preventDefault()
                    handleSendEmail(emailMessage, form?.email)
                }} className='px-4 flex flex-col space-y-4'>

                    {/* the email to send the message to  */}
                    <div className='flex flex-col space-y-2'>
                        <h1 className='text-[#808191] text-[14px] leading-[22px]'>Your Email</h1>
                        <Input name='email' type='email' required onChange={handleChange}
                            value={form?.email} placeholder='Email' className='w-full text-[16px]' />
                    </div>

                    {/* the message content */}
                    <div className='flex flex-col space-y-2'>
                        <h1 className='text-[#808191] text-[14px] leading-[22px]'>Your Report</h1>
                        <h1 className='text-[16px]'>
                            {emailMessage}
                        </h1>
                    </div>

                    {/* message sent successfully */}
                    {
                        emailSuccess && (
                            <div className='flex flex-col items-center space-y-2'>
                                <CiCircleCheck className='w-14 h-14 text-ravinnabg' />
                                <h1 className='text-ravinnabg font-semibold'>Email sent successfully!</h1>
                            </div>
                        )
                    }


                    {/* message sent failure */}
                    {
                        emailFailure && (
                            <div className='flex flex-col items-center space-y-2'>
                                <CgCloseO className='w-14 h-14 text-red-500' />
                                <h1 className='text-red-500 font-semibold'>Cannot send email report at the moment.</h1>
                            </div>
                        )
                    }


                    <div className='flex justify-between items-center space-x-4'>
                        <div onClick={() => {
                            closeEmailOpen()
                            setEmailMessage("")
                            setEmailFailure(false)
                            setEmailSuccess(false)
                        }} className='py-3 w-1/3 flex justify-center px-3 cursor-pointer text-white rounded-md bg-slate-700'>
                            {
                                emailSuccess || emailFailure ? "Close" : "No"
                            }
                        </div>
                        {
                            !emailSuccess && (
                                <button disabled={emailLoading} type='submit' className='py-3 flex justify-center w-1/3 px-3 cursor-pointer text-white rounded-md bg-[#3EB87F]'>
                                    {
                                        emailLoading ? (
                                            <BiLoaderAlt className='text-center animate-spin' />
                                        ) : "Send Email"
                                    }
                                </button>
                            )
                        }

                    </div>
                </form>

            </Modal>
            <div ref={messagesEndRef} />
        </Modal >
    )
}

export default ChatBot