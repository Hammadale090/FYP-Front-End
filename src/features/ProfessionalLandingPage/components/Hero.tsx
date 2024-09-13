"use client";
import { AuthContext } from "@/context/AuthContext";
import { fetcher } from "@/lib/fetchers";
import { Modal, TextInput } from "@mantine/core";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDisclosure } from "@mantine/hooks";
import FeedPropertyCard from "@/features/Feed/components/FeedPropertyCard";
import { Portfolio } from "@/context/types";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {
  user?: boolean;
};

const Hero = ({ user }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [form, setForm] = useState({
    search: "",
  });
  const [loader, setLoader] = useState<boolean>(false);
  const { toast } = useToast();
  const [searchData, setSearchData] = useState([]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function splitSearchTermIntoKeyWords(sentence: string) {
    // Define a list of common prepositions, articles, and pronouns to exclude
    const commonWords = [
      "the",
      "a",
      "an",
      "in",
      "on",
      "at",
      "to",
      "for",
      "with",
      "by",
      "as",
      "of",
      "i",
      "you",
      "he",
      "she",
      "it",
      "we",
      "they",
      "me",
      "him",
      "her",
      "us",
      "them",
    ];

    // Split the sentence into words
    const words = sentence.split(/\s+/);

    // Filter out common words
    const filteredWords = words.filter(
      (word) => !commonWords.includes(word.toLowerCase())
    );

    return filteredWords;
  }

  const handlePropertySearch = async () => {
    if (form.search.trim() === "") {
      return;
    }

    setLoader(true);

    let applyFilters = `filters[status][$eq]=active`;
    let filterCount = 0;
    splitSearchTermIntoKeyWords(form.search).forEach((keyword) => {
      applyFilters =
        applyFilters +
        `&filters[$and][${filterCount}][$or][0][country][$containsi]=${keyword}&filters[$and][${filterCount}][$or][1][address][$containsi]=${keyword}&filters[$and][${filterCount}][$or][2][city][$containsi]=${keyword}&filters[$and][${filterCount}][$or][3][zip][$containsi]=${keyword}&filters[$and][${filterCount}][$or][4][client_profile][first_name][$containsi]=${keyword}&filters[$and][${filterCount}][$or][5][client_profile][last_name][$containsi]=${keyword}&filters[$and][${filterCount}][$or][6][name][$containsi]=${keyword}&filters[$and][${filterCount}][$or][7][description][$containsi]=${keyword}&filters[$and][${filterCount}][$or][8][price][$eq]=${keyword}&filters[$and][${filterCount}][$or][9][type][$containsi]=${keyword}&filters[$and][${filterCount}][$or][10][state][$containsi]=${keyword}&filters[$and][${filterCount}][$or][11][area][$containsi]=${keyword}&filters[$and][${filterCount}][$or][12][location][$containsi]=${keyword}`;
      filterCount = filterCount + 1;
    });
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings?${applyFilters}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response?.meta) {
      if (response.data.length > 0) {
        setSearchData(response.data);
        open();
        setLoader(false);
      } else {
        setLoader(false);
        toast({
          variant: "destructive",
          description: "No Search result up",
        });
      }
    } else {
      setLoader(false);
      toast({
        variant: "destructive",
        description: "No Search result up",
      });
    }
  };

  return (
    <section className="max-w-[1400px] mx-auto">
      <div className="relative">
        <div className="flex md:my-[74px] mx-[20px] md:mx-[70px] flex-col max-w-[600px] md:space-y-5 absolute">
          <h1 className="text-[16px] md:text-[84px] font-extrabold leading-[24px] md:leading-[92px] text-[#34495D]">
            {user ? "Find Your Dream Home" : " Become a professional Realtor"}
          </h1>
          <h1 className="text-[14px] max-md:w-[80%] md:text-[16px] font-normal leading-[26px] text-[#383838] md:max-w-[469px]">
            {user
              ? "Whether you’re buying, selling or renting, we can help you move forward."
              : " This is just placeholder text. Don’t be alarmed. This is just placeholder text. This is just placeholder text."}
          </h1>
          {!user && (
            <div className="px-[36px] py-[18px] w-fit bg-[#3EB87F] gap-[14px] rounded-[8px] text-[16px] text-white font-semibold leading-[26px]">
              Sign Up as a Realtor
            </div>
          )}

          {user && (
            <div className="flex flex-col max-md:mt-5 ">
              <div className="flex">
                <div className="bg-white rounded-tr-[8px] w-fit px-[24px] py-[6px] text-[#34495D] z-10 text-[16px] font-semibold leading-[26px]">
                  Buy
                </div>
                <div className="bg-[#34495d] text-white rounded-tr-[8px] w-fit px-[24px] py-[6px] z-0 -ml-[5px] text-[16px] font-semibold leading-[26px]">
                  Rent
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePropertySearch();
                }}
                className="w-[90%] md:w-full"
              >
                <TextInput
                  name="search"
                  value={form.search}
                  onChange={handleChange}
                  className="bg-[#F4F3F3] rounded-[8px] max-md:h-[5px]"
                  placeholder="Search Address, City, Postcode, Agent"
                  size="xl"
                  rightSection={
                    <button
                      disabled={loader}
                      type="button"
                      onClick={() => {
                        handlePropertySearch();
                      }}
                      className="md:px-[36px] px-[5px] py-[18px] rounded-[8px] bg-[#3EB87F]"
                    >
                      <div className="flex justify-between items-center space-x-5">
                        <Image
                          src={"/Landing/Search.png"}
                          className="w-[20px] h-[20px]"
                          alt="Search png"
                          width={1000}
                          height={1000}
                        />
                        <h1 className="text-white text-[16px] max-md:hidden md:text-nowrap font-semibold leading-[26px]">
                          {loader ? (
                            <BiLoaderAlt className="text-center animate-spin" />
                          ) : (
                            "Search Places"
                          )}
                        </h1>
                      </div>
                    </button>
                  }
                />

                <button
                  disabled={loader}
                  type="submit"
                  className="hidden"
                ></button>
              </form>
            </div>
          )}
        </div>
        <Image
          // src={"/Landing/Profile.png"}
          src={"/AuthBackground.png"}
          className="w-full h-full md:max-h-[600px]"
          alt="landing paage"
          width={1000}
          height={1000}
        />
      </div>

      <Modal
        fullScreen
        opened={opened}
        onClose={() => {
          setSearchData([]);
          close();
        }}
        title="Your Search results"
      >
        <div className="max-md:flex max-md:flex-wrap max-md:justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4">
          {searchData?.map((portfolio: Portfolio) => (
            <FeedPropertyCard
              bannerTrue
              key={portfolio?.id}
              id={portfolio?.id}
              banner={portfolio?.attributes?.Gallery}
              title={portfolio?.attributes?.name}
              description={portfolio.attributes.description}
              location={portfolio.attributes.location}
              price={portfolio.attributes.price}
              currency={portfolio.attributes.currency}
              featuredClassName
            />
          ))}
        </div>
      </Modal>
    </section>
  );
};

export default Hero;
