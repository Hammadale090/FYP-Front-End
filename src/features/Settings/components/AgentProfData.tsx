import React from 'react'
import AgentProfStatus from './AgentProfStatus'

type Props = {}

const AgentProfData = (props: Props) => {
    return (
        <section className='md:grid xl:grid-cols-3 mt-10 md:grid-cols-2 max-md:flex max-md:flex-wrap max-md:space-y-3 max-md:justify-center'>
            <AgentProfStatus header='Total Listings' data={[{ name: "Listings", color: "#ff5353", value: 800 }]} amount='1050' />
            <AgentProfStatus header='Total Listings' data={[{ name: "Listings", color: "#ff5353", value: 800 }]} amount='1050' />
            <AgentProfStatus header='Total Listings' data={[{ name: "Listings", color: "#ff5353", value: 800 }]} amount='1050' />
        </section>
    )
}

export default AgentProfData