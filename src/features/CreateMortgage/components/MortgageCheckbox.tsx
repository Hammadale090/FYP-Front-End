import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"

type Props = {
    text: String;
    classN?: String;
    checkBoxStyles?: String
}

const MortgageCheckBox = ({ text, classN, checkBoxStyles }: Props) => {
    return (
        <div className={`flex items-center w-[80%] space-x-4 ${checkBoxStyles}`}>
            <Checkbox id="terms" />
            <label
                htmlFor="terms"
                className={` ${classN ? classN : "text-[14px] font-normal leading-[24px] text-[#34495D]"}`}
            >
                {text}
            </label>
        </div>
    )
}

export default MortgageCheckBox