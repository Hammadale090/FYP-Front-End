import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Props = {
}

const PreferencesRadioBox = (props: Props) => {
    return (
        <RadioGroup className='flex max-md:flex-col md:space-x-8 my-2' >
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label className='text-[16px] font-normal leading-[22px] text-[#34495D]' htmlFor="r1">All Warranties</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem checked value="comfortable" id="r2" />
                <Label className='text-[#3EB87F] text-[16px] font-normal leading-[22px]' htmlFor="r2">Home Warranty Available</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label className='text-[16px] font-normal leading-[22px] text-[#34495D]' htmlFor="r3">Home Warranty Unavailable</Label>
            </div>
        </RadioGroup>
    )
}

export default PreferencesRadioBox