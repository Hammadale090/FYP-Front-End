"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const ProfessionalNavbar = (props: Props) => {
  const router = useRouter();
  return (
    <section className="max-w-[1400px] mx-auto my-7 flex justify-between items-center">
      <div className="flex items-center space-x-4 md:space-x-20">
        {/* The logo */}
        <Image
          src={"/Dashboard/Logo.png"}
          alt="Logo"
          height={1000}
          width={1000}
          className="max-w-[60px] max-h-[45px] hidden md:inline-flex"
        />
        {/* the menubar for mobile view */}
        <Image
          src={"/Feed/Menu.svg"}
          alt="mobile view"
          height={500}
          width={500}
          className="md:hidden w-[18px] h-[14px]"
        />
      </div>

      <div className="flex space-x-7">
        <div className="hidden md:flex space-x-7 items-center ">
          <h1 className="cursor-pointer text-[16px] font-normal leading-[26px] text-[#3EB87F]">
            Home
          </h1>
          <h1 className="cursor-pointer text-[16px] font-normal leading-[26px] text-black">
            Property
          </h1>
          <h1 className="cursor-pointer text-[16px] font-normal leading-[26px] text-black">
            About
          </h1>
          <h1 className="cursor-pointer text-[16px] font-normal leading-[26px] text-black">
            Blog
          </h1>
          <div className="flex space-x-2 items-center">
            <h1 className="cursor-pointer text-[16px] font-normal leading-[26px] text-black">
              Pages
            </h1>
            <Image
              src={"/Dropdown.svg"}
              alt="Dropdown"
              height={500}
              width={500}
              className="w-[12px] h-[6px]"
            />
          </div>
        </div>

        {/* Sign in */}
        <div
          onClick={() => {
            router.push("/log-in");
          }}
          className="rounded-[8px] hover:scale-105 cursor-pointer border border-[#383838] px-[24px] py-[12px] text-[16px] font-semibold leading-[26px] text-[#34495D]"
        >
          Sign in
        </div>
      </div>
    </section>
  );
};

export default ProfessionalNavbar;
