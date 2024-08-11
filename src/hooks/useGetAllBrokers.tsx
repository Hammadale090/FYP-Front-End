import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { fetcher } from "@/lib/fetchers";
import { ProfSettingsContext } from "@/context/ProfSettingsContext";

export function useGetAllBrokers() {
  const { profileId, jwt } = useContext(AuthContext);
  const { realtorLoader } = useContext(ProfSettingsContext);
  const [data, setData] = useState([]);
  const [allIds, setAllIds] = useState(new Set());
  const [allData, setAllData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const [paginatedData, setPaginatedData] = useState<any>();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 25,
    pageCount: 1,
  });
  const [currentPage, setCurrentPage] = useState<any>();

  async function getBrokers(page = pagination.page) {
    setLoading(true);
    const personal = await fetcher(
      `${
        process.env.NEXT_PUBLIC_STRAPI_URL
      }/client-profiles?filters[role][$eq]=${"broker"}&populate[0]=profile_pic&populate[1]=professional_profile.professional_photo&populate[2]=agency&populate[3]=user&pagination[page]=${page}&pagination[pageSize]=25&sort=createdAt:DESC`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (personal?.data) {
      await setData(personal?.data);
      setAllData(personal);
      const updatedSet = new Set(allIds);
      await personal?.data?.map(async (dat: any) => {
        await updatedSet?.add(dat?.id);
      });
      setAllIds(updatedSet);

      setPagination(personal?.meta?.pagination);
      setPaginatedData({
        ...paginatedData,
        [personal?.meta?.pagination?.page]: personal?.data,
      });
      setCurrentPage(personal?.meta?.pagination?.page);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (jwt) {
      getBrokers();
    }
  }, [profileId, realtorLoader]);

  return {
    data,
    loading,
    allData,
    allIds,
    pagination,
    setPagination,
    getBrokers,
    paginatedData,
    currentPage,
    setCurrentPage,
  };
}
