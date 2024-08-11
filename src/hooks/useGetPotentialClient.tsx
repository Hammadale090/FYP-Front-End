import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { fetcher } from "@/lib/fetchers";
import { ProfSettingsContext } from "@/context/ProfSettingsContext";
import { useGetPreferences } from "./useGetPreferences";
import { constructSearchQuery } from "@/lib/feed/potentialclients/recomendation";

export function useGetPotentialClient() {
  const { profileId, jwt, userRole } = useContext(AuthContext);
  const { realtorLoader } = useContext(ProfSettingsContext);
  const [data, setData] = useState([]);
  const [paginatedData, setPaginatedData] = useState<any>();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 25,
    pageCount: 1,
  });
  const [currentPage, setCurrentPage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { professionalPreferences } = useGetPreferences();

  async function getPotentialsClients(
    page = pagination.page,
    shouldIncremmentCurrentPage = true
  ) {
    setLoading(true);
    const personal = await fetcher(
      `${
        process.env.NEXT_PUBLIC_STRAPI_URL
      }/client-profiles?filters[role][$eq]=${"user"}&${constructSearchQuery(
        professionalPreferences
      )}&populate[0]=profile_pic&populate[1]=professional_profile.professional_photo&populate[2]=agency&populate[3]=user&populate[4]=preference&pagination[page]=${page}&pagination[pageSize]=25&sort=createdAt:DESC`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (personal?.data) {
      setData([...personal?.data]);
      setPagination(personal?.meta?.pagination);
      setPaginatedData({
        ...paginatedData,
        [personal?.meta?.pagination?.page]: personal?.data,
      });
      shouldIncremmentCurrentPage &&
        setCurrentPage(personal?.meta?.pagination?.page);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (
      jwt &&
      professionalPreferences &&
      !loading &&
      userRole &&
      userRole != "user"
    ) {
      getPotentialsClients();
    }
  }, [profileId, realtorLoader, professionalPreferences, userRole]);

  return {
    data,
    loading,
    pagination,
    setPagination,
    getPotentialsClients,
    paginatedData,
    currentPage,
    setCurrentPage,
  };
}
