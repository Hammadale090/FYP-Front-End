import React from 'react'
import ProfessionalNavbar from '../ProfessionalLandingPage/components/ProfessionalNavbar';

import Hero from './components/Hero';
import UserPreferences from './components/UserPreferences';
import ExploreFeatures from './components/ExploreFeatures';
import BetaTesting from './components/BetaTesting';
import JoinUs from './components/JoinUs';
import Waitlist from './components/Waitlist';
import Subscribe from './components/Subscribe';
import Footer from './components/footer';
import Navbar from "./components/Navbar"
import ChatPopup from '../ProfessionalLandingPage/components/ChatPopup';



type Props = {
    user?: boolean;
}

const MarketingPage = ({ user }: Props) => {
    return (
        <section className=''>
            <Navbar />
            <Hero />
            <UserPreferences />
            <ExploreFeatures />
            <BetaTesting />
            <JoinUs />
            <Waitlist />

            <Subscribe />
            <ChatPopup />
            <div className='px-2'>
                <Footer />
            </div>


        </section>
    )
}

export default MarketingPage