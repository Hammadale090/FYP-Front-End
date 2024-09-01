import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { fetcher } from '@/lib/fetchers';


export function useGetPropertiesViewed() {
    const { profileId, jwt } = useContext(AuthContext)
    const [data, setData] = useState([]);
    const [allIds, setAllIds] = useState(new Set());
    const [allData, setAllData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getPropertiesViewed() {
            setLoading(true);
            let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/client-profiles/${profileId}?&populate[0]=properties_viewed.Gallery&populate[1]=properties_viewed.event&populate[2]=properties_viewed.coverPhoto`

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
                await setData(personal?.data?.attributes?.properties_viewed?.data);
                setAllData(personal);
            }

            setLoading(false);
        }

        if (jwt && profileId) {
            getPropertiesViewed();
        }
    }, [jwt, profileId]);

    return { data, loading, allData, allIds };
}
