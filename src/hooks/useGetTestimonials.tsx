import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { fetcher } from '@/lib/fetchers';


export function useGetTestimonials(id?: string | string[]) {
    const { profileId, jwt } = useContext(AuthContext)
    const [data, setData] = useState([]);
    const [allIds, setAllIds] = useState(new Set());
    const [allData, setAllData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getTestimonial() {
            setLoading(true);
            let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/testimonials?populate[0]=image`

            const personal = await fetcher(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
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
        getTestimonial();
    }, [profileId, jwt]);

    return { data, loading, allData, allIds };
}
