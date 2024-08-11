import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { fetcher } from "@/lib/fetchers";
import { ProfSettingsContext } from "@/context/ProfSettingsContext";
import { useGetPreferences } from "./useGetPreferences";
import { PreferencesContext } from "@/context/PreferencesContext";
import { constructSearchQuery } from "@/lib/feed/properties/recomendation";

export function useGetListings(
  landing?: boolean,
  id?: string | string[],
  isFeatured?: boolean,
  isProfessionalListingFeed?: boolean
) {
  const { profileId, jwt } = useContext(AuthContext);
  const { listingsLoader } = useContext(ProfSettingsContext);

  const [data, setData] = useState([]);
  const [paginatedData, setPaginatedData] = useState<any>();
  const [allIds, setAllIds] = useState(new Set());
  const [allData, setAllData] = useState<any>();
  const { preferences } = useContext(PreferencesContext);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 25,
    pageCount: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldHideViewAll, setshouldHideViewAll] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<any>();
  async function getListings(
    page = pagination.page,
    shouldIncremmentCurrentPage = true,
    fetchAll = false
  ) {
    setLoading(true);
    let personal;

    let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings?sort=id:DESC&filters[client_profile][id][$eq]=${profileId}&populate[0]=Gallery&populate[1]=event&populate[2]=coverPhoto&pagination[page]=${page}&pagination[pageSize]=25`;

    if (id) {
      url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings?sort=id:DESC&filters[client_profile][id][$eq]=${id}&populate[0]=Gallery&populate[1]=event&populate[2]=coverPhoto&pagination[page]=${page}&pagination[pageSize]=25`;
    }

    if (isProfessionalListingFeed) {
      url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings?sort=id:DESC&populate[0]=Gallery&populate[1]=event&pagination[page]=${page}&pagination[pageSize]=6`;

      // if (professionalPreferences?.propertySpecialization) {
      // Object.entries(professionalPreferences.propertySpecialization).forEach(
      //   ([key, value]) => {
      //     if (value) {
      //       url += `&filters[type][$eq]=${key}`;
      //     }
      //   }
      // );
      // }

      // if (professionalPreferences?.preferredPropertyTypes) {
      //   Object.entries(professionalPreferences.preferredPropertyTypes).forEach(
      //     ([key, value]) => {
      //       if (value) {
      //         url += `&filters[overview][type][$eq]=${key}`;
      //       }
      //     }
      //   );
      // }
    }

    if (isFeatured) {
      personal = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings?sort=id:DESC&filters[isFeatured][$eq]=true&pagination[page]=${page}&pagination[pageSize]=25&populate=*`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } else if (isProfessionalListingFeed) {
      personal = await fetcher(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
    } else if (!landing) {
      if (fetchAll) {
        url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings?sort=id:DESC&filters[client_profile][id][$eq]=${profileId}&populate[0]=Gallery&populate[1]=event&populate[2]=coverPhoto`;
      }
      personal = await fetcher(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
    } else {
      if (!preferences) return;
      const _url = `${
        process.env.NEXT_PUBLIC_STRAPI_URL
      }/listings?sort=id:DESC&filters[$or][0][client_profile][id][$null]=true&filters[$or][1][client_profile][id][$ne]=${profileId}${constructSearchQuery(
        preferences
      )}&pagination[page]=${page}&pagination[pageSize]=6&populate=*`;
      console.log({ _url });
      personal = await fetcher(_url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
    }

    if (personal?.data) {
      await setData(personal?.data);
      if (fetchAll) {
        setshouldHideViewAll(true);
      }
      setAllData(personal);
      setPagination(personal?.meta?.pagination);
      setPaginatedData({
        ...paginatedData,
        [personal?.meta?.pagination?.page]: personal?.data,
      });
      shouldIncremmentCurrentPage &&
        setCurrentPage(personal?.meta?.pagination?.page);
      const updatedSet = new Set(allIds);
      await personal?.data?.map(async (dat: any) => {
        await updatedSet?.add(dat?.id);
      });
      setAllIds(updatedSet);
    }

    setLoading(false);
  }
  useEffect(() => {
    if (jwt && profileId && !listingsLoader) {
      getListings();
    }
  }, [profileId, listingsLoader, preferences]);

  return {
    data,
    loading,
    allData,
    allIds,
    pagination,
    setPagination,
    getListings,
    paginatedData,
    currentPage,
    setCurrentPage,
    shouldHideViewAll,
  };
}
