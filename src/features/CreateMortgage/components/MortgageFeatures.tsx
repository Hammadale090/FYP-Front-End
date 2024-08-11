import React from 'react'
import MortgageCheckBox from './MortgageCheckbox'

type Props = {}

const MortgageFeatures = (props: Props) => {
    return (
        <div>
            <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Features</h1>

            {/* the features */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                <MortgageCheckBox text={"Air Conditioning"} />
                <MortgageCheckBox text={"Gym"} />
                <MortgageCheckBox text={"Tv Cable"} />
                <MortgageCheckBox text={"Barbeque"} />
                <MortgageCheckBox text={"Laundry"} />
                <MortgageCheckBox text={"Washer"} />
                <MortgageCheckBox text={"Window Coverings"} />
                <MortgageCheckBox text={"WiFi"} />
                <MortgageCheckBox text={"Swimming Pool"} />
            </div>
        </div>
    )
}

export default MortgageFeatures