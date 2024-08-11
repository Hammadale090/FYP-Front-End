import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { fetcher } from '@/lib/fetchers';
import { ProfSettingsContext } from '@/context/ProfSettingsContext';


export function useGetReviews(id: string | string[], sort = "DESC") {
    const { profileId, jwt } = useContext(AuthContext)
    const { reviewsLoader, data, setData } = useContext(ProfSettingsContext)
    const [allIds, setAllIds] = useState(new Set());
    const [allData, setAllData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getReviews() {

            setLoading(true);
            if (!id) {
                setData([])
                setLoading(false);
                return;
            }
            let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews?sort=id:${sort}&filters[professional][id][$eq]=${id}&sort=id:DESC&populate[0]=client_profile.profile_pic&populate[1]=client_profile.user`

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
            getReviews();
        }
    }, [profileId, reviewsLoader, id, sort]);

    return { data, loading, allData, allIds };
}
