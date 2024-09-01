"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useGetTestimonials } from "@/hooks/useGetTestimonials";

type Props = {};

const HappyCustomers = (props: Props) => {
  const { data, loading } = useGetTestimonials()

  return (
    <section className="max-w-[1400px] mx-auto my-20">
      <h1 className="text-[#34495D] text-[26px] md:text-[48px] font-bold leading-[56px] text-center mb-20">
        Happy Customers about us
      </h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full z-20 "
      >
        <CarouselContent className="z-20 py-20">

          {
            data?.map((dat: any) => (
              <CarouselItem key={dat?.id} className="md:basis-1/2 lg:basis-1/3 relative ">
                <div className="w-[370px] px-7 flex flex-col space-y-7 items-center h-[370px] justify-center border border-[#D3F0FC] bg-white pt-10">
                  <h1 className="text-[#34495D] text-[16px] font-normal leading-[26px] text-center">
                    “{dat?.attributes?.body}”
                  </h1>
                  <h1 className="text-[#383838] text-[24px] font-semibold leading-[34px]">
                    {dat?.attributes?.name}
                  </h1>
                </div>

                <Image
                  src={dat?.attributes?.image?.data?.attributes?.url}
                  className="w-[118px] h-[108px] object-cover absolute top-0 -mt-16 left-[138px] z-20"
                  alt="picture"
                  width={1000}
                  height={1000}
                />
              </CarouselItem>
            ))
          }


        </CarouselContent>
        <CarouselPrevious className="max-md:hidden max-2xl:ml-10" />
        <CarouselNext className="max-md:hidden max-2xl:mr-10" />
      </Carousel>
    </section>
  );
};

export default HappyCustomers;
