"use client";
import { Article } from '@/context/types';
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import AgentArticle from '@/features/ProfilePages/RealtorView/shared/AgentArticle'
import { useGetArticles } from '@/hooks/useGetArticles';
import { useDisclosure } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import AddArticles from '../shared/AddArticles';
import { deleteEduArticles } from '../functions/functions';
import { AuthContext } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';


type Props = {}

const AgentEducationalArticles = (props: Props) => {
    const { jwt } = useContext(AuthContext)
    const [opened, { open, close }] = useDisclosure(false);
    const [articlesData, setArticlesData] = useState([])
    const [articleToUpdate, setArticleToUpdate] = useState<Article>()
    const { data, loading, allData } = useGetArticles()
    const { toast } = useToast();


    const [isEditEduArticles, setIsEditEduArticles] = useState<boolean>(false)

    useEffect(() => {
        const loadData = () => {
            if (allData?.meta) {
                setArticlesData(allData?.data);
            }
        };

        loadData();

    }, [allData, data]);

    const deleteEducationalArticles = async (id: string | number | undefined) => {
        if (!id) return
        try {
            const res = await deleteEduArticles(id, jwt);

            if (res?.data) {
                // Assuming articlesData is initialized properly or has a type assertion
                const updatedArticlesData = articlesData.filter((article: Article | undefined) => article?.id !== id);
                setArticlesData(updatedArticlesData);
                toast({
                    description: "Educational article deleted successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
            }

            if (res?.error) {
                toast({
                    variant: "destructive",
                    description: res?.error?.message,
                });
            }


        } catch (error) {
            console.error("Error deleting article:", error);
            toast({
                variant: "destructive",
                description: "Something went wrong",
            });
        }

    };

    const updateEducationalArticles = async (id: string | number | undefined) => {
        const article = articlesData.find((article: Article | undefined) => article?.id == id)
        setArticleToUpdate(article)
        open()
    }

    return (
        <section className='bg-[#FCFCFC] mt-8 flex flex-col space-y-3 rounded-[10px] w-full  p-[20px]'>

            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Educational articles</h1>

                <IconShowcaseBox text='Edit Article Section' textColor='#FCFCFC' color='#3EB87F' textCenter noBorder onClick={() => setIsEditEduArticles(!isEditEduArticles)} />

            </div>

            <div className='grid grid-cols-1 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4' >
                <AgentArticle Add AddOnclick={open} />

                {
                    articlesData?.map((article: Article) => (
                        <AgentArticle
                            key={article.id}
                            id={article.id}
                            banner={article?.attributes?.article_banner?.data?.attributes?.url}
                            title={article?.attributes?.title}
                            description={article?.attributes?.description}
                            dateCreated={article?.attributes?.createdAt}
                            isEditEduArticles={isEditEduArticles}
                            deleteEducationalArticles={deleteEducationalArticles}
                            updateEducationalArticles={updateEducationalArticles}
                        />
                    ))
                }
            </div >

            {
                loading && (
                    <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
                )
            }

            {/* modal to add and delete articles */}
            <AddArticles opened={opened} close={close} articleToUpdate={articleToUpdate} />
        </section>
    )
}

export default AgentEducationalArticles