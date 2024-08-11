'use client'
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React, { useEffect, useState } from 'react'
import AgentArticle from '../shared/AgentArticle'
import { useGetArticles } from '@/hooks/useGetArticles'
import { Article } from '@/context/types'
import { BiLoaderAlt } from 'react-icons/bi'

type Props = {
    slug: string | string[]
}

const AgentEducationalArticles = (props: Props) => {

    const { slug } = props;
    const [articlesData, setArticlesData] = useState([])
    const { data, loading, allData } = useGetArticles(slug)

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setArticlesData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);

    return (
        <section className='bg-[#FCFCFC] mt-8 flex flex-col space-y-3 rounded-[10px] w-full  p-[20px]'>
            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Educational articles</h1>
                <IconShowcaseBox text='Edit Testimonials' textColor='#FCFCFC' color='#3EB87F' textCenter noBorder />
            </div>

            <div className='max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4' >

                {
                    articlesData?.map((article: Article) => (
                        <AgentArticle banner={article?.attributes?.article_banner?.data?.attributes?.url} key={article.id} title={article?.attributes?.title} description={article?.attributes?.description} dateCreated={article?.attributes?.createdAt} />
                    ))
                }
            </div >

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }


            {/* the agent articles */}
            {/* <div className='grid xl:grid-cols-3 lg:grid-cols-2 max-lg:flex max-lg:flex-wrap max-lg:justify-center'>
                <AgentArticle />
                <AgentArticle />
                <AgentArticle />
            </div> */}
        </section>
    )
}

export default AgentEducationalArticles