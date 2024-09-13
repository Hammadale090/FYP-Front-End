"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GrClose } from "react-icons/gr";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close

    // Function to toggle sidebar state
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <section className="max-w-[1400px] mx-auto my-7 flex justify-between items-center px-[18px]">
            <div className="flex items-center space-x-4 md:space-x-20">
                {/* The logo */}
                <Image
                    src={"/Dashboard/logo-1.png"}
                    alt="Logo"
                    height={1000}
                    width={1000}
                    className="max-w-[60px] max-h-[45px]"
                />
                {/* the menubar for mobile view
        <Image
          src={"/Feed/Menu.svg"}
          alt="mobile view"
          height={500}
          width={500}
          className="md:hidden w-[18px] h-[14px]"
        /> */}
            </div>

            <div className="flex space-x-[60px]">
                <div className="hidden md:flex space-x-[34px] items-center ">
                    <Link href='/' className="cursor-pointer text-[16px] font-normal leading-[26px] text-[#3EB87F]">
                        Home
                    </Link>
                    <Link href='' className="cursor-pointer text-[16px] font-normal leading-[26px] text-black">
                        Property
                    </Link>
                    <Link href={''} className="cursor-pointer text-[16px] font-normal leading-[26px] text-black">
                        About
                    </Link>
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

                <Image
                    onClick={toggleSidebar}
                    src={"/Landing/Vector.png"}
                    alt="mobile view"
                    height={500}
                    width={500}
                    className="md:hidden w-[24px] h-[16px] "
                />



                {/* Sign in */}
                <div
                    onClick={() => {
                        router.push("/log-in");
                    }}
                    className="rounded-[8px] hidden md:inline-flex hover:scale-105 cursor-pointer border border-[#383838] px-[24px] py-[12px] text-[16px] font-semibold leading-[26px] text-[#34495D]"
                >
                    Sign in
                </div>


                {/* for mobile view */}
                {isSidebarOpen && (
                    <div style={{ zIndex: 2000 }} className="md:hidden fixed inset-0  bg-opacity-50">
                        <div className="max-w-[280px] px-[18px] w-full shadow-md border rounded-tl-[30px] bg-white h-full fixed top-0 right-0 overflow-y-auto">
                            <div className="w-full flex justify-end">
                                <GrClose onClick={toggleSidebar} className="w-7 h-7 my-5" />
                            </div>

                            {/* Sidebar content goes here */}
                            <ul className="py-10">
                                <li className="text-[16px] text-black cursor-pointer py-2 px-4">
                                    Home
                                </li>
                                <li className="text-[16px] text-black cursor-pointer py-2 px-4">
                                    Property
                                </li>
                                <li className="text-[16px] text-black cursor-pointer py-2 px-4">
                                    About
                                </li>
                                <li className="text-[16px] text-black cursor-pointer py-2 px-4">
                                    Blog
                                </li>
                            </ul>

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

                            <div
                                onClick={() => {
                                    router.push("/log-in");
                                }}
                                className="rounded-[8px] w-fit mt-2  hover:scale-105 cursor-pointer border border-[#383838] px-[24px] py-[12px] text-[16px] font-semibold leading-[26px] text-[#34495D]"
                            >
                                Sign in
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Navbar;
