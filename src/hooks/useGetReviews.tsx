import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { fetcher } from '@/lib/fetchers';
import { ProfSettingsContext } from '@/context/ProfSettingsContext';


export function useGetReviews(id: string | string[], sort = "DESC") {
    const { jwt } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);
    const { reviewsLoader } = useContext(ProfSettingsContext)
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getReviews() {
            setLoading(true);
            if (!id) {
                setData([]);
                setLoading(false);
                return;
            }
            const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews?sort=id:${sort}&filters[professional][id][$eq]=${id}&sort=id:DESC&populate[0]=client_profile.profile_pic&populate[1]=client_profile.user`;

            const personal = await fetcher(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            // console.log("this is the personal", personal)
            setData(personal?.data || []);
            setLoading(false);
        }

        if (jwt) {
            getReviews();
        }
    }, [id, sort, jwt, reviewsLoader]);

    return { data, loading };
}


// return { data, loading, allData, allIds };

