"use client";
import PreferenceChatBoxInputText from '@/features/PreferenceChatbot/components/PreferenceChatBoxInputText'
import PreferenceSugestionButton from '@/features/PreferenceChatbot/components/PreferenceSugestionButton'
import React, { useState } from 'react'
import GenerateAssetButton from './GenerateAssetButton'
import { OpenAI } from "openai";
import Image from 'next/image'
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { fetcher } from '@/lib/fetchers';

type Props = {
}

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
    dangerouslyAllowBrowser: true,
});

const GenerateAssetsArea = (props: Props) => {
    const [prompt, setPrompt] = useState<string>("")
    const [storedPrompt, setStoredPrompt] = useState<string>('')
    const [loader, setLoader] = useState<boolean>(false)
    const [opened, { open, close }] = useDisclosure(false);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [chosenImage, setChosenImage] = useState("")
    const [response, setResponse] = useState([])

    const handleChange = (e: any) => {
        setPrompt(e.target.value)
    }

    const openPreview = () => {
        setPreviewOpen(true)
    }

    const closePreview = () => {
        setPreviewOpen(false)
    }

    const generateAssets = async (e: any) => {
        if (prompt?.trim() === "") {
            return
        }
        setStoredPrompt(prompt)
        setResponse([])
        setLoader(true)
        e.preventDefault();
        let chosen = [0, 1, 2, 3]
        const promises = chosen?.map(async (choose) => {
            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                quality: "hd",
                response_format: "url",
                size: "1024x1024",
            });

            if (response?.data) {
                setResponse(prevMessages => [...prevMessages, response?.data[0]?.url])
            }
        })
        await Promise.all(promises);
        setPrompt("")
        setLoader(false)

    }



    const handleDownload = async () => {
        const response = await fetcher(chosenImage);
        console.log("the response", response)
        const blob: any = await response.blob();
        const urll = new URL(URL.createObjectURL(blob));

        const a: any = document.createElement("a");
        a.href = urll;
        a.download = "assets.jpg";
        document.body.appendChild(a);

        a.click();
        document.body.removeChild(a);
    };

    const handleDownloadAll = async () => {
        response?.map(async (res: string) => {
            const response = await fetch(res);
            const blob: any = await response.blob();
            const urll = new URL(URL.createObjectURL(blob));

            const a: any = document.createElement("a");
            a.href = urll;
            a.download = "assets.jpg";
            document.body.appendChild(a);

            a.click();
            document.body.removeChild(a);
        })
    }

    const decodebase64 = (bs4json: any) => {
        const decodedImageData = window.atob(bs4json);
        return decodedImageData
    }


    return (
        <div className='w-[100%] md:w-[90%] relative h-full rounded-[12px] border border-[#D9D9D9] py-7 px-10'>
            <h1 className='text-[16px] font-medium leading-[20px] text-black'>
                Tell me what you want me to do!
            </h1>

            {/* the question suggestions */}
            <div className='flex flex-wrap mt-5'>
                <PreferenceSugestionButton text='What are your overall marketing goals?' />
                <PreferenceSugestionButton text='Do you have any existing brand guidelines or creative assets?' />
                <PreferenceSugestionButton text='Are you looking to increase brand awareness, generate leads, drive sales, or something else?' />
                <PreferenceSugestionButton text='Are you active on social media, email marketing, search engine optimization (SEO), pay-per-click (PPC) advertising, etc.?' />
                <PreferenceSugestionButton text='What is your target audience? Who are you trying to reach with your campaigns? The more specific you can be, the better.' />
                <PreferenceSugestionButton text='What channels are you currently using?' active />
            </div>

            {/* the assets generated */}
            <div className='flex flex-wrap justify-center'>
                {
                    response?.map((res: string) => (
                        <Image onClick={() => {
                            setChosenImage(res);
                            open();
                        }} key={res} src={res} alt='Generated Image' className='w-[214px] h-[214px] cursor-pointer hover:scale-105 rounded-[6px] mr-4 my-2' height={600} width={600} />
                    ))
                }
            </div>


            {/* the regenerate, modify prompt, preview */}
            {
                response?.length > 0 && (
                    <div className='flex space-x-3 items-center my-2'>
                        <GenerateAssetButton onClick={(e) => {
                            setPrompt(storedPrompt);
                            generateAssets(e)
                        }} text='Regenerate' />
                        <GenerateAssetButton onClick={() => {
                            setPrompt(storedPrompt)
                        }} text='Modify Prompt' />
                        <GenerateAssetButton onClick={() => {
                            openPreview()
                        }} text='Preview' />
                    </div>
                )
            }


            {/*  send message input field */}
            <div className=' '>
                <PreferenceChatBoxInputText loader={loader} generateAssets={generateAssets} handleChange={handleChange} prompt={prompt} />
            </div>

            <Modal opened={opened} size={"55rem"} onClose={() => {
                close()
                setChosenImage("")
            }} title={`Your Generated Asset`} >
                {/* <PreferenceSugestionButton onClick={handleDownload} text='Download Asset' active /> */}
                <Image src={chosenImage} className='w-full h-full' alt='Ai Generated Image' width={500} height={500} />
            </Modal>


            <Modal opened={previewOpen} size={"55rem"} onClose={() => {
                closePreview()
            }} title={`Your Generated Asset Preview`} >
                {/* <PreferenceSugestionButton onClick={handleDownloadAll} text='Download all' active /> */}
                {
                    response?.map((res: string) => (
                        <Image key={res} src={res} className='w-full h-full' alt='Ai Generated Image' width={500} height={500} />
                    ))
                }

            </Modal>


        </div>
    )
}

export default GenerateAssetsArea