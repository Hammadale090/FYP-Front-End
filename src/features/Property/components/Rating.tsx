import { useGetReviews } from '@/hooks/useGetReviews'
import React, { useMemo } from 'react'
import { FaStar } from 'react-icons/fa6'

type Props = {
    slug?: string
}

const Rating = ({ slug }: Props) => {

    const { data, loading } = useGetReviews(slug)

    // Helper function to return a numeric rating
    const returnNumericRating = (rating: string) => {
        if (rating === "Star 1 - Poor") {
            return 1
        } else if (rating === "Star 2 - Fair") {
            return 2
        } else if (rating === "Star 3 - Average") {
            return 3
        } else if (rating === "Star 4 - Good") {
            return 4
        } else if (rating === "Star 5 - Excellent") {
            return 5
        }
    }


    console.log(slug, data)

    // console.log("this is the data", data)

    // Calculate average rating
    const averageRating = useMemo(() => {
        if (!data || data.length === 0) return 0;

        const total = data.reduce((sum, review) => {
            const rating = returnNumericRating(review.attributes.rating);
            return sum + (rating || 0);
        }, 0);

        return total / data.length;
    }, [data]);

    // Round the average rating to the nearest integer
    const roundedAverageRating = Math.round(averageRating);

    return (
        <div className="flex mt-2">
            {[1, 2, 3, 4, 5].map((i, index) => (
                <FaStar key={index} className={`text-[#F6B501] ${i <= roundedAverageRating ? '' : 'opacity-30'}`} />
            ))}
        </div>
    )
}

export default Rating
