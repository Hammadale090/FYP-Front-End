import React from 'react'
import FaqAccordion from './components/FaqAccordion'

type Props = {}

const FAQ = (props: Props) => {
    return (
        <div>
            <h1 className='text-[25px] font-bold text-[#11142D]'>FAQ</h1>
            <FaqAccordion header={"What the first step of the home buying process?"} innerText={"Most real estate agents will require a pre-approval before showing homes home buying process - this is especially true at the higher end of the real estate market; sellers of luxury homes will only allow pre-screened (and verified) buyers to view their homes."} />
            <FaqAccordion header={"What the second step of the home buying process?"} innerText={"If you are interested in a property, the next step is to reach out to property management by filling out a rental application - If you have a co-signer or plan on having roommates, they will also need to do the same. Essentially, every person planning to move in needs to fill out a separate lease application form."} />
            <FaqAccordion header={"What the third step of the home buying process?"} innerText={"After a rental application is completed, you can proceed with the tenant screening process, which typically include these steps - Run a tenant background check. Run a comprehensive credit report. Request pay stubs to verify employment and income. Call former landlords to verify rental history."} />
            <FaqAccordion header={"What the forth step of the home buying process?"} innerText={"Decide if you need roommates If you cant afford to rent an apartment without a roommate to share costs -  be sure the person or people you choose will mesh with your lifestyle. Typically, a roommate is added to the lease and must go through the rental application process and credit checks."} />
            <FaqAccordion header={"What the fifth step of the home buying process?"} innerText={"After a rental application is completed, you can proceed with the tenant screening process, which typically include these steps: Run a tenant background check. Run a comprehensive credit report. Request pay stubs to verify employment and income. Call former landlords to verify rental history."} />
            {/* <FaqAccordion header={"What the first step of the home buying process?"} innerText={"Most real estate agents will require a pre-approval before showing homes home buying process - this is especially true at the higher end of the real estate market; sellers of luxury homes will only allow pre-screened (and verified) buyers to view their homes."} /> */}
            
        </div>
    )
}

export default FAQ