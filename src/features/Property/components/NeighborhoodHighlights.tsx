import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import haversine from 'haversine';

type Props = {
    address?: string;
    selectedTab?: string;
    showMap?: boolean;
};

const NeighborhoodHighlights: React.FC<Props> = ({ address, selectedTab, showMap }) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const placesService = useRef<google.maps.places.PlacesService | null>(null);
    const markerRefs = useRef<google.maps.Marker[]>([]);
    const [places, setPlaces] = useState<any[] | undefined | null>([]);

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
            version: "weekly",
            libraries: ["places", "geometry"],
        });

        let cleanup: () => void = () => { };

        if (address && selectedTab) {
            loader.load().then(() => {
                setMapLoaded(true);
                if (mapRef.current) {
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ address: address }, (results, status) => {
                        if (status === "OK" && results && results.length > 0) {
                            const location = results[0].geometry.location;
                            const map = new google.maps.Map(mapRef.current!, {
                                center: location,
                                zoom: 15,
                            });

                            placesService.current = new google.maps.places.PlacesService(map);
                            const request: google.maps.places.PlaceSearchRequest = {
                                location: location,
                                radius: 5000,
                                type: selectedTab?.toLowerCase(),
                                rankBy: google.maps.places.RankBy.PROMINENCE,
                            };

                            placesService.current.nearbySearch(request, (results, status) => {
                                if (status === google.maps.places.PlacesServiceStatus.OK) {
                                    const topPlaces = results?.slice(0, 6);
                                    calculateDistances(location, topPlaces);
                                    if (map) {
                                        cleanup = showPlacesOnMap(map, topPlaces);
                                    }
                                } else {
                                    console.error("Nearby search request failed:", status);
                                }
                            });
                        } else {
                            console.error(`Geocode was not successful for the following reason: ${status}`);
                        }
                    });
                } else {
                    console.error("mapRef is not initialized.");
                }
            }).catch((error) => {
                console.error("Error loading Google Maps API:", error);
            });
        }

        return () => {
            cleanup(); // Cleanup function to remove markers
        };
    }, [address, selectedTab, showMap]);

    const calculateDistances = (origin: google.maps.LatLng | undefined, places: google.maps.places.PlaceResult[] | undefined) => {
        if (!origin || !places) {
            return;
        }

        const placesWithDistance = places.map(place => {
            const destination = place.geometry?.location;
            if (!destination) {
                return place;
            }

            const distance = haversine({
                latitude: origin.lat(),
                longitude: origin.lng(),
            }, {
                latitude: destination.lat(),
                longitude: destination.lng(),
            }, { unit: 'km' });

            return {
                ...place,
                distance: distance,
            };
        });

        setPlaces(placesWithDistance);
    };

    const showPlacesOnMap = (map: google.maps.Map, places: google.maps.places.PlaceResult[] | undefined) => {
        const markers: google.maps.Marker[] = [];

        if (!places) {
            return () => { }; // No-op cleanup function
        }

        places.forEach((place, index) => {
            const marker = new google.maps.Marker({
                position: place.geometry?.location!,
                map: map,
                title: place.name,
                label: (index + 1).toString(),
            });
            markers.push(marker);
        });

        // Return cleanup function to remove markers from the map
        return () => {
            markers.forEach(marker => {
                marker.setMap(null);
            });
        };
    };

    return (
        <>
            <div ref={mapRef} className={`${showMap ? 'w-full h-[400px]' : 'w-0 h-0'}`} />

            {
                !showMap &&
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-6 ">
                    {places?.map((place, index) => (
                        <div
                            className="flex flex-row border-b-[1px] justify-between items-center border-b-[#F3F3F3] space-y-2 mr-6 mt-4"
                            key={index}
                        >
                            <h1 className="text-[#292640] text-[14px] font-[600] leading-[18px] tracking-[0.5px]">
                                {place?.name}
                            </h1>
                            <p className="text-[#383838] text-[14px]">{`${place?.distance.toFixed(2)} Km away`}</p>
                        </div>
                    ))}
                </div>
            }
        </>
    );
};

export default NeighborhoodHighlights;
