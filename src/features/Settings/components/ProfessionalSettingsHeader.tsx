"use client";
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React, { useContext } from 'react'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { useToast } from '@/components/ui/use-toast'
import { AuthContext } from '@/context/AuthContext'
import { ProfSettingsContext } from '@/context/ProfSettingsContext'
import { createEvent, updateBannerPic, updateEvent, updateProfessionalAgencyDetails, updateProfessionalDetails, updateProfessionalPic } from '../functions/functions';
import { useRouter } from 'next/navigation';
import { validateProfileAgentFields, validateProfileDetailFields } from '@/utils/Validations';

type Props = {
    header: string
}

const ProfessionalSettingsHeader = ({ header }: Props) => {
    const { days, eventDetails, selectedListing, banner, setBannerLoader, bannerLoader, profDetails, professional_photo, profAgentDetails, profileCustomization, profileLogo, setIsEditing } = useContext(ProfSettingsContext)
    const { jwt, professionalId, prof, agency, profileId } = useContext(AuthContext)
    const { toast } = useToast();
    const router = useRouter();


    // function to check for changes
    const checkForChanges = (initialSettings: any, currentSettings: any) => {
        return Object.keys(currentSettings).some(
            (key) => currentSettings[key] !== initialSettings[key]
        );
    }

    const updateProfile = async () => {
        // for updating the professional banner

        if (selectedListing && selectedListing?.id) {

            let eventId = selectedListing?.eventId

            if (!selectedListing.eventId) {
                let data = {
                    client_profile: profileId,
                    professional_profile: professionalId,
                    listing: selectedListing.id
                }
                if (setBannerLoader && jwt) {
                    eventId = await createEvent(data, setBannerLoader, jwt)
                }

            }

            if (setBannerLoader && eventDetails) {
                let data = {
                    location: eventDetails.location,
                    event_type: eventDetails.event_type,
                    dates: days
                }
                const eventUpdate = await updateEvent(data, setBannerLoader, jwt, eventId)
            }
            toast({
                description: "Event added successfully",
                action: (
                    <IoCheckmarkDoneCircleSharp className='text-blue' />
                ),
            });


        }
        if (banner) {
            try {
                if (setBannerLoader) {
                    const profileUpdate = await updateBannerPic(banner, setBannerLoader, jwt, professionalId)
                }
                toast({
                    description: "Professional Banner changed successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: "Something went wrong",
                });
            }
        }

        // for updating the professional photo
        if (professional_photo) {
            try {
                if (setBannerLoader) {
                    const profileUpdate = await updateProfessionalPic(professional_photo, setBannerLoader, jwt, professionalId)
                }
                toast({
                    description: "Professional Profile pic changed successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: "Something went wrong",
                });
            }
        }

        // for updating the user details(full name, experience, phone number, email, city, promo_code, promo,Text)
        let initialSettings = {
            full_name: prof?.data?.attributes.full_name ? prof.data?.attributes.full_name : "",
            Experience: prof?.data?.attributes?.Experience ? prof?.data?.attributes?.Experience : "",
            phone: prof?.data?.attributes?.phone ? prof?.data?.attributes?.phone : "",
            email: prof?.data?.attributes?.email ? prof?.data?.attributes?.email : "",
            city: prof?.data?.attributes?.city ? prof?.data?.attributes?.city : "",
            promo_text: prof?.data?.attributes?.promo_text ? prof?.data?.attributes?.promo_text : "",
            promo_code: prof?.data?.attributes?.promo_code ? prof?.data?.attributes?.promo_code : "",

        }
        if (checkForChanges(initialSettings, profDetails)) {
            if (!validateProfileDetailFields(profDetails, toast)) {
                return;
            }
            try {
                if (setBannerLoader) {
                    const profileUpdate = await updateProfessionalDetails(profDetails, setBannerLoader, jwt, professionalId)
                }
                setIsEditing(false)
                toast({
                    description: "Professional Details Updated successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: "Something went wrong",
                });
            }
        }


        // for updating the agency details of the professional user
        let AgencyInitialSettings = {
            Agency_name: agency?.data?.attributes.Agency_name ? agency.data?.attributes.Agency_name : "",
            Agency_bio: agency?.data?.attributes.Agency_bio ? agency.data?.attributes.Agency_bio : "",
            Expertise: agency?.data?.attributes.Expertise ? agency.data?.attributes.Expertise : "",
            Tax_number: agency?.data?.attributes.Tax_number ? agency.data?.attributes.Tax_number : "",
            Service_area: agency?.data?.attributes.Service_area ? agency.data?.attributes.Service_area : "",
        }
        if (checkForChanges(AgencyInitialSettings, profAgentDetails)) {
            if (!validateProfileAgentFields(profAgentDetails, toast)) {
                return;
            }
            try {
                if (setBannerLoader) {
                    const profileAgentUpdate = await updateProfessionalAgencyDetails(profAgentDetails, setBannerLoader, jwt, agency?.data?.id, profileId, professionalId)
                }
                toast({
                    description: "Professional Agent Details Updated successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: "Something went wrong",
                });
            }
        }


        // for updating the profile customization information of the professional user
        let ProfCustInitialSettings = {
            Custom_cta_button: prof?.data?.attributes.Custom_cta_button ? prof?.data?.attributes.Custom_cta_button : "",
            url_link: prof?.data?.attributes.url_link ? prof?.data?.attributes.url_link : ""
        }
        if (checkForChanges(ProfCustInitialSettings, profileCustomization)) {
            try {
                if (setBannerLoader) {

                    let updatedProfileCustomization: any = { ...profileCustomization }

                    if (profileLogo) {
                        if (profileLogo) {
                            updatedProfileCustomization = {
                                ...profileCustomization,
                                profile_logo: profileLogo
                            }
                        }
                    }
                    const profileUpdate = await updateProfessionalDetails(updatedProfileCustomization, setBannerLoader, jwt, professionalId)
                }
                toast({
                    description: "Professional Customization Updated successfully",
                    action: (
                        <IoCheckmarkDoneCircleSharp className='text-blue' />
                    ),
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: "Something went wrong",
                });
            }
        }

    }

    return (
        <div className='flex flex-col max-md:space-y-2 md:flex-row justify-between'>
            {/* the header */}
            <h1 className='text-[#11142D] text-[25px] font-bold '>{header} Profile Page</h1>

            <div className='flex max-md:flex-col md:items-center max-md:space-y-2 md:space-x-4'>
                <IconShowcaseBox onClick={() => {
                    router.push("/dashboard/generate-assets")
                }} text='GENERATE A.I. ASSETS' width='w-full md:w-[220px]' textCenter noBorder rounded='4px' color='#3EB87F' py='12px' textCN='text-white text-[14px] font-semibold leading-[24px] tracking-[0.5px]' />
                <IconShowcaseBox loading={bannerLoader} onClick={updateProfile} text='SAVE CHANGES' width='w-full md:w-[220px]' textCenter noBorder rounded='4px' color='#3EB87F' py='12px' textCN='text-white text-[14px] font-semibold leading-[24px] tracking-[0.5px]' />
            </div>
        </div>
    )
}

export default ProfessionalSettingsHeader