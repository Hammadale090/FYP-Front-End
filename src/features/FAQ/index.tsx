import React from 'react'
import FaqAccordion from './components/FaqAccordion'

type Props = {}

const FAQ = (props: Props) => {
    return (
        <div>
            <h1 className='text-[25px] font-bold text-[#11142D]'>FAQ</h1>
            <FaqAccordion header={"What the first step of the home buying process?"} innerText={"Most real estate agents will require a pre-approval before showing homes home buying process - this is especially true at the higher end of the real estate market; sellers of luxury homes will only allow pre-screened (and verified) buyers to view their homes."} />
             
            
        </div>

        
    )
    return (
        <div>
           <h1 className='text-[25px] font-bold text-[#11142D]'>FAQ</h1>
            <FaqAccordion header={"What the first step of the home buying process?"} innerText={"Most real estate agents will require a pre-approval before showing homes home buying process - this is especially true at the higher end of the real estate market; sellers of luxury homes will only allow pre-screened (and verified) buyers to view their homes."} />
             
        </div>
    )
    
}

export default FAQ