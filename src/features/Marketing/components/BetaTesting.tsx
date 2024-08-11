import React from 'react'

type Props = {}

const BetaTesting = (props: Props) => {
    return (

        <section className='w-full bg-[#C3FFE3] h-full md:h-[300px] my-20 py-10 flex flex-col justify-center items-center px-[18px]'>
            <div className='max-w-[1200px] w-full  max-md:px-[5px] mx-auto flex max-md:flex-col max-md:space-y-2 md:justify-between items-center px-[18px]'>
                <div className='flex flex-col space-y-4 max-w-[622px]'>
                    <h1 className='text-[#34495D] text-[24px] md:text-[48px] font-bold leading-[31px] md:leading-[56px]'>Wanna up your game as Real Estate Professional?</h1>
                    <h1 className='text-[12px] md:text-[24px] leading-[23px] md:leading-[34px] font-medium text-[#34495D] '>Join the list of the very few  initial professionals to get the most of this Real Estate Revolution!</h1>

                </div>

                <div className='py-[13px] max-sm:mt-[32px] px-[20px] max-sm:w-full bg-[#3EB87F] flex flex-col justify-center items-center text-white text-[16px] md:text-[24px] font-semibold leading-[34px]'>
                    Sign Up for Beta Testing
                </div>
            </div>
        </section>
    )
}

export default BetaTesting