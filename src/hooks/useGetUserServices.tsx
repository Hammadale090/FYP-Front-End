import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { fetcher } from '@/lib/fetchers';
import { ProfSettingsContext } from '@/context/ProfSettingsContext';


export function useGetUserServices(id?: string | string[]) {
    const { profileId, jwt } = useContext(AuthContext)
    const { servicesLoader } = useContext(ProfSettingsContext)
    const [data, setData] = useState([]);
    const [allIds, setAllIds] = useState(new Set());
    const [allData, setAllData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getServices() {
            setLoading(true);
            let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/services?sort=id:DESC&filters[client_profile][id][$eq]=${profileId}&populate[0]=Gallery`
            if (id) {
                url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/services?sort=id:DESC&filters[client_profile][id][$eq]=${id}&populate[0]=Gallery`
            }
            const personal = await fetcher(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
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
            }

            setLoading(false);
        }

        if (jwt && profileId) {
            getServices();
        }
    }, [profileId, servicesLoader]);

    return { data, loading, allData, allIds };
}
