"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const ProfessionalNavbar = (props: Props) => {
  const router = useRouter();
  return (
    <section className="max-w-[1400px] mx-auto my-7 flex justify-between items-center">
      <div className="flex items-center space-x-4 md:space-x-20">
        {/* The logo */}
        <Image
          src={"/Dashboard/logo-1.png"}
          alt="Logo"
          height={1000}
          width={1000}
          className="max-w-[120px] max-h-[100px] hidden md:inline-flex"
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
        {/* <div className="hidden md:flex space-x-7 items-center ">
          <Link href='/' className="cursor-pointer text-[16px] font-normal leading-[26px] text-[#3EB87F]">
            Home
          </Link>
          <Link href='/dashboard/property' className="cursor-pointer text-[16px] font-normal leading-[26px] text-black">
            Property
          </Link>
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
        </div> */}

        {/* Sign in */}
        <p className="text-xl font-bold text-gray-800 text-end my-2">Residence Relam</p>
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
