import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { fetcher } from "@/lib/fetchers";
import { ProfSettingsContext } from "@/context/ProfSettingsContext";
import { defaultPreferences } from "@/features/Preferences/defaultPreferences";
import { useToast } from "@/components/ui/use-toast";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

export function useGetPreferences() {
  const { profileId, jwt, professionalId } = useContext(AuthContext);
  //   const { portfolioLoader } = useContext(ProfSettingsContext);

  const [preferences, setPreferences] = useState<any>();
  const [professionalPreferences, setProfessionalPreferences] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  async function getPreferences() {
    setLoading(true);
    const preferences = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/preferences?filters[client_profile][id][$eq]=${profileId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (preferences?.data) {
      setPreferences({
        id: preferences?.data[0]?.id,
        ...preferences?.data[0]?.attributes,
      });
    }

    setLoading(false);
  }

  async function updatePreferences(id: any, data = null) {
    let _preferences = data || preferences;

    try {
      const response = await fetcher(
        id
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}/preferences/${id}`
          : `${process.env.NEXT_PUBLIC_STRAPI_URL}/preferences`,
        {
          method: !id ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: {
              ..._preferences,
              client_profile: profileId,
            },
          }),
        }
      );

      console.log("update response is ", response);
      if (!response.data.id) {
        throw new Error("Failed to update preferences");
      }
      toast({
        description: "Updated Successfully",
        action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
      });
      return true;
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast({
        description: "Update Failed",
        action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
      });
      return false;
    }
  }
  async function getProfessionalPreferences() {
    setLoading(true);
    const preferences = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-preferences?filters[professional_profile][id][$eq]=${professionalId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (preferences?.data) {
      setProfessionalPreferences({
        id: preferences?.data[0]?.id,
        ...preferences?.data[0]?.attributes,
      });
    }

    setLoading(false);
  }

  async function updateProfessionalPreferences(id: any, data = null) {
    let _preferences = data || professionalPreferences;
    console.log({ _preferences });
    console.log({ professionalId });
    try {
      const response = await fetcher(
        id
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-preferences/${id}`
          : `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-preferences`,
        {
          method: !id ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: {
              ..._preferences,
              professional_profile: professionalId,
            },
          }),
        }
      );

      console.log("update response is ", response);
      if (!response.data.id) {
        throw new Error("Failed to update preferences");
      }
      toast({
        description: "Updated Successfully",
        action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
      });
      return true;
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast({
        description: "Update Failed",
        action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
      });
      return false;
    }
  }

  useEffect(() => {
    if(profileId && professionalId){
      getPreferences();
      getProfessionalPreferences();
    }
    // updatePreferences(1);
  }, [
    profileId,
    professionalId,
    // portfolioLoader
  ]);

  return {
    loading,
    preferences,
    id: preferences?.id,
    setPreferences,
    updatePreferences,
    getProfessionalPreferences,
    updateProfessionalPreferences,
    professional_preferences_id: professionalPreferences?.id,
    professionalPreferences,
  };
}
