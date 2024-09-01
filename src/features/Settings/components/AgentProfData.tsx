"use client";

import React, { useEffect, useState } from "react";
import AgentProfStatus from "./AgentProfStatus";
import { useGetListings } from "@/hooks/useGetListings";
import { useGetUserServices } from "@/hooks/useGetUserServices";
import { useGetPortfolios } from "@/hooks/useGetPortfolios";

type Props = {};

const AgentProfData = (props: Props) => {
  const [listingsData, setListingsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const { data, allData } = useGetListings();
  const { data: sData, allData: allServiceData } = useGetUserServices();
  const { data: pData, allData: allPData } = useGetPortfolios();
  const [portfolioData, setPortfolioData] = useState([]);
  console.log(listingsData);
  useEffect(() => {
    const loadData = () => {
      if (allData?.meta) {
        setListingsData(allData?.data);
      }
    };

    loadData();
  }, [allData, data]);

  useEffect(() => {
    const loadData = () => {
      if (allServiceData?.meta) {
        setServicesData(allServiceData?.data);
      }
    };

    loadData();
  }, [allServiceData, sData]);

  useEffect(() => {
    const loadData = () => {
      if (allPData?.meta) {
        setPortfolioData(allPData?.data);
      }
    };

    loadData();
  }, [allPData, pData]);

  return (
    <section className="md:grid xl:grid-cols-3 mt-10 md:grid-cols-2 max-md:flex max-md:flex-wrap max-md:space-y-3 max-md:justify-center">
      <AgentProfStatus
        header="Total Listings"
        data={[
          { name: "Listings", color: "#ff5353", value: listingsData?.length },
        ]}
        amount={listingsData?.length}
      />
      <AgentProfStatus
        header="Total Services"
        data={[
          { name: "Listings", color: "#ff5353", value: servicesData?.length },
        ]}
        amount={servicesData?.length}
      />
      <AgentProfStatus
        header="Total Portfolios"
        data={[
          { name: "Listings", color: "#ff5353", value: portfolioData?.length },
        ]}
        amount={portfolioData?.length}
      />
    </section>
  );
};

export default AgentProfData;
