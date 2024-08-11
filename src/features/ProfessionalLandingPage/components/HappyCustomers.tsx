import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type Props = {};

const HappyCustomers = (props: Props) => {
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
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 relative ">
            <div className="w-[370px] px-7 flex flex-col space-y-7 items-center h-[370px] justify-center border border-[#D3F0FC] bg-white pt-10">
              <h1 className="text-[#34495D] text-[16px] font-normal leading-[26px] text-center">
                “With all the stress and drama that you face in every-day life,
                you want to make sure that your vacation is going to be nice and
                smooth, and simply perfect for a rest. With this site I was able
                to find exactly what was necessary. We had an amazing time at
                one of the villas in Mexico. Thank you!”
              </h1>
              <h1 className="text-[#383838] text-[24px] font-semibold leading-[34px]">
                Ryan Wisley
              </h1>
            </div>

            <Image
              src={"/Dashboard/Realtors.svg"}
              className="w-[118px] h-[108px] object-cover absolute top-0 -mt-16 left-[138px] z-20"
              alt="picture"
              width={1000}
              height={1000}
            />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 relative">
            <div className="w-[370px] px-7 flex flex-col space-y-7 items-center h-[370px] justify-center bg-[#C3FFE3] pt-10">
              <h1 className="text-[#34495D] text-[16px] font-normal leading-[26px] text-center">
                “This was the best experience for us as a young couple! We would definitely recommend these guys to all of our friends and family, because the service is great, the prices are fine and the selection is simply amazing! The trip was arranged within days, and we had the best time ever! Come back soon!”

              </h1>
              <h1 className="text-[#383838] text-[24px] font-semibold leading-[34px]">
                Andrew and Lisa

              </h1>
            </div>

            <Image
              src={"/Landing/Woman2.png"}
              className="w-[118px] h-[108px] object-cover absolute top-0 -mt-16 left-[138px] z-50"
              alt="picture"
              width={1000}
              height={1000}
            />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 relative">
            <div className="w-[370px] px-7 flex flex-col space-y-7 items-center h-[370px] justify-center border border-[#D3F0FC] bg-white pt-10">
              <h1 className="text-[#34495D] text-[16px] font-normal leading-[26px] text-center">
                “What a lovely villa we have rented recently! It’s perfect for summer family trips, and our family is big! Travelling with comfort means a lot, and we sure appreciate the service that was provided to all of our family members! Thank you for everything, and good luck there!”

              </h1>
              <h1 className="text-[#383838] text-[24px] font-semibold leading-[34px]">
                The Walsh Family

              </h1>
            </div>
            <Image
              src={"/Landing/Man2.png"}
              className="w-[118px] h-[108px] object-cover absolute top-0 -mt-16 left-[138px] z-20"
              alt="picture"
              width={1000}
              height={1000}
            />
          </CarouselItem>

          <CarouselItem className="md:basis-1/2 lg:basis-1/3 relative">
            <div className="w-[370px] px-7 flex flex-col space-y-7 items-center h-[370px] justify-center bg-[#C3FFE3] pt-10">
              <h1 className="text-[#34495D] text-[16px] font-normal leading-[26px] text-center">
                “This was the best experience for us as a young couple! We would definitely recommend these guys to all of our friends and family, because the service is great, the prices are fine and the selection is simply amazing! The trip was arranged within days, and we had the best time ever! Come back soon!”

              </h1>
              <h1 className="text-[#383838] text-[24px] font-semibold leading-[34px]">
                Andrew and Lisa

              </h1>
            </div>

            <Image
              src={"/Landing/Woman2.png"}
              className="w-[118px] h-[108px] object-cover absolute top-0 -mt-16 left-[138px] z-50"
              alt="picture"
              width={1000}
              height={1000}
            />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 relative">
            <div className="w-[370px] px-7 flex flex-col space-y-7 items-center h-[370px] justify-center border border-[#D3F0FC] bg-white pt-10">
              <h1 className="text-[#34495D] text-[16px] font-normal leading-[26px] text-center">
                “What a lovely villa we have rented recently! It’s perfect for summer family trips, and our family is big! Travelling with comfort means a lot, and we sure appreciate the service that was provided to all of our family members! Thank you for everything, and good luck there!”

              </h1>
              <h1 className="text-[#383838] text-[24px] font-semibold leading-[34px]">
                The Walsh Family

              </h1>
            </div>
            <Image
              src={"/Landing/Man2.png"}
              className="w-[118px] h-[108px] object-cover absolute top-0 -mt-16 left-[138px] z-20"
              alt="picture"
              width={1000}
              height={1000}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="max-md:hidden" />
        <CarouselNext className="max-md:hidden" />
      </Carousel>
    </section>
  );
};

export default HappyCustomers;
