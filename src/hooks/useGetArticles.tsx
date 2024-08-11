import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { fetcher } from '@/lib/fetchers';
import { ProfSettingsContext } from '@/context/ProfSettingsContext';


export function useGetArticles(id?: string | string[]) {
    const { profileId, jwt } = useContext(AuthContext)
    const { articleLoader } = useContext(ProfSettingsContext)
    const [data, setData] = useState([]);
    const [allIds, setAllIds] = useState(new Set());
    const [allData, setAllData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getArticles() {
            setLoading(true);
            let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?sort=id:DESC&filters[client_profile][id][$eq]=${profileId}&populate[0]=article_banner`

            if (id) {
                url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?sort=id:DESC&filters[client_profile][id][$eq]=${id}&populate[0]=article_banner`
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
            getArticles();
        }
    }, [profileId, articleLoader]);

    return { data, loading, allData, allIds };
}
