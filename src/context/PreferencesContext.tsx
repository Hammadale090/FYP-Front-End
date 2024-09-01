"use client";

import { useToast } from "@/components/ui/use-toast";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { fetcher } from "@/lib/fetchers";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

// @ts-ignore
export const PreferencesContext = createContext<any>();

function PreferencesContextProvider(props: any) {
  const { profileId, jwt, professionalId, userRole } = useContext(AuthContext);
  //   const { portfolioLoader } = useContext(ProfSettingsContext);

  const [preferences, setPreferences] = useState<any>();
  const [initialPreferences, setInitialPreferences] = useState<any>();
  const [focusInputID, setFocusInputID] = useState<any>();

  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  async function getPreferences() {
    let url;

    if (userRole == "user" && profileId) {
      url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/preferences?filters[client_profile][id][$eq]=${profileId}`;
    } else if (professionalId) {
      url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-preferences?filters[professional_profile][id][$eq]=${professionalId}`;
    }
    setLoading(true);
    const preferences = await fetcher(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (preferences?.data) {
      setPreferences({
        id: preferences?.data[0]?.id,
        ...preferences?.data[0]?.attributes,
      });
      setInitialPreferences({
        id: preferences?.data[0]?.id,
        ...preferences?.data[0]?.attributes,
      });
    }

    setLoading(false);
  }

  async function updatePreferences(id: any, data = null) {
    let _preferences = data || preferences;

    let url;
    let method = !id ? "POST" : "PUT";

    if (userRole == "user") {
      url = id
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}/preferences/${id}`
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}/preferences`;
      _preferences.client_profile = profileId;
    } else {
      url = id
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-preferences/${id}`
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-preferences`;
      _preferences.professional_profile = professionalId;
    }

    try {
      const response = await fetcher(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            ..._preferences,
          },
        }),
      });

      if (!response.data.id) {
        throw new Error("Failed to update preferences");
      }
      setInitialPreferences(preferences);
      toast({
        description: "Completed Successfully",
        action: <TiTick className="text-green-500" />,
      });
      return true;
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast({
        description: "Update Failed",
      });
      return false;
    }
  }

  useEffect(() => {
    (profileId || professionalId) && getPreferences();

    // updatePreferences(1);
  }, [
    profileId,
    professionalId,
    // portfolioLoader
  ]);

  return (
    <PreferencesContext.Provider
      value={{
        loading,
        preferences,
        id: preferences?.id,
        setPreferences,
        updatePreferences,
        initialPreferences,
        focusInputID,
        setFocusInputID,
      }}
    >
      {props.children}
    </PreferencesContext.Provider>
  );
}

export { PreferencesContextProvider };
