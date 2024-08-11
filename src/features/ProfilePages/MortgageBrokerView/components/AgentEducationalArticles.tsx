'use client'
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React, { useEffect, useState } from 'react'
import AgentArticle from '../shared/AgentArticle'
import { useGetArticles } from '@/hooks/useGetArticles'
import { BiLoaderAlt } from 'react-icons/bi'
import { Article } from '@/context/types'

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
                        <AgentArticle key={article.id} banner={article?.attributes?.article_banner?.data?.attributes?.url} title={article?.attributes?.title} description={article?.attributes?.description} dateCreated={article?.attributes?.createdAt} />
                    ))
                }
            </div >

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }


        </section>
    )
}

export default AgentEducationalArticles