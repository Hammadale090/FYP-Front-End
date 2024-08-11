'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { ProfSettingsProps } from "./types";
import { AuthContext } from "./AuthContext";

// @ts-ignore
export const ProfSettingsContext = createContext<ProfSettingsProps>({})

type Props = {
    children: React.ReactNode
}

function ProfSettingsContextProvider({ children }: Props) {
    const [banner, setBanner] = useState()
    const [bannerLoader, setBannerLoader] = useState<boolean>(false)
    const { prof, agency } = useContext(AuthContext)
    const [professional_photo, setProfessionalPhoto] = useState()
    const [profileLogo, setProfileLogo] = useState<File | string | null | undefined>(null);
    const [portfolioLoader, setPortfolioLoader] = useState<boolean>(false)
    const [listingsLoader, setListingsLoader] = useState<boolean>(false)
    const [servicesLoader, setServicesLoader] = useState<boolean>(false)
    const [reviewsLoader, setReviewsLoader] = useState<boolean>(false)
    const [certLoader, setCertLoader] = useState<boolean>(false)
    const [articleLoader, setArticleLoader] = useState<boolean>(false)
    const [realtorLoader, setRealtorLoader] = useState<boolean>(false)
    const [brokerLoader, setBrokerLoader] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [data, setData] = useState([]);
    const [selectedListing, setSelectedListing] = useState<any>()
    const initialDays: any = [];
    const [days, setDays] = useState(initialDays);
    const [eventDetails, setEventDetails] = useState({
        location: "",
        event_type: "",
    });

    const [profDetails, setProfDetails] = useState({
        full_name: "",
        Experience: "",
        phone: "",
        email: "",
        city: "",
        social_links: [],
        promo_text: "",
        promo_code: "",
    });
    const [profAgentDetails, setProfAgentDetails] = useState({
        Agency_name: "",
        Agency_bio: "",
        Expertise: "",
        Tax_number: "",
        Service_area: "",
    })
    const [profileCustomization, setProfileCustomization] = useState({
        Custom_cta_button: "",
        url_link: "",
        brand_color: ""
    })

    useEffect(() => {
        const formatDates = (dates: any) => {
            const formatted = dates.map((date: any) => {
                return new Date(date) // You can customize the format here
            });
            return formatted;
        };

        if (selectedListing?.event?.attributes?.dates?.length > 0) {
            const formatted = formatDates(selectedListing?.event?.attributes?.dates);
            setDays(formatted);
        } else {
            setDays([])
        }

    }, [selectedListing])

    // for the professional profile customization
    useEffect(() => {
        if (prof && prof.data && prof.data.attributes) {
            setProfileCustomization({
                Custom_cta_button: prof.data.attributes.Custom_cta_button || "",
                url_link: prof.data.attributes.url_link || "",
                brand_color: prof.data?.attributes.brand_color || "",

            });
        }
    }, [prof])

    // for the  professional profle
    useEffect(() => {
        if (prof && prof.data && prof.data.attributes) {
            setProfDetails({
                full_name: prof.data.attributes.full_name || "",
                Experience: prof.data.attributes.Experience || "",
                phone: prof.data.attributes.phone || "",
                email: prof.data.attributes.email || "",
                city: prof.data.attributes.city || "",
                social_links: prof.data.attributes.social_links || [],
                promo_text: prof.data.attributes.promo_text || "",
                promo_code: prof.data.attributes.promo_code || "",
            });
        }
    }, [prof]);

    // for the agency details, 
    useEffect(() => {
        if (agency && agency.data && agency.data.attributes) {
            setProfAgentDetails({
                Agency_name: agency?.data?.attributes.Agency_name || "",
                Agency_bio: agency?.data?.attributes.Agency_bio || "",
                Expertise: agency?.data?.attributes.Expertise || "",
                Tax_number: agency?.data?.attributes.Tax_number || "",
                Service_area: agency?.data?.attributes.Service_area || "",
            });
        }
    }, [agency]);

    return (
        <ProfSettingsContext.Provider value={{ realtorLoader, data, setData, setReviewsLoader, reviewsLoader, setRealtorLoader, brokerLoader, setBrokerLoader, eventDetails, setEventDetails, banner, days, setDays, selectedListing, setSelectedListing, profDetails, articleLoader, setArticleLoader, servicesLoader, setServicesLoader, certLoader, setCertLoader, listingsLoader, setListingsLoader, portfolioLoader, setPortfolioLoader, profileCustomization, setProfileCustomization, profAgentDetails, setProfAgentDetails, professional_photo, setProfessionalPhoto, profileLogo, setProfileLogo, setProfDetails, setBanner, bannerLoader, setBannerLoader, isEditing, setIsEditing }}>
            {children}
        </ProfSettingsContext.Provider>
    )
}

export { ProfSettingsContextProvider };