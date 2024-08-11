import Image from 'next/image'
import React from 'react'
import OverviewCard from './OverviewCard'
import MortgageCalculator from './MortgageCalculator'
import MortgageAdditionalDetails from './MortgageAdditionalDetails'
import MortgageFeatures from './MortgageFeatures'
import MortgageRatingsAndReviews from './MortgageRatingsAndReviews'
import MortgageSubHeadings from './MortgageSubHeadings'
import MortgageDynamicWeather from './MortgageDynamicWeather'
import UserGeneratedContent from './UserGeneratedContent'
import MortgageLocation from './MortgageLocation'
import MortgageNeighborhoodHighlights from './MortgageNeighborhoodHighlights'

type Props = {}

const MortgageLeftSection = (props: Props) => {

    const videoId = 'gMxhaNdEZ4Q'; // Replace with your video ID
    const iframeUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div>

            {/* the large image section */}
            <div className='relative'>
                <Image src={"/Feed/Rectangle.jpg"} className='max-w-full' alt='left image section' width={1000} height={1000} />

                {/* the for sale badge */}
                <div className='w-[110px] absolute top-10 right-0 rounded-tl-[8px] rounded-bl-[8px] bg-[#383838] h-[41px] border border-white flex flex-col justify-center items-center text-white '>
                    For Sale
                </div>

                <Image src={"/Feed/VideoCircle.svg"} className='w-[75px] h-[75px] absolute bottom-3 left-6' alt='Feed Video Circle' width={1000} height={1000} />
            </div>

            {/* The pictures */}
            <div className='flex flex-wrap justify-between items-center mt-7'>
                <Image src={"/Mortgage/Image1.jpg"} alt='image1' className='max-w-[116px] my-2 max-h-[80px] rounded-[4px]' height={500} width={500} />
                <Image src={"/Mortgage/Image2.jpg"} alt='image1' className='max-w-[116px] my-2 max-h-[80px] rounded-[4px]' height={500} width={500} />
                <Image src={"/Mortgage/Image3.jpg"} alt='image1' className='max-w-[116px] my-2 max-h-[80px] rounded-[4px]' height={500} width={500} />
                <Image src={"/Mortgage/Image4.jpg"} alt='image1' className='max-w-[116px] my-2 max-h-[80px] rounded-[4px]' height={500} width={500} />
                <Image src={"/Mortgage/Image5.jpg"} alt='image1' className='max-w-[116px] my-2 max-h-[80px] rounded-[4px]' height={500} width={500} />
                <Image src={"/Mortgage/Image6.jpg"} alt='image1' className='max-w-[116px] my-2 max-h-[80px] rounded-[4px]' height={500} width={500} />
            </div>

            {/* safety ratings and rating */}
            <div className='flex flex-col space-y-4 my-4'>
                <h1 className='text-[24px] font-semibold leading-[34px] text-[#0B0C0E]'>Safety Ratings:</h1>
                <div className='flex items-center space-x-4'>
                    <Image src={"/Mortgage/Star.svg"} alt='star' width={500} height={500} className='w-[28px] h-[28px]' />
                    <h1 className='text-[36px] font-medium leading-[22px] text-black'>4.8</h1>
                </div>
            </div>


            {/* overview */}
            <div className='flex flex-col space-y-4 mt-10'>
                <h1 className='text-[24px] font-semibold leading-[34px]'>Overview</h1>

                <div className='grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3'>
                    <OverviewCard header='ID' propNumber='2287' image={{ altText: "home", url: "/Mortgage/HomeFilled.png" }} />
                    <OverviewCard header='Type' propNumber='2287' image={{ altText: "type", url: "/Mortgage/Type.svg" }} />
                    <OverviewCard header='Bedrooms' propNumber='2287' image={{ altText: "Bedroom image", url: "/Mortgage/Bed.svg" }} />
                    <OverviewCard header='Bathrooms' propNumber='2287' image={{ altText: "Bathroom image", url: "/Mortgage/Bath.png" }} />
                    <OverviewCard header='Garages' propNumber='2287' image={{ altText: "Garages Image", url: "/Mortgage/Garage.svg" }} />
                    <OverviewCard header='Size' propNumber='2287' image={{ altText: "Size Image", url: "/Mortgage/Size.svg" }} />
                    <OverviewCard header='Land Size' propNumber='2287' image={{ altText: "type", url: "/Mortgage/LandSize.svg" }} />
                    <OverviewCard header='Year Build' propNumber='2287' image={{ altText: "YearBuild", url: "/Mortgage/YearBuild.svg" }} />
                </div>
            </div>

            {/* the description */}
            <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Description</h1>
            <h1 className='text-[#383838] text-[16px] font-normal leading-[26px]'>Centrally situated in Mineola, New York, Eagle Rock Apartments at Mineola places you within walking distance of parks, restaurants, and Mineola Station. Our inviting community offers a welcome retreat with newly updated studio, one, and two bedroom apartments to choose from. Come home to desirable features like modern kitchens, hardwood flooring and manicured landscapes. Onsite management is available to assist you and our maintenance team will provide you with peace of mind. All of this and more awaits you at our attractive Long Island community.</h1>


            {/* mortgage Calculator */}
            <MortgageCalculator />

            {/* Additional Details and address */}
            <MortgageAdditionalDetails />


            {/*  The features*/}
            <MortgageFeatures />

            {/* Ratings and Reviews */}
            <MortgageRatingsAndReviews />

            {/* Real time Energy Efficiency Metrics */}
            <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Real-Time Energy Efficiency Metrics</h1>
            <MortgageSubHeadings subHead='Energy Consumption' amount='Dummy Text' divider width='w-[100%]' />
            <MortgageSubHeadings subHead='Solar Panel Output' amount='Dummy Text' divider width='w-[100%]' />
            <MortgageSubHeadings subHead='Environmental Impact' amount='Dummy Text' divider width='w-[100%]' />

            {/* Dynamic weather */}
            <MortgageDynamicWeather />

            {/* user generated Content Showcase */}
            <UserGeneratedContent />


            {/* smart furniture placement suggestions */}
            <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Smart Furniture Placement Suggestions</h1>
            <Image src={"/Mortgage/Suggestion.png"} alt='suggestion' className='w-full max-h-[437px] object-cover' width={500} height={500} />

            {/* Video of the property */}
            <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Video</h1>
            <iframe

                height="437"
                src={iframeUrl}
                className='w-full'
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>


            {/* the location */}
            <MortgageLocation />

            {/* Neigborhood Highlights */}
            <MortgageNeighborhoodHighlights />
        </div>
    )
}

export default MortgageLeftSection