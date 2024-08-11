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

const BrokerSettings
    = (props: Props) => {
        return (
            <div>

                {/* the header */}
                <ProfessionalSettingsHeader header='Broker' />

                {/* the banner */}
                <ProfSettingsBanner />

                {/* the promo code */}
                <ProfSettingsPromo />


                {/* Agent profile */}
                <AgentProfSettings />

                {/* Agent Details */}
                <ProfAgentDetails />

                {/* Agent data, total listings properties sold properties rent */}
                <AgentProfData />

                {/* profile customization */}
                <AgentProfCustomization />

                {/* certifications Awards and Achieccements */}
                <AgentCertificationsnAwards />

                {/* update portfolio */}
                <AgentUpdatePortfolio />

                {/* Agent Services */}
                <AgentProfServices />

                {/* Agent Listing */}
                <AgentProfListings />

                {/* Agent Educational Articles */}
                <AgentEducationalArticles />
            </div>
        )
    }

export default BrokerSettings
