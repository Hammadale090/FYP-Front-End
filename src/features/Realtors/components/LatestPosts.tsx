import React from 'react'
import LatestPostCard from './LatestPostCard'
import { Divider } from '@mantine/core'

type Props = {}

const LatestPosts = (props: Props) => {
    return (

        < div className='w-full md:w-[370px] rounded-[8px] border border-[#CDCDCD] bg-white px-4 my-7' >
            <h1 className='text-[24px] text-[#0B0C0E] font-semibold leading-[34px] my-7'>Latest Posts</h1>
            <LatestPostCard PostImage='https://images.unsplash.com/photo-1575300807981-65abff0d63d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9zdHN8ZW58MHx8MHx8fDA%3D' date='Oct 27,2022' header='Here’s what people are saying about Rentals' />
            <Divider my="sm" />
            <LatestPostCard PostImage='https://images.unsplash.com/photo-1575300807981-65abff0d63d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9zdHN8ZW58MHx8MHx8fDA%3D' date='Oct 27,2022' header='Here’s what people are saying about Rentals' />
            <Divider my="sm" />
            <LatestPostCard PostImage='https://images.unsplash.com/photo-1575300807981-65abff0d63d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9zdHN8ZW58MHx8MHx8fDA%3D' date='Oct 27,2022' header='Here’s what people are saying about Rentals' />

        </ div>
    )
}

export default LatestPosts