import Image from 'next/image'
import React from 'react'

type Props = {}

type Weather = {
    green?: boolean;
    topText: string;
    downText: string;
    imageUrl: string;
}

const WeatherCard = ({ green, topText, downText, imageUrl }: Weather) => {

    return (
        <div className={` flex flex-col mr-2 my-2 w-fit h-[155px] justify-between py-[13px] px-[14px] ${green ? "bg-[#3EB87F] rounded-[20px] text-white" : "text-ravinna border border-black rounded-[14px]"} `}>
            <h1 className=' text-[18px] '>{topText}</h1>
            <Image src={imageUrl} className='w-[43px] h-[70px]' alt='weather icon' width={500} height={500} />
            <h1 className=' text-[18px] '>{downText}</h1>
        </div>
    )
}

const MortgageDynamicWeather = (props: Props) => {
    return (
        <div>
            <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Dymamic Weather</h1>

            <div className='flex flex-col md:flex-row space-x-10 h-full items-center'>

                {/* the weather in degree */}
                <div className='flex flex-col h-full items-center'>
                    <Image src={"/Mortgage/Cloud.png"} className='max-w-[284px] max-h-[195px]' width={500} height={500} alt='cloudy' />
                    <h1 className='text-ravinna text-[64px] font-semibold'>28º</h1>
                    <h1 className='text-[18px] font-normal text-center text-ravinna max-w-[147px]'>Precipitations Max.: 31º Min.: 25º</h1>
                </div>

                {/* the details */}
                <div className='flex flex-col space-y-10  justify-between '>
                    <div className='flex justify-between'>
                        <div className='flex space-x-1 items-center'>
                            <Image src={"/Mortgage/Rain.svg"} className='max-w-[24px] max-h-[24px]' width={500} height={500} alt='cloudy' />
                            <h1 className='text-ravinna text-[14px] font-semibold'>6%</h1>
                        </div>

                        <div className='flex space-x-1 items-center'>
                            <Image src={"/Mortgage/Humidity.svg"} className='max-w-[24px] max-h-[24px]' width={500} height={500} alt='cloudy' />
                            <h1 className='text-ravinna text-[14px] font-semibold'>90%</h1>
                        </div>

                        <div className='flex space-x-1 items-center'>
                            <Image src={"/Mortgage/Wind.svg"} className='max-w-[24px] max-h-[24px]' width={500} height={500} alt='cloudy' />
                            <h1 className='text-ravinna text-[14px] font-semibold'>19 km/h</h1>
                        </div>
                    </div>


                    <div className='flex flex-col space-y-3'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-ravinna text-[20px] font-semibold '>Today</h1>
                            <h1 className='text-ravinna text-[18px] '>Mar, 9</h1>
                        </div>

                        <div className='flex flex-wrap '>
                            <WeatherCard downText='15.00' topText='29°C' imageUrl='/Mortgage/Sun.svg' />
                            <WeatherCard downText='15.00' topText='29°C' imageUrl='/Mortgage/Sun.svg' />
                            <WeatherCard downText='17.00' topText='29°C' green imageUrl='/Mortgage/Cloud.svg' />
                            <WeatherCard downText='18.00' topText='23°C' imageUrl='/Mortgage/Peak.svg' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MortgageDynamicWeather