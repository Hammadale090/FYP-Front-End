"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Avatar, Input, rem } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import NavbarBell from "./NavbarBell";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutSvg, ProfileSvg, SettingsSvg } from "../svgs";
import { AuthContext } from "@/context/AuthContext";
import { BiLoaderAlt } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { ProfSettingsContext } from "@/context/ProfSettingsContext";

type Props = {};

const Navbar = (props: Props) => {
    const router = useRouter()
    const { profile, user, profilepic, userRole } = useContext(AuthContext)
    const { profDetails } = useContext(ProfSettingsContext)
    const SearchIcon = <CiSearch style={{ width: rem(16), height: rem(16) }} />;
    const [logOutLoader, setLogoutLoader] = useState(false)
    const pathname = usePathname();
    // console.log("this is the userRole", userRole)


    return (
        <section className='flex  justify-between mb-4  md:pl-[23px]'>
            <div className='flex items-center space-x-4 md:space-x-20'>
                {/* The logo */}
                <Image onClick={() => {
                    router.push("/dashboard")
                }} src={"/Dashboard/logo-1.png"} alt='Logo' height={1000} width={1000} className='max-w-[120px] max-h-[100px] cursor-pointer hidden md:inline-flex' />

                {/* the menubar for mobile view */}
                <Image src={"/Feed/Menu.svg"} alt='mobile view' height={500} width={500} className='md:hidden w-[18px] h-[14px]' />

                {/* the search icon on mobile view */}
                <CiSearch className='md:hidden' style={{ width: rem(16), height: rem(16) }} />
                {/* The search bar */}
                <Input className='w-[405px] h-[38px] hidden md:inline-flex' placeholder="Search Property, Customer etc" leftSection={SearchIcon} />
            </div>

            {/* the bell and user profile */}
            <div className='flex space-x-4 items-center px-2'>
                {/* the bell/notification icon */}
                <NavbarBell />


                <Popover>
                    <PopoverTrigger>
                        <div className='flex space-x-2 items-center'>
                            {/* the user profile image */}
                            {/* <Image src={profilepic ? profilepic : "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"} className='rounded-[31px] w-[40px] h-[40px]' height={500} width={500} alt='profile picture' /> */}
                            <Avatar className='rounded-[31px] w-[40px] h-[40px]' src={profilepic} alt="Profile Image" />
                            <div className=' flex-col hidden md:flex items-start'>
                                {/* the user name */}
                                <h1 className='font-semibold text-[14px] leading-[19.12px] text-[#11142D]'>
                                    {profDetails?.full_name ? profDetails?.full_name : profile?.attributes?.first_name || profile?.attributes?.last_name
                                        ? `${profile?.attributes?.first_name} ${profile?.attributes?.last_name}`
                                        : user?.data?.attributes?.username}
                                </h1>
                                {/* the user position */}

                                {
                                    (userRole === "realtor" || userRole === "broker") && (
                                        <h1 className='font-normal text-[14px] leading-[19.12px] text-[#808191]'>{profile?.attributes?.role?.charAt(0)?.toUpperCase() + profile?.attributes?.role?.slice(1) ?? "Company Manager"}</h1>
                                    )
                                }
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className='flex flex-col w-fit space-y-4'>
                        {/* edit profile button */}
                        {/* if user role is not a normal user, then they can edit their profile(realtor, broker and real estate lawyer) */}
                        {
                            userRole != "user" && (
                                <div onClick={() => {
                                    router.push(`${userRole === "broker" ? "/mortgage-broker/settings" : userRole === "realtor" ? "/realtor/settings" : "/realestate-lawyer/settings"}`)
                                }} className='flex space-x-3 px-3 items-center cursor-pointer'>
                                    <ProfileSvg green={(pathname === "/mortgage-broker/settings" || pathname === "/realtor/settings" || pathname === "/realestate-lawyer/settings")} />
                                    <h1 className={`text-[14px] font-semibold leading-[22px] ${(pathname === "/mortgage-broker/settings" || pathname === "/realtor/settings" || pathname === "/realestate-lawyer/settings") ? "text-[#3EB87F]" : "text-[#808191]"} `}>Edit Profile</h1>
                                </div>
                            )
                        }

                        {/* Settings button */}
                        <div onClick={() => {
                            router.push("/settings")
                        }} className='flex space-x-3 px-3 items-center cursor-pointer'>
                            <SettingsSvg green={pathname === "/settings"} />
                            <h1 className={`text-[14px] font-normal leading-[22px] ${pathname === "/settings" ? "text-[#3EB87F]" : "text-[#808191]"}`}>Settings</h1>
                        </div>
                        {/* The logout button */}
                        <div onClick={async () => {
                            setLogoutLoader(true)
                            await signOut()
                            // setLogoutLoader(false)
                        }} className='flex hover:scale-105 space-x-3 px-3 items-center cursor-pointer'>
                            <LogoutSvg />
                            {
                                logOutLoader ? <BiLoaderAlt className='text-center animate-spin' /> : <h1 className='text-[14px] font-normal leading-[22px] text-[#808191]'>Logout</h1>
                            }

                        </div>
                    </PopoverContent>
                </Popover>
      </div>
    </section>
  );
};

export default Navbar;
