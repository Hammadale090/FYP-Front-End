"use client";

import { useGetListings } from "@/hooks/useGetListings";
import { useGetPotentialClient } from "@/hooks/useGetPotentialClient";
import { createContext, useState } from "react";

// @ts-ignore
export const FeedContext = createContext();

function FeedContextProvider(props: any) {
  const [tab, setTab] = useState<number>(0);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [myFilters, setMyFilters] = useState({});

  const [sortingOption, setSortingOption] = useState("default");

  const handleSortingChange = (value: string) => {
    setSortingOption(value);
  };

  const potentialClients = useGetPotentialClient();
  const properties = useGetListings(true);

  return (
    <FeedContext.Provider
      value={{
        tab,
        setTab,
        showFilters,
        setShowFilters,
        sortingOption,
        handleSortingChange,
        potentialClients,
        properties,
        myFilters,
        setMyFilters,
      }}
    >
      {props.children}
    </FeedContext.Provider>
  );
}

export { FeedContextProvider };
