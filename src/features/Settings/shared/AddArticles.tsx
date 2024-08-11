import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import IconShowcaseButton from '@/features/Dashboard/shared/IconShowcaseButton'
import { Modal } from '@mantine/core'
import { useToast } from '@/components/ui/use-toast'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { ProfSettingsContext } from '@/context/ProfSettingsContext'
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Label } from "@/components/ui/label"
import { Article } from '@/context/types'
import { validateArticleFields } from '@/utils/Validations'


type Props = {
    opened: boolean;
    close: () => void;
    articleToUpdate?: Article;
}

const AddArticles = ({ opened, close, articleToUpdate }: Props) => {
    const [loader, setLoader] = useState<boolean>(false)
    const { toast } = useToast();
    const { profileId, professionalId, jwt } = useContext(AuthContext)
    const { articleLoader, setArticleLoader } = useContext(ProfSettingsContext)
    const [error, setError] = useState<string>("")
    const [articleBanner, setArticleBanner] = useState<any>()
    const [form, setForm] = useState({
        title: "",
        body: "",
        description: "",
    })

    const handleChange = (e: any) => {
        setError("")
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // File size is within the limit
            setArticleBanner(file)
        }
    }

    const resetForm = () => {
        setLoader(false)
        setForm({
            title: "",
            body: "",
            description: "",
        })
        setArticleBanner(null)
    }

    const handleAddArticle = async (e: any) => {
        e.preventDefault();

        const errorMsg = validateArticleFields(form);
        if (errorMsg) {
            setError(errorMsg);
            setLoader(false);
            return;
        }

        if (form?.body.trim() == "") {
            return;
        }
        setLoader(true)
        try {

            let response;
            let dat;
            if (articleBanner) {
                const body = new FormData();
                body.append('files', articleBanner);

                response = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload/`,
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
            }
            if (response) {
                dat = {
                    article_banner: response.data[0].id,
                    ...form,
                }
            } else {
                dat = {
                    ...form
                }
            }




            let addProf;
            if (articleToUpdate?.id) {
                addProf = await axios.put(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/${articleToUpdate?.id}`,
                    {
                        data: {
                            ...dat,
                            client_profile: profileId,
                            professional_profile: professionalId
                        },
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
            } else {
                addProf = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`,
                    {
                        data: {
                            ...dat,
                            client_profile: profileId,
                            professional_profile: professionalId
                        },
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
            }

            if (addProf?.data?.data?.id) {
                if (setArticleLoader) {
                    setArticleLoader(!articleLoader)
                }
                toast({
                    description: `Article ${articleToUpdate?.id ? "update" : "added"} successfully`,
                    action: <IoCheckmarkDoneCircleSharp className='text-blue' />,
                });
                setLoader(false)
                resetForm()
                setError("")
                close()
            }


        } catch (error) {
            console.error(error);
            setLoader(false)
            toast({
                variant: "destructive",
                description: "Something went wrong, could not add article",
            });
        }
    }


    const handleEditor = (text: any) => {
        setForm({
            ...form,
            body: text
        })
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: form.body?.toString(),
        onUpdate(props) {
            handleEditor(props.editor.getHTML() as any)
        },
    });


    useEffect(() => {
        if (articleToUpdate?.id) {
            setForm({
                title: articleToUpdate?.attributes?.title ?? '',
                body: articleToUpdate?.attributes?.body ?? '',
                description: articleToUpdate?.attributes?.description ?? '',
            })
        }
    }, [articleToUpdate])

    return (
        <Modal opened={opened} size={"55rem"} onClose={() => {
            resetForm()


            close()
        }} title={`${articleToUpdate?.id ? "Update" : "Add"} Article`} >

            <form onSubmit={handleAddArticle}>

                {/* the article banner */}
                <div className='mt-4 w-full  flex flex-col space-y-1'>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Article Banner</Label>
                        <Input onChange={handleFileChange} id="picture" type="file" />
                    </div>
                </div>


                {/* the article title */}
                <div className='mt-4 w-full  flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Title (max : 150 characters)<span className='text-red-500'>*</span></h1>
                    <Input name='title'
                        value={form.title}
                        onChange={handleChange}
                        maxLength={150}
                        required
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter name of the article' />
                </div>

                {/* the article description */}
                <div className='mt-4 flex flex-col space-y-1 my-2'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Description (max : 300 characters)<span className='text-red-500'>*</span></h1>
                    <Textarea name='description'
                        value={form.description}
                        onChange={handleChange}
                        maxLength={300}
                        required
                        className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='Enter article description' />

                </div>

                {/* the article body  */}
                <div className='mt-4 w-full flex flex-col space-y-1'>
                    <div className='mt-4 flex flex-col space-y-1 my-2'>
                        <h1 className='text-[#808191] text-[14px] leading-[22px]'>body <span className='text-red-500'>*</span></h1>

                        {/* Rich text editor */}
                        <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Bold />
                                    <RichTextEditor.Italic />
                                    <RichTextEditor.Underline />
                                    <RichTextEditor.Strikethrough />
                                    <RichTextEditor.ClearFormatting />
                                    <RichTextEditor.Highlight />
                                    <RichTextEditor.Code />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Blockquote />
                                    <RichTextEditor.Hr />
                                    <RichTextEditor.BulletList />
                                    <RichTextEditor.OrderedList />
                                    <RichTextEditor.Subscript />
                                    <RichTextEditor.Superscript />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Link />
                                    <RichTextEditor.Unlink />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.AlignLeft />
                                    <RichTextEditor.AlignCenter />
                                    <RichTextEditor.AlignJustify />
                                    <RichTextEditor.AlignRight />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Undo />
                                    <RichTextEditor.Redo />
                                </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>

                            <RichTextEditor.Content />
                        </RichTextEditor>

                    </div>
                </div>


                <h1 className='text-center my-1 text-[14px] text-red-500'> {error}</h1>

                <IconShowcaseButton loading={loader} text={`${articleToUpdate?.id ? "Update" : "Add"} Article`} color='#3EB87F' textCenter width='w-full' textCN='text-[16px] font-semibold leading-[26px] text-white mx-[19px]' px='19px' py='9px' rounded={"4px"} noBorder />
            </form>

        </Modal >
    )
}

export default AddArticles