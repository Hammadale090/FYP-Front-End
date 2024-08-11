'use client'
import React, { useState } from 'react';
import NeighborhoodHighlights from './NeighborhoodHighlights';
import { CiMap } from 'react-icons/ci';
import ShowOnMap from './ShowOnMap';

interface NeighborhoodTabsProps {
    address?: string;
}

const NeighborhoodTabs: React.FC<NeighborhoodTabsProps> = ({ address }) => {
    const [currentTab, setCurrentTab] = useState('school');
    const [opened, setOpened] = useState<boolean>(false)

    const handleTabClick = (tab: string) => {
        setCurrentTab(tab);
    };

    return (
        <div className='w-full flex flex-col'>

            <div className="flex justify-between items-center mt-6 cursor-pointer">
                <h1 className="text-[18px] text-[#0B0C0E] font-semibold leading-[20px] mt-8 mb-4">
                    Neighborhood Highlights
                </h1>

                <div className="flex items-center justify-center px-[6px] py-[4px] rounded-[6px] font-normal text-white bg-[#3EB87F] border border-white h-12 md:w-48" onClick={() => setOpened(true)}>
                    <CiMap className="mr-2 text-[24px]" />{" "}
                    <p className="hidden md:block">View on Map</p>
                </div>
            </div>

            <div className='w-full flex items-center justify-between'>
                {/* Tab navigation */}
                {[
                    { title: "School Name", value: 'school' },
                    { title: "Famous Hotel", value: 'hotel' },
                    { title: "Amusement Park", value: 'park' },
                    { title: "Airport", value: 'airport' },
                    { title: "Famous Restaurant", value: 'restaurant' },
                    { title: "Shopping Mall", value: 'shopping mall' },
                ].map((tab, index) => (
                    <div
                        key={index}
                        className={`flex flex-row justify-between items-center mt-4 cursor-pointer`}
                        onClick={() => handleTabClick(tab.value)}
                    >
                        <h1 className={`${currentTab === tab.value ? 'text-[#3EB87F]' : 'text-[#34495D]'} ${currentTab === tab.value ? 'border-b-2	' : 'border-0'} border-[#3EB87F] text-[14px] font-[600] leading-[18px] tracking-[0.5px]`}>{tab.title}</h1>
                    </div>
                ))}
            </div>
            {/* Render the selected tab content */}
            <NeighborhoodHighlights address={address} selectedTab={currentTab} />

            <ShowOnMap opened={opened} close={() => setOpened(false)} address={address} />


        </div>
    );
};

export default NeighborhoodTabs;
