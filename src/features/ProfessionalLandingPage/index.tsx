import React from 'react'
import ProfessionalNavbar from './components/ProfessionalNavbar'
import Image from 'next/image'
import TrustedBrands from './components/TrustedBrands'
import PropertyPreference from './components/PropertyPreference'
import DataArea from './components/DataArea'
import ExplorePropertyListings from './components/ExplorePropertyListings'
import Invest from './components/Invest'
import ModernSpace from './components/ModernSpace'
import HappyCustomers from './components/HappyCustomers'
import JoinUs from './components/JoinUs'
import StylistNews from './components/StylistNews'
import RequestAVisit from './components/RequestAVisit'
import Footer from './components/Footer'
import { TextInput } from '@mantine/core'
import Hero from './components/Hero'
import ChatPopup from './components/ChatPopup'

type Props = {
    user?: boolean;
}

const LandingPage = ({ user }: Props) => {
    return (
        <section className='px-[20px]'>
            <ProfessionalNavbar />

            {/* the hero section  */}
            <Hero user={user} />
            {/* Trusted Brands */}
            <TrustedBrands />
            {/* property preference */}
            <PropertyPreference />
            {/* Data for rge areas */}
            <DataArea />
            {/* explore property listins */}
            {/* <ExplorePropertyListings /> */}
            {/* smart living invest */}
            {/* <Invest /> */}
            {/* Modern Space */}
            <ModernSpace />
            {/* Happy Customers */}
            <HappyCustomers />
            {/* would you like to join us */}
            <JoinUs />
            {/* Stylist News From our blog */}
            <StylistNews />
            {/* Request a visit */}
            <RequestAVisit />
            {/* the fOOTER */}
            <Footer />

            <ChatPopup />

        </section>
    )
}

export default LandingPage