import React from 'react'
import { Modal } from "@mantine/core";
import { useGetPropertiesViewed } from '@/hooks/useGetPropertiesViewed';
import { Listing } from '@/context/types';
import FeedPropertyCard from './FeedPropertyCard';
import { BiLoaderAlt } from 'react-icons/bi';

type Props = {
    opened: boolean;
    close: () => void

}

const PropertyViewed = ({ opened, close }: Props) => {

    const { data, loading } = useGetPropertiesViewed();

    return (
        <Modal opened={opened} onClose={() => {
            close()
        }} fullScreen title={`Properties viewed recently`} >

            <div className="flex  justify-center md:justify-start md:gap-8">
                {data?.map((listing: Listing) => (
                    <FeedPropertyCard
                        key={listing?.id}
                        id={listing?.id}
                        title={listing?.attributes?.name}
                        price={listing?.attributes?.price}
                        currency={listing?.attributes?.currency}
                        description={listing?.attributes?.description}
                        banner={
                            (listing?.attributes?.galleryWithUrls && listing?.attributes?.galleryWithUrls?.length > 0) ? listing?.attributes?.galleryWithUrls[0] :
                                !Array.isArray(listing?.attributes?.coverPhoto)
                                    ? (listing?.attributes?.coverPhoto?.data ?? listing?.attributes?.coverPhotoFromUrl)
                                    : listing?.attributes?.coverPhotoFromUrl
                        }
                        location={listing?.attributes?.location}
                        views={listing?.attributes?.views}
                        favourites={listing?.attributes?.favourites}
                        featuredClassName
                    />
                ))}

                {
                    (data?.length < 1 && !loading) && (
                        <h1 className="text-center text-gray-600 mt-8 text-lg w-full">
                            You haven&apos;t viewed any properties recently.
                        </h1>
                    )
                }

                {loading && (
                    <div className="w-full h-[600px] z-10 opacity-20 absolute">
                        <div className="flex justify-center">
                            {" "}
                            <BiLoaderAlt className="text-center animate-spin w-[200px] h-[200px]" />
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default PropertyViewed