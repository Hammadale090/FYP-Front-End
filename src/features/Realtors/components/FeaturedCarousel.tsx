import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Image from 'next/image'

type Props = {}

const FeaturedCarousel = (props: Props) => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div>
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent className=''>
                    <div className='relative'>
                        <div className='absolute top-2 left-4'>
                            <div className='flex space-x-4 items-center'>
                                <div className='rounded-[4px] bg-[#F3F3F3] px-[10px] py-[4px] gap-[10px] text-[10px] font-medium leading-[16px]'>
                                    For Sale
                                </div>

                                <div className='rounded-[4px] bg-[#3EB87F] text-white px-[10px] py-[4px] gap-[10px] text-[10px] font-medium leading-[16px]'>
                                    Featured
                                </div>
                            </div>
                        </div>


                        <div className='absolute bottom-2 left-4'>
                            <div className='flex flex-col'>
                                <h1 className='text-[16px] leading-[26px] font-semibold text-white'>
                                    Eaton Garth Penthouse
                                </h1>

                                <h1 className='text-[16px] leading-[26px] font-semibold text-white'>
                                    <span className='font-extrabold leading-[24px]'>$7500</span> / month
                                </h1>
                            </div>
                        </div>


                        <Image alt='The images' width={1000} height={1000} className=' h-[210px] object-cover rounded-[8px]' src={"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D"} />
                    </div>




                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 flex justify-center space-x-4 my-2">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className={`w-3 ${current === index && "bg-green-500"} h-3 rounded-full border border-black`} />
                    ))

                }
            </div>
        </div>
    )
}

export default FeaturedCarousel