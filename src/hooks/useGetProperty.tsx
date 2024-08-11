'use client'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { fetcher } from '@/lib/fetchers';
import { ProfSettingsContext } from '@/context/ProfSettingsContext';
import { ListingContext } from '@/context/ListingContext';
import { getProperty, updateProperty, uploadImage } from '@/features/Property/function';
import { useParams, useSearchParams } from 'next/navigation';

interface Features {
    [key: string]: boolean;
}

export function useGetProperty(param?: string) {
    const { profileId, jwt } = useContext(AuthContext)
    const {
        loading,
        setLoading,
        propertyData,
        setPropertyData,
        gallery,
        setGallery,
        userGeneratedShowcase,
        setUserGeneratedShowcase,
        energyEfficiencyMetrics,
        setEnergyEfficiencyMetrics,
        features,
        setFeatures,
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
        deleteUserGeneratedImage,
        createPropertyHandler,
        setUseR
    }: any = useContext(ListingContext)

    const params = useParams();
    const { slug } = params;

    useEffect(() => {
        const getListings = async () => {
            setLoading(true);
            try {
                const property = await getProperty(jwt, slug);
                

                if (property?.data) {
                    const { attributes } = property.data;
                    setPropertyData(property.data);
                    setOverview(attributes.overview);
                    setGallery(attributes.Gallery?.data);
                    setUserGeneratedShowcase(attributes.user_generated_showcase?.data);
                    setEnergyEfficiencyMetrics(attributes.energy_efficiency_metrics);
                    setFeatures(attributes.features);
                    setfavourites(attributes.favourites);
                    setFurnitureSuggestions(attributes.furnitureSugesstions);
                    setInteractiveFloorPlans(attributes.interactiveFloorPlans);
                    setAdditionalInformation(attributes.additional_information);
                    setCoverPhoto(attributes.coverPhoto?.data);
                    setPropertyFields({
                        name: attributes.name,
                        description: attributes.description,
                        type: attributes.type,
                        address: attributes.address,
                        zip: attributes.zip,
                        area: attributes.area,
                        state: attributes.state,
                        city: attributes.city,
                        country: attributes.country,
                        location: attributes.location,
                        price: attributes.price,
                        predictedPrice: attributes.predictedPrice,
                        safetyRatings: attributes.safetyRatings,
                        videoUrl: attributes.videoUrl,
                        status: attributes.status,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (param === 'edit' || param === 'created' && slug) {
            getListings();
        }
    }, [param, profileId, jwt]);


    useEffect(() => {
        const fetchData = async (address: string) => {
            try {
                // Fetch current weather
                const currentWeatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${process.env.NEXT_PUBLIC_WEATHER_APP_ID}`);
                if (!currentWeatherRes.ok) {
                    throw new Error("Failed to fetch current weather data.");
                }
                const currentWeatherData = await currentWeatherRes.json();
                setCurrentWeather(currentWeatherData);

                // Fetch hourly forecast
                const hourlyForecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=${process.env.NEXT_PUBLIC_WEATHER_APP_ID}`);
                if (!hourlyForecastRes.ok) {
                    throw new Error("Failed to fetch hourly forecast data.");
                }
                const hourlyForecastData = await hourlyForecastRes.json();
                calculateHourlyWeather(hourlyForecastData)
                // setHourlyWeather(hourlyForecastData);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        if (propertyFields?.city && propertyFields?.city !== '') {

            fetchData(propertyFields?.city || '');
        }
    }, [propertyFields?.city]);


    useEffect(() => {
        const addNewViewToListingHandler = async () => {

            if (propertyData) {
                const views = propertyData?.attributes?.views || [];

                // Check if the profileId is already in the views array
                const isViewed = views?.includes(profileId);

                // If not viewed, add the profileId to the views array
                if (!isViewed) {
                    const updatedViews = [...views, profileId];
                    const data = { views: updatedViews };

                    try {
                        await updateProperty(jwt, propertyData?.id, data);
                    } catch (error) {
                        console.error('Error updating property:', error);
                    }
                }

            }
        }

        if (propertyData) {
            addNewViewToListingHandler()
        }

    }, [propertyData])


    function calculateHourlyWeather(forecastData: any) {
        if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
            console.error("Invalid forecast data.");
            return;
        }

        // Take the first four items from the forecast data list
        var forecastForNextFourHours = forecastData.list.slice(0, 4);
        setHourlyWeather(forecastForNextFourHours);

    }

}
