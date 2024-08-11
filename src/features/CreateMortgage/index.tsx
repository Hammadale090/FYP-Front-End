import React from 'react'
import CreateMortgageHeader from './components/CreateMortgageHeader'
import MortgageLeftSection from './components/MortgageLeftSection'
import MortgageRightSection from './components/MortgageRightSection'

type Props = {}

const CreateMortgage = (props: Props) => {
    return (
        <div className='px-3'>
            <CreateMortgageHeader />

            <div className='w-full flex flex-col md:flex-row md:space-x-3 mt-10'>
                <div className='md:w-[70%]'>
                    <MortgageLeftSection />
                </div>

                <div className='md:w-[30%]'>
                    <MortgageRightSection />
                </div>
            </div>
        </div>
    )
}

export default CreateMortgage