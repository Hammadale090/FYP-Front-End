/**
 * Component for the default feed.
 *
 * Props:
 *   - listings: Paginated data for listings.
 *   - brokers: Paginated data for brokers.
 *   - realtors: Paginated data for realtors.
 *   - loading: Loading state of the component.
 */
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FeedBrokerRealtorCard from "./components/FeedBrokerRealtorCard";
import FeedPropertyCard from "./components/FeedPropertyCard";
import { BiLoaderAlt } from "react-icons/bi";
import { FeedContext } from "@/context/FeedContext";
import { useGetListings } from "@/hooks/useGetListings";
import { useGetAllRealtors } from "@/hooks/useGetAllRealtors";
import { useGetAllBrokers } from "@/hooks/useGetAllBrokers";
type Props = {};

const DefaultFeed = (props: Props) => {
  const listings = useGetListings(true);
  const realtors = useGetAllRealtors();
  const brokers = useGetAllBrokers();

  const { sortingOption } = useContext<any>(FeedContext);

  // State variables for pagination
  const [pageCount, setPageCount] = useState<any>();
  const [pages, setPages] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>();

  const loading = listings?.loading || realtors?.loading || brokers?.loading;

  // Function to generate an array of page numbers for pagination
  function getPageArray(currentPage, pageCount) {
    if (
      typeof currentPage !== "number" ||
      typeof pageCount !== "number" ||
      currentPage < 1 ||
      currentPage > pageCount
    ) {
      return [];
    }

    const pages = [];

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(pageCount, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(pageCount, startPage + 2);
    } else if (currentPage === pageCount) {
      startPage = Math.max(1, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
  // Effect to update the page numbers array when pageCount or currentPage changes

  useEffect(() => {
    setPages(getPageArray(currentPage, pageCount));
  }, [pageCount, currentPage]);

  // State variable and effect for original combined data
  const [originalCombinedData, setOriginalCombinedData] = useState([]);

  useEffect(() => {
    const updatedPage = Math.max(
      listings.currentPage,
      brokers.currentPage,
      realtors.currentPage
    );
    setCurrentPage(updatedPage);
    setPageCount(
      Math.max(
        listings?.pagination?.pageCount,
        brokers?.pagination?.pageCount,
        realtors?.pagination?.pageCount
      )
    );

    if (
      listings?.paginatedData ||
      brokers?.paginatedData ||
      realtors?.paginatedData
    ) {
      setOriginalCombinedData(() => {
        const propertyData =
          listings?.paginatedData?.[updatedPage]?.map((item: any) => ({
            ...item,
            type: "property",
          })) || [];
        const brokerData =
          brokers?.paginatedData?.[updatedPage]?.map((item: any) => ({
            ...item,
            type: "broker",
          })) || [];
        const realtorData =
          realtors?.paginatedData?.[updatedPage]?.map((item: any) => ({
            ...item,
            type: "realtor",
          })) || [];

        const maxLength = Math.max(
          propertyData.length,
          brokerData.length,
          realtorData.length
        );
        const interleavedData = [];

        for (let i = 0; i < maxLength; i++) {
          if (propertyData[i]) interleavedData.push(propertyData[i]);
          if (realtorData[i]) interleavedData.push(realtorData[i]);
          if (brokerData[i]) interleavedData.push(brokerData[i]);
        }

        return interleavedData;
      });
    }
  }, [
    listings?.paginatedData,
    brokers?.paginatedData,
    realtors?.paginatedData,
  ]);

  // Memoized sorted combined data based on sortingOption and originalCombinedData
  const sortedCombinedData = useMemo(() => {
    const data = [...originalCombinedData];

    const safeLocaleCompare = (a: any, b: any) => {
      if (a.attributes?.name) {
        const nameA = a.attributes.name ?? "";
        const nameB = b.attributes.name ?? "";
        return nameA.localeCompare(nameB);
      } else if (a.attributes?.first_name && a.attributes?.last_name) {
        const fullNameA =
          `${a.attributes.first_name} ${a.attributes.last_name}` ?? "";
        const fullNameB =
          `${b.attributes.first_name} ${b.attributes.last_name}` ?? "";
        return fullNameA.localeCompare(fullNameB);
      } else {
        return 0;
      }
    };
    switch (sortingOption) {
      case "name_asc":
        return data.sort(safeLocaleCompare);
      case "name_desc":
        return data.sort((a, b) => safeLocaleCompare(b, a));
      case "date_asc":
        return data.sort(
          (a, b) =>
            new Date(a.attributes?.createdAt).getTime() -
            new Date(b.attributes?.createdAt).getTime()
        );
      case "date_desc":
        return data.sort(
          (a, b) =>
            new Date(b.attributes?.createdAt).getTime() -
            new Date(a.attributes?.createdAt).getTime()
        );
      default:
        return originalCombinedData;
    }
  }, [sortingOption, originalCombinedData]);

  // Handles navigation to a specified page
  function handleGoToPage(updatedPage) {
    const listingsData =
      listings?.paginatedData?.[updatedPage]?.map((item) => ({
        ...item,
        type: "property",
      })) || [];
    const realtorsData =
      realtors?.paginatedData?.[updatedPage]?.map((item) => ({
        ...item,
        type: "broker",
      })) || [];
    const brokersData =
      brokers?.paginatedData?.[updatedPage]?.map((item) => ({
        ...item,
        type: "realtor",
      })) || [];

    const updatedCombinedData = [
      ...listingsData,
      ...realtorsData,
      ...brokersData,
    ];

    setOriginalCombinedData(updatedCombinedData);

    setCurrentPage(updatedPage);
  }

  // Handles fetching data for the next page
  async function handleNextPage(e) {
    e.preventDefault();

    if (currentPage + 1 > pageCount || loading) return;

    try {
      if (currentPage < listings.pagination.pageCount) {
        await listings.getListings(currentPage + 1);
      }
      if (currentPage < realtors.pagination.pageCount) {
        await realtors.getRealtors(currentPage + 1);
      }
      if (currentPage < brokers.pagination.pageCount) {
        await brokers.getBrokers(currentPage + 1);
      }

      handleGoToPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching next page data:", error);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center md:justify-start md:gap-8">
        {sortedCombinedData.map((item: any, index: number) => {
          switch (item.type) {
            case "property":
              return (
                <div>
                  <FeedPropertyCard
                    key={item?.id}
                    id={item?.id}
                    title={item?.attributes?.name}
                    price={item?.attributes?.price}
                    currency={item?.attributes?.currency}
                    description={item?.attributes?.description}
                    // banner={item?.attributes?.coverPhoto}
                    banner={
                      item?.attributes?.coverPhoto?.data ?
                      item?.attributes?.coverPhoto
                      :
                      item?.attributes?.coverPhotoFromUrl
                    }
                    location={item?.attributes?.location}
                    views={item?.attributes?.views}
                    favourites={item?.attributes?.favourites}
                    featuredClassName
                  />
                </div>
              );
            case "broker":
              return (
                <div>
                  <FeedBrokerRealtorCard
                    key={item.id}
                    id={item.id}
                    userId={item.attributes.user?.data?.id}
                    url={
                      item.attributes.professional_profile?.data?.attributes
                        .url_link
                    }
                    phone={
                      item.attributes.professional_profile?.data?.attributes
                        ?.phone
                    }
                    profile_pic={
                      item.attributes.professional_profile?.data?.attributes
                        .professional_photo?.data?.attributes?.url
                    }
                    lastname={item.attributes.last_name}
                    firstname={item.attributes.first_name}
                    email={item.attributes.user?.data?.attributes.email}
                    Agency_name={
                      item.attributes.agency?.data?.attributes.Agency_name
                    }
                    favourites={item.attributes.favourites}
                    views={item?.attributes?.views}
                  />
                </div>
              );
            case "realtor":
              return (
                <div>
                  <FeedBrokerRealtorCard
                    key={item.id}
                    id={item.id}
                    userId={item.attributes.user?.data?.id}
                    realtor
                    url={
                      item.attributes.professional_profile?.data?.attributes
                        .url_link
                    }
                    phone={
                      item.attributes.professional_profile?.data?.attributes
                        ?.phone
                    }
                    profile_pic={
                      item.attributes.professional_profile?.data?.attributes
                        .professional_photo?.data?.attributes?.url
                    }
                    lastname={item.attributes.last_name}
                    firstname={item.attributes.first_name}
                    email={item.attributes.user?.data?.attributes.email}
                    Agency_name={
                      item.attributes.agency?.data?.attributes.Agency_name
                    }
                    favourites={item.attributes.favourites}
                    views={item?.attributes?.views}
                  />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>

      {loading && (
        <div className="w-full h-[600px]">
          <div className="flex justify-center">
            {" "}
            <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />
          </div>
        </div>
      )}
      {/* the pagination */}
      <div className="flex justify-center mt-[30px]">
        {/* the pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem
                  onClick={async (e) => {
                    e.preventDefault();
                    if (!loading && currentPage > 1) {
                      handleGoToPage(currentPage - 1);
                    }
                  }}
                >
                  <PaginationPrevious />
                </PaginationItem>
                {pages.map((page, index) => (
                  <PaginationItem
                    key={index}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (loading) return;
                      page < currentPage
                        ? handleGoToPage(page)
                        : handleNextPage(e);
                    }}
                  >
                    <PaginationLink
                      className={`border ${
                        page == currentPage && "bg-[#3EB87F] text-white"
                      }`}
                      isActive={page == currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}

                <PaginationItem onClick={handleNextPage}>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultFeed;
