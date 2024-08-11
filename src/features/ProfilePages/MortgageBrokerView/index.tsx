"use client";
import React, { useContext, useEffect, useState } from "react";
import AgentProfDetails from "./components/AgentProfDetails";
import { useSession } from "next-auth/react";
import AgentHighlightedEvents from "./components/AgentHighlightedEvents";
import AgentCertifications from "./components/AgentCertifications";
import AgentPortfolio from "./components/AgentPortfolio";
import AgentServices from "./components/AgentServices";
import AgentEducationalArticles from "./components/AgentEducationalArticles";
import AgentHero from "./components/AgentHero";
import AgentPromo from "./components/AgentPromo";
import { useParams } from "next/navigation";
import {
  AgencyData,
  Profile,
  ProfileSettings,
  UserData,
} from "@/context/types";
import { fetcher } from "@/lib/fetchers";
import { AuthContext } from "@/context/AuthContext";
import { BiLoaderAlt } from "react-icons/bi";
import AgentReview from "../RealtorView/components/AgentReview";
import AgentTestimonials from "../RealtorView/components/AgentTestimonials";

type Props = {};

const MortgageBrokerView = (props: Props) => {
  const params = useParams();
  const { slug } = params;

  const { jwt, profileId: profId } = useContext(AuthContext);
  const [profileBanner, setProfileBanner] = useState<string>("");
  const [profile, setProfile] = useState<Profile>();
  const [profileId, setProfileId] = useState<string>();
  const [user, setUser] = useState<UserData>();
  const [prof, setProf] = useState<any>();
  const [agency, setAgency] = useState<AgencyData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async (slug: any) => {
      setLoading(true);
      return fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/client-profiles?filters[user][id][$eq]=${slug}&populate[0]=user&populate[1]=profile_pic&populate[2]=professional_profile.Banner_photo&populate[3]=professional_profile.professional_photo&populate[4]=professional_profile.agency&populate[5]=professional_profile.client_profile.user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
        .then((data) => {
          setProfile(data?.data[0]);
          setProfileId(data?.data[0]?.id);
          setUser(data?.data[0]?.attributes?.user);
          setAgency(
            data?.data[0]?.attributes?.professional_profile?.data?.attributes
              ?.agency
          );
          setProf(data?.data[0]?.attributes?.professional_profile);
          setProfileBanner(
            data?.data[0]?.attributes?.professional_profile?.data?.attributes
              ?.Banner_photo?.data?.attributes?.url
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log("An error occured", error);
        });
    };

    if (slug && jwt) {
      getUser(slug);
    }
  }, [slug, jwt]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex justify-center">
          {" "}
          <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* the header */}
      <h1 className="text-[#11142D] text-[25px] font-bold">
        Mortgage Broker Page
      </h1>

      {/* the hero section(Join us, Open house tonight!!) */}
      <AgentHero profileBanner={profileBanner} />

      <AgentPromo slug={slug} />

      {/* Agent details */}
      <AgentProfDetails
        prof={prof}
        agency={agency}
        user={user}
        profile={profile}
      />

      {/* Highlighted  */}
      {/* <AgentHighlightedEvents /> */}

      {/* Certifications Awards and Achievements */}
      <AgentCertifications slug={profileId} />

      {/* Agent Portfolio */}
      <AgentPortfolio slug={profileId} />

      {/* Agent Services */}
      <AgentServices slug={profileId} />

      {/* educational articles */}
      <AgentEducationalArticles slug={profileId} />

      {/* the testimonials */}
      <AgentTestimonials slug={slug} />

      {/* Write a review to the agent */}
      {
        prof?.data?.attributes?.client_profile?.data?.id !== profId && (
          <AgentReview id={prof?.data?.attributes?.client_profile?.data?.attributes?.user?.data?.id} />
        )
      }
    </div>
  );
};

export default MortgageBrokerView;
