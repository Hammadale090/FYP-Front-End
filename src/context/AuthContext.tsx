"use client";

import { fetcher } from "@/lib/fetchers";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import {
  AgencyData,
  AuthProps,
  Profile,
  ProfileSettings,
  UserData,
} from "./types";
import { setOnlinePresence } from "@/lib/onlinePresence";

// @ts-ignore
export const AuthContext = createContext<AuthProps>({});

type Props = {
  children: React.ReactNode;
};

function AuthContextProvider({ children }: Props) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>();
  const [profileEmail, setProfileEmail] = useState<string>("");
  const [profilepic, setProfilePic] = useState<string>("");
  const [userId, setUserId] = useState<number>();
  const [userRole, setUserRole] = useState<string>("");
  const [profile, setProfile] = useState<Profile>();
  const [user, setUser] = useState<UserData>();
  const [prof, setProf] = useState<ProfileSettings>();
  const [professionalId, setProfessionalId] = useState<string>("");
  const [logoId, setLogoId] = useState<any>()
  const [agency, setAgency] = useState<AgencyData>();
  const [profileBanner, setProfileBanner] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);
  // get the client profile

  // const { profile, prof, agency, user } = useContext(AuthContext)

  useEffect(() => {
    const getUser = async (id: any) => {
      setLoading(true);
      return fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/client-profiles?filters[user][id][$eq]=${id}&populate[0]=user&populate[1]=profile_pic&populate[2]=professional_profile.Banner_photo&populate[3]=professional_profile.professional_photo&populate[4]=professional_profile.agency&populate[5]=professional_profile.profile_logo`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.data.jwt}`,
          },
        }
      )
        .then((data) => {
          setProfileId(data?.data[0]?.id);
          setProfile(data?.data[0]);
          setProfessionalId(
            data?.data[0]?.attributes?.professional_profile?.data?.id
          );
          setUser(data?.data[0]?.attributes?.user);
          setProfileEmail(
            data?.data[0]?.attributes?.user?.data?.attributes?.email
          );
          setUserId(data?.data[0]?.attributes?.user?.data?.id);
          setProfilePic(
            data?.data[0]?.attributes?.profile_pic?.data?.attributes?.url
          );
          setAgency(
            data?.data[0]?.attributes?.professional_profile?.data?.attributes
              ?.agency
          );
          setProf(data?.data[0]?.attributes?.professional_profile);
          setLogoId(data?.data[0]?.attributes?.professional_profile?.data?.attributes?.profile_logo?.data?.id)
          setProfileBanner(
            data?.data[0]?.attributes?.professional_profile?.data?.attributes
              ?.Banner_photo?.data?.attributes?.url
          );
          setUserRole(data?.data[0]?.attributes?.role);
          setLoading(false);
        })
        .catch((error) => {
          console.log("An error occured", error);
        });
    };

    if (session?.user?.id) {
      getUser(session?.user?.id);
    }

  }, [session, reload]);

  useEffect(() => {
    userId && setOnlinePresence(userId);
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{
        jwt: session?.user.data.jwt,
        reload,
        setReload,
        user,
        profileId,
        profileEmail,
        userId,
        prof,
        profileBanner,
        userRole,
        agency,
        professionalId,
        logoId,
        setLogoId,
        loading,
        profile,
        profilepic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
