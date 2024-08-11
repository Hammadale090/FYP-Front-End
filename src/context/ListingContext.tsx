"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Listing } from "./types";
import { AuthContext } from "./AuthContext";
import {
  createProperty,
  destroyImage,
  getProperty,
  updateProperty,
  uploadImage,
} from "@/features/Property/function";
import { fetcher } from "@/lib/fetchers";
import { uuid } from "uuidv4";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";
import { uploadListingRefferelCode } from "@/features/Settings/functions";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

// @ts-ignore
export const ListingContext = createContext();

function ListingContextProvider(props: any) {
  const initialState = {
    gallery: [],
    userGeneratedShowcase: [],
    energyEfficiencyMetrics: {
      energy_consumption: "",
      environmental_impact: "",
      solar_panel_output: "",
    },
    features: [],
    favourites: [],
    furnitureSuggestions: {
      description: "",
      videoUrl: "",
    },
    interactiveFloorPlans: {
      description: "",
      videoUrl: "",
    },
    overview: {
      type: "",
      bedrooms: "",
      bathrooms: "",
      garages: "",
      size: "",
      landSize: "",
      yearBuild: "",
      id: "",
    },
    additionalInformation: {
      additionalRooms: "",
      amenties: "",
      deposit: "",
      equipment: "",
      lastRemodelYear: "",
      poolSize: "",
    },
    coverPhoto: "",
    propertyFields: {
      name: "",
      description: "",
      type: "residential",
      address: "",
      zip: "",
      area: "",
      state: "",
      city: "",
      country: "",
      location: "",
      price: "",
      predictedPrice: "",
      safetyRatings: "",
      videoUrl: "",
      status: "active",
    },
    referredProfessionals: [],
  };

  const { profileId, professionalId, jwt } = useContext(AuthContext);
  const [weatherUrl, setWeatherUrl] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [useR, setUseR] = useState<string>("")
  const [propertyData, setPropertyData] = useState<any | null>(null);
  const [referred, setReferred] = useState<any | null>(
    initialState.referredProfessionals
  );
  const [gallery, setGallery] = useState<any[]>(initialState.gallery);
  const [userGeneratedShowcase, setUserGeneratedShowcase] = useState<any[]>(
    initialState.userGeneratedShowcase
  );
  const [energyEfficiencyMetrics, setEnergyEfficiencyMetrics] = useState<
    any | null
  >(initialState.energyEfficiencyMetrics);
  const [features, setFeatures] = useState<any[]>(initialState.features);
  const [favourites, setfavourites] = useState<any[]>(initialState.favourites);
  const [furnitureSuggestions, setFurnitureSuggestions] = useState<any | null>(
    initialState.furnitureSuggestions
  );
  const [interactiveFloorPlans, setInteractiveFloorPlans] = useState<
    any | null
  >(initialState.interactiveFloorPlans);
  const [overview, setOverview] = useState<any | null>(initialState.overview);
  const [additionalInformation, setAdditionalInformation] = useState<
    any | null
  >(initialState.additionalInformation);
  const [coverPhoto, setCoverPhoto] = useState<any | null>(
    initialState.coverPhoto
  );
  const [KeywordsPreferences, setKeywordsPreferences] = useState<any[]>([]);
  const [propertyFields, setPropertyFields] = useState<any>(
    initialState.propertyFields
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [galleryLoading, setGalleryLoading] = useState<boolean>(false);
  const [coverPhotoLoader, setCoverPhotoLoader] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [hourlyWeather, setHourlyWeather] = useState<any>(null);
  const [sort, setSort] = useState("recent");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setCoverPhotoLoader(true);
    try {
      if (file) {
        const coverImage = await uploadImage(jwt, file);
        console.log("coverImage output: ", coverImage);

        if (coverImage?.length > 0) {
          setCoverPhoto(coverImage[0]);
        }
      }
    } catch (error) {
      console.error("Error creating property:", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    } finally {
      setCoverPhotoLoader(false);
    }
  };

  const handleClickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUserGeneratedContentImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setLoading(true);
      const uploadedImages = await uploadImage(jwt, Array.from(files));
      setUserGeneratedShowcase((prev: any) => [...prev, ...uploadedImages]);
    } catch (error) {
      console.error("Error uploading images for Showcase:", error);
    } finally {
      setLoading(false); // Set loading to false to indicate loading is finished
    }
  };

  const handleGalleryImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setGalleryLoading(true);
      const galleryImage = await uploadImage(jwt, Array.from(files));
      const galleryImages = Array.isArray(galleryImage)
        ? galleryImage
        : [galleryImage];
      setGallery((prev: any) => [...prev, ...galleryImages]);
    } catch (error) {
      console.error("Error uploading image for Gallery:", error);
    } finally {
      setGalleryLoading(false); // Set loading to false to indicate loading is finished
    }
  };

  const deleteUserGeneratedImage = async (id: any) => {
    if (!id) return;
    try {
      await destroyImage(jwt, id);
      setUserGeneratedShowcase((prev) =>
        prev.filter((image) => image.id !== id)
      );
    } catch (err) {
      console.log("Error at Destroy User Generated Image: ", err);
    }
  };

  const deleteGalleryImage = async (id: any) => {
    if (!id) return;
    try {
      await destroyImage(jwt, id);
      setGallery((prev) => prev.filter((image) => image.id !== id));
    } catch (err) {
      console.log("Error at Destroy User Generated Image: ", err);
    }
  };

  // to send listing creeated referrer email
  const handleSendEmail = async (listing: number) => {
    const subject = "Property Invite!";

    const sendEmail = async (detail: any) => {
      let email = detail?.email;
      let randomDigitNumber = uuid();
      const body = `
                    <p>Accept Invitation to Property by clicking the link below:</p>
                    <p><a href="${process.env.NEXT_PUBLIC_WEBSITE_URL}/accept-invite?referral_code=${randomDigitNumber}&property=${listing}">Accept Property</a></p>
                 
                `;

      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, body }),
      });

      if (!res.ok) {
        throw new Error("Failed to send email");
      }

      const data = {
        listing: listing,
        invited_professional: detail?.id,
        referrer_code: randomDigitNumber,
        listing_owner: professionalId,
        status: "pending",
      };

      const referralResponse = await uploadListingRefferelCode(data, jwt);
    };

    const results = await Promise.all(
      referred.map((detail: any) => sendEmail(detail))
    );
    return results;
  };

  const setToInitial = async () => {
    setGallery(initialState.gallery);
    setUserGeneratedShowcase(initialState.userGeneratedShowcase);
    setEnergyEfficiencyMetrics(initialState.energyEfficiencyMetrics);
    setFeatures(initialState.features);
    setfavourites(initialState.favourites);
    setFurnitureSuggestions(initialState.furnitureSuggestions);
    setInteractiveFloorPlans(initialState.interactiveFloorPlans);
    setOverview(initialState.overview);
    setAdditionalInformation(initialState.additionalInformation);
    setCoverPhoto(initialState.coverPhoto);
    setPropertyFields(initialState.propertyFields);
    setKeywordsPreferences([]);
    setReferred(initialState.referredProfessionals);

    setWeatherUrl("");
    setUrlValue("");
  };

  const createPropertyHandler = async () => {
    setLoading(true);
    try {
      const data = {
        ...propertyFields,
        overview: overview,
        interactiveFloorPlans: interactiveFloorPlans,
        user_generated_showcase: userGeneratedShowcase,
        energy_efficiency_metrics: energyEfficiencyMetrics,
        coverPhoto: coverPhoto,
        Gallery: gallery,
        additional_information: additionalInformation,
        furnitureSugesstions: furnitureSuggestions,
        features: features,
        client_profile: profileId,
        professional_profile: professionalId,
      };

      const res = await createProperty(jwt, data);
      if (res.data.id) {
        let ress = await handleSendEmail(res.data.id);
      }
      if (res?.data) {
        toast({
          description: "Listing created successfully.",
          action: <IoCheckmarkCircleOutline className="text-green-500" />,
        });

        setToInitial();
      }

      // console.log("Create Property: ", res);

      if (res?.error) {
        toast({
          variant: "destructive",
          description: res?.error?.message,
        });
      }
    } catch (error) {
      console.error("Error creating property:", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePropertyHandler = async () => {
    setLoading(true);
    try {
      const data = {
        ...propertyFields,
        overview: overview,
        interactiveFloorPlans: interactiveFloorPlans,
        user_generated_showcase: userGeneratedShowcase,
        energy_efficiency_metrics: energyEfficiencyMetrics,
        coverPhoto: coverPhoto,
        additional_information: additionalInformation,
        furnitureSugesstions: furnitureSuggestions,
        features: features,
      };

      const res = await updateProperty(jwt, propertyData?.id, data);

      if (res.data) {
        toast({
          description: "Listing updated successfully",
          action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
        });
      }

      if (res?.error) {
        toast({
          variant: "destructive",
          description: res?.error?.message,
        });
      }

      console.log("Update Property: ", res);
    } catch (error) {
      console.error("Error updating property:", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSafetyScore = async (safetyRatings) => {
    setLoading(true);
    try {
      const data = {
        safetyRatings,
      };

      const res = await updateProperty(jwt, propertyData?.id, data);

      if (res.data) {
        console.log("Update Property: ", res);
      }
    } catch (error) {
      console.error("Error updating property:", error);
    } finally {
      setLoading(false);
    }
  };

  const addOrRemovePropertyFromfavourites = async (
    id: number | string,
    isAdd: boolean,
    favouritess: any[],
    setLoader: Dispatch<SetStateAction<boolean>>
  ) => {
    setLoader && setLoader(true);
    try {
      let updatedFavourites: any[];

      if (isAdd) {
        updatedFavourites = [...favouritess, profileId];
      } else {
        updatedFavourites = favouritess.filter((favId) => favId !== profileId);
      }

      const data = { favourites: updatedFavourites };
      const res = await updateProperty(jwt, id, data);

      console.log("Res of Add or Remove Property from Favourites: ", res);

      if (res.data) {
        toast({
          description: "Listing updated successfully",
          action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
        });
        return res?.data?.attributes?.favourites || [];
      }

      if (res?.error) {
        toast({
          variant: "destructive",
          description: res?.error?.message,
        });

        return null;
      }
    } catch (error) {
      console.error("Error Add or Remove List from Favourites:", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
      return null;
    } finally {
      setLoader && setLoader(false);
    }
  };

  return (
    <ListingContext.Provider
      value={{
        loading,
        setLoading,
        coverPhotoLoader,
        setCoverPhotoLoader,
        setToInitial,
        propertyData,
        galleryLoading,
        setPropertyData,
        referred,
        setReferred,
        gallery,
        sort,
        setSort,
        setGallery,
        userGeneratedShowcase,
        setUserGeneratedShowcase,
        KeywordsPreferences,
        setKeywordsPreferences,
        energyEfficiencyMetrics,
        setEnergyEfficiencyMetrics,
        useR,
        setUseR,
        features,
        setFeatures,
        weatherUrl,
        setWeatherUrl,
        urlValue,
        setUrlValue,
        favourites,
        setfavourites,
        furnitureSuggestions,
        setFurnitureSuggestions,
        interactiveFloorPlans,
        setInteractiveFloorPlans,
        overview,
        setOverview,
        additionalInformation,
        setAdditionalInformation,
        coverPhoto,
        setCoverPhoto,
        propertyFields,
        setPropertyFields,
        fileInputRef,
        currentWeather,
        setCurrentWeather,
        hourlyWeather,
        setHourlyWeather,
        handleFileChange,
        handleClickImage,
        handleUserGeneratedContentImageUpload,
        handleGalleryImageUpload,
        deleteUserGeneratedImage,
        deleteGalleryImage,
        createPropertyHandler,
        updatePropertyHandler,
        addOrRemovePropertyFromfavourites,
        updateSafetyScore,
      }}
    >
      {props.children}
    </ListingContext.Provider>
  );
}

export { ListingContextProvider };
