import { Divider } from '@mantine/core'
import React from 'react'
import TopRelevantArticle from './components/TopRelevantArticle'
import RelevantArticleFeed from './components/RelevantArticleFeed'

type Props = {}

const Articles = (props: Props) => {
    return (
        <div>
            {/* the divider */}
            <Divider my="sm" />
            {/* Relevant Article top container */}
            <TopRelevantArticle />
            {/*  */}
            {/* Relevant Article Feed */}
            <RelevantArticleFeed />


        </div>
    )
}

export default Articles