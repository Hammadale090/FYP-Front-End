import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type Props = {
    address: string;
};

function Map({ address }: Props) {
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const placesService = useRef<google.maps.places.PlacesService | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    // console.log("Receive Address: ", address);
    

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
            version: "weekly",
            libraries: ["places", "geometry"],
        });

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
                        markerRef.current = new google.maps.Marker({
                            position: location,
                            map: map,
                            title: "Geocoded Location",
                        });
                        placesService.current = new google.maps.places.PlacesService(map); // Initialize PlacesService here
                        // Perform nearby search
                        const request: google.maps.places.PlaceSearchRequest = {
                            location: location,
                            radius: 5000,
                            // type: "school,hospital,amusement_park,lodging,airport,shopping_mall,restaurant",
                            type: "airport",
                            rankBy: google.maps.places.RankBy.PROMINENCE, // Rank by prominence
                        };

                        placesService.current.nearbySearch(request, (results, status) => {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                // Process nearby search results
                                // console.log("Results of Nearby Search: ", results);
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
    }, [address]);

    return (
        <div style={{ height: "400px" }} ref={mapRef}></div>
    );
}

export default Map;
