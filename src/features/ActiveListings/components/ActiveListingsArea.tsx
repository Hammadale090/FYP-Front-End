import FeedPropertyCard from '@/features/Feed/components/FeedPropertyCard'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import React from 'react'

type Props = {}

const ActiveListingsArea = (props: Props) => {
    return (
        <div>
            <div className='flex flex-wrap justify-center md:justify-start md:ml-7' >
                <FeedPropertyCard />
                <FeedPropertyCard />
                <FeedPropertyCard />
                <FeedPropertyCard />
                <FeedPropertyCard />
                <FeedPropertyCard />
                <FeedPropertyCard />
                <FeedPropertyCard />
            </div >

            {/* the pagination */}
            <div className='flex justify-center' >
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className='border' href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div >
        </div>
    )
}

export default ActiveListingsArea