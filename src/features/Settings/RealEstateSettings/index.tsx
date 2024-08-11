import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React from 'react'
import ProfSettingsBanner from '../components/ProfSettingsBanner'
import ProfSettingsPromo from '../components/ProfSettingsPromo'
import AgentProfSettings from '../components/AgentProfSettings'
import ProfAgentDetails from '../components/ProfAgentDetails'
import AgentProfData from '../components/AgentProfData'
import AgentProfCustomization from '../components/AgentProfCustomization'
import AgentCertificationsnAwards from '../components/AgentCertificationsnAwards'
import AgentUpdatePortfolio from '../components/AgentUpdatePortfolio'
import AgentProfListings from '../components/AgentProfListings'
import AgentProfServices from '../components/AgentProfServices'
import AgentEducationalArticles from '../components/AgentEducationalArticles'
import ProfessionalSettingsHeader from '../components/ProfessionalSettingsHeader'

type Props = {}

const RealEstateSettings = (props: Props) => {
    return (
        <div>

            {/* the header */}
            <ProfessionalSettingsHeader header='Real Estate Lawyer' />

            {/* the banner */}
            <ProfSettingsBanner />

            {/* the promo code */}
            <ProfSettingsPromo />


            {/* Agent profile */}
            <AgentProfSettings />

            {/* Agent Details */}
            <ProfAgentDetails />

            {/* profile customization */}
            <AgentProfCustomization />

            {/* certifications Awards and Achieccements */}
            <AgentCertificationsnAwards />

            {/* update portfolio */}
            <AgentUpdatePortfolio />

            {/* Agent Listing */}
            <AgentProfListings />
            {/* Agent Services */}
            <AgentProfServices />

            {/* Agent Educational Articles */}
            <AgentEducationalArticles />
        </div>
    )
}

export default RealEstateSettings