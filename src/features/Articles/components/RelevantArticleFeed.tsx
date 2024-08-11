import React from 'react'
import RelevantCard from './RelevantCard'

type Props = {}

const RelevantArticleFeed = (props: Props) => {
    return (
        <div>
            <div className='flex flex-wrap  my-10'>
                <RelevantCard />
                <RelevantCard />
                <RelevantCard />
                <RelevantCard />
            </div>
            {/* load more */}
            <div className='flex justify-center'>
                <div className='rounded-[6px] w-fit cursor-pointer bg-[#3EB87F] px-[35px] text-white py-[15px] gap-[10px] text-[18px] font-bold leading-[28px] '>
                    Load More
                </div>
            </div>

        </div>

    )
}

export default RelevantArticleFeed