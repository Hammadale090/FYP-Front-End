"use client";
import React, { useContext } from "react";
import FeedNavbar from "./components/FeedNavbar";
import { Divider } from "@mantine/core";
import { FeedContext } from "@/context/FeedContext";
import DefaultFeed from "./DefaultFeed";
import PropertiesFeed from "./PropertiesFeed";
import TopRealtorFeed from "./TopRealtorFeed";
import TopBrokerFeed from "./TopBrokerFeed";
import FeaturedPropertyListing from "./components/FeaturedPropertyListing";
import { AuthContext } from "@/context/AuthContext";
import PotentailClientFeed from "./PotentialClientFeed";

import DefaultFeedForProfessionals from "./components/DefaultFeedForProfessionals";

type Props = {};

const Feed = (props: Props) => {
  const { tab, showFilters } = useContext<any>(FeedContext);
  const { userRole } = useContext<any>(AuthContext);
  return (
    <>
      {userRole == "user" ? (
        <NormalUserFeed />
      ) : (
        <ProfessionalFeed />
      )}
    </>
  );
};

export default Feed;

const ProfessionalFeed = () => {
  const { tab, showFilters } = useContext<any>(FeedContext);
  const { userRole } = useContext<any>(AuthContext);

  return (
    <section className="w-full md:max-w-[80vw] ">
      <Divider className="hidden md:flex" my="sm" />

      <div className="flex">
        {/* filter properties component*/}

        <div className=" md:mx-auto my-7 flex flex-col space-y-8 w-full ">
          {/* Featured property Listings */}
          <FeaturedPropertyListing isFeatured={false} />
          {/* the feed header that contains the tab toggle */}
          <FeedNavbar
            options={["Default Feed", "Properties", "Potential Clients"]}
          />

          {/* shows the feed accordingly to their tabs */}
          {tab === 0 ? (
            <DefaultFeedForProfessionals />
          ) : tab === 1 ? (
            <PropertiesFeed isProfessionalListingFeed={true} />
          ) : tab === 2 ? (
            <PotentailClientFeed />
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};


const NormalUserFeed = () => {
  const { tab, showFilters } = useContext<any>(FeedContext);
  const { userRole } = useContext<any>(AuthContext);

  return (
    <section className="w-full md:max-w-[80vw] ">
      <Divider className="hidden md:flex" my="sm" />

      <div className="flex">
        {/* filter properties component*/}

        <div className=" md:mx-auto my-7 flex flex-col space-y-8 w-full ">
          {/* Featured property Listings */}
          <FeaturedPropertyListing isFeatured={true} />
          {/* the feed header that contains the tab toggle */}
          <FeedNavbar
            options={[
              "Default Feed",
              "Properties",
              "Top Realtors",
              "Top Brokers",
            ]}
          />

          {/* shows the feed accordingly to their tabs */}
          {tab === 0 ? (
            <DefaultFeed  />
          ) : tab === 1 ? (
            <PropertiesFeed />
          ) : tab === 2 ? (
            <TopRealtorFeed />
          ) : (
            <TopBrokerFeed />
          )}
        </div>
      </div>
    </section>
  )
}
