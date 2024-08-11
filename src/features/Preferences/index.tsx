"use client";
import { Divider } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import camelCase from "camelcase";
import PreferencesSelectBox from "./components/PreferencesSelectBox";
import PreferencesCheckBox from "./components/PreferencesCheckBox";
import PreferencesRadioBox from "./components/PreferencesRadioBox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TagsInput } from "@mantine/core";
import { Label } from "@/components/ui/label";
import PreferencesRangeData from "./components/PreferencesRangeData";
import KeywordsInput from "../Settings/shared/KeywordsInput";
import { useGetPreferences } from "@/hooks/useGetPreferences";
import { questionsForProfessionals } from "./defaultPreferences";
import { AuthContext } from "@/context/AuthContext";
import ConstructionDateRangePicker from "./components/ConstructionDateRangePicker";
import { Input } from "@/components/ui/input";
import { PreferencesContext } from "@/context/PreferencesContext";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {};

const Preferences = (props: Props) => {
  const { preferences, initialPreferences, setPreferences, updatePreferences } =
    useContext(PreferencesContext);
  const { userRole } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)

  const Title = ({ text }) => {
    return <h1 className="text-[18px] font-medium leading-[24px]">{text}</h1>;
  };

  const PreferencesForProfessionals = () => {
    function handleInputChange(e: any, currentQuestion) {
      e.preventDefault();

      const new_data = {
        ...preferences,
        [currentQuestion.key]: e?.target?.value,
      };

      setPreferences(new_data);
    }
    return (
      <>
        <div className="container mx-auto my-7">
          {/* top section */}
          {/* preferences text and apply changes button */}
          <div className="flex max-md:flex-col max-md:space-y-2 justify-between items-start">
            {/* preferences text */}
            <div className="flex flex-col gap-[8px] text-[#34495D]">
              <h1 className="text-[32px] font-medium leading-[20px]">
                Preferences
              </h1>
              <h1 className="text-[12px] font-medium leading-[20px]">
                You may reset your preferences to update properties on your feed
              </h1>
            </div>
            {/* apply changes button */}
            <button
              className={`px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal text-white ${JSON.stringify(preferences) ==
                JSON.stringify(initialPreferences)
                ? "bg-green-300"
                : "bg-[#3EB87F]"
                } border border-white `}
              onClick={async () => {
                setLoading(true)
                console.log("triggered apply button for proffessional ");
                await updatePreferences(preferences.id, preferences);
                setLoading(false)
              }}
              disabled={
                JSON.stringify(preferences) ==
                JSON.stringify(initialPreferences)
              }
            >
              {loading ?  <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" /> : "Apply Changes"}
            </button>
          </div>

          {questionsForProfessionals?.map((currentQuestion, index) => {
            return (
              <div key={index}>
                {currentQuestion?.type == "radio" && (
                  <div className="mt-7">
                    <Title text={currentQuestion.text} />

                    <RadioGroup className="flex max-md:flex-col md:space-x-8 my-2">
                      {currentQuestion?.options?.map((i) => {
                        return (
                          <div
                            className="flex items-center space-x-2"
                            key={i}
                            onClick={() => {
                              setPreferences({
                                ...preferences,
                                [currentQuestion.key]: i,
                              });
                            }}
                          >
                            <RadioGroupItem
                              checked={preferences?.[currentQuestion.key] == i}
                              value={i}
                              id={i}
                            />
                            <Label
                              className={`text-[16px] font-normal leading-[22px] ${preferences?.[currentQuestion.key] != i
                                ? "text-[#34495D]"
                                : "text-[#3EB87F]"
                                } `}
                              htmlFor={i}
                            >
                              {i}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                )}

                {/* Input specific keywords or phrases */}
                {currentQuestion?.type == "input" && (
                  <div className="mt-7">
                    <Title text={currentQuestion.text} />
                    <KeywordsInput
                      placeholder={"Input specific keywords or phrases"}
                      KeywordsPreferences={
                        preferences?.[currentQuestion.key] || []
                      }
                      setKeywordsPreferences={(arg: any) => {
                        setPreferences({
                          ...preferences,
                          [currentQuestion.key]: arg,
                        });
                      }}
                    />
                  </div>
                )}

                {currentQuestion?.type == "user_input" && (
                  <div className="mt-7">
                    <Title text={currentQuestion.text} />
                    <KeywordsInput
                      placeholder={"Input specific keywords or phrases"}
                      KeywordsPreferences={
                        preferences?.[currentQuestion.key] || []
                      }
                      setKeywordsPreferences={(arg: any) => {
                        setPreferences({
                          ...preferences,
                          [currentQuestion.key]: arg,
                        });
                      }}
                      maxKeywords={5}
                    />
                  </div>
                )}

                {currentQuestion?.type == "checkbox" && (
                  <div className="mt-7">
                    <Title text={currentQuestion.text} />

                    <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 max-w-[900px]">
                      {currentQuestion?.options?.map((i) => {
                        return (
                          <PreferencesCheckBox
                            text={i}
                            key={i}
                            checked={
                              preferences?.[currentQuestion.key]?.[camelCase(i)]
                            }
                            onClick={() => {
                              setPreferences({
                                ...preferences,
                                [currentQuestion.key]: {
                                  ...preferences[currentQuestion.key],
                                  [camelCase(i)]:
                                    !preferences?.[currentQuestion.key]?.[
                                    camelCase(i)
                                    ],
                                },
                              });
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {currentQuestion?.type == "range" && (
                  <div className="mt-7">
                    <Title text={currentQuestion.text} />
                    <div className="max-md:flex max-md:flex-wrap max-md:space-y-6 max-md:justify-center md:grid md:grid-cols-2 lg:grid-cols-1 mt-5">
                      <PreferencesRangeData
                        preference={true}
                        text={currentQuestion.label}
                        type={currentQuestion.key}
                        preferences={preferences}
                        setPreferences={(arg: any) => {
                          setPreferences({
                            ...arg,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
                {currentQuestion?.type == "date" && (
                  <div className="mt-7">
                    <Title text={currentQuestion.text} />
                    <div className="max-md:flex max-md:flex-wrap max-md:space-y-6 max-md:justify-center md:grid md:grid-cols-2 lg:grid-cols-1 mt-5">
                      {/* <PreferencesRangeData
                text="construction date"
                type="constructionDateRange"
                preferences={preferences}
                setPreferences={setPreferences}
              /> */}
                      <ConstructionDateRangePicker
                        setconstructionDateRange={(arg: any) => {
                          setPreferences({
                            ...preferences,
                            [`min_${currentQuestion.key}`]:
                              arg.min.toISOString(),
                            [`max_${currentQuestion.key}`]:
                              arg.max.toISOString(),
                          });
                        }}
                        type={currentQuestion.key}
                        constructionDateRange={{
                          [`min_${currentQuestion.key}`]:
                            preferences?.[`min_${currentQuestion.key}`],
                          [`max_${currentQuestion.key}`]:
                            preferences?.[`max_${currentQuestion.key}`],
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* last section */}
                {currentQuestion?.type == "location" && (
                  <div className="mt-7">
                    <Title text={currentQuestion.text} />
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-y-10">
                      <PreferencesSelectBox
                        header="City"
                        data={["Toronto,ON", "Toronto, VA", "Toronto, MN"]}
                      />
                      <PreferencesSelectBox
                        header="Neighborhood"
                        data={["Ontario", "Vancouver", "Montreal"]}
                      />
                      <PreferencesSelectBox
                        header="ZIP Code"
                        data={["6768", "5767", "8809", "7987"]}
                      />
                      <PreferencesSelectBox
                        header="Any Specific Landmarks"
                        data={["Near Gas Station",
                          "Opposite Abc Hospital",
                          "Near St. Merry School",]}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  };
  const PreferencesForNormalUsers = () => {
    return (
      <div className="container mx-auto my-7">
        {/* top section */}
        {/* preferences text and apply changes button */}
        <div className="flex max-md:flex-col max-md:space-y-2 justify-between items-start">
          {/* preferences text */}
          <div className="flex flex-col gap-[8px] text-[#34495D]">
            <h1 className="text-[32px] font-medium leading-[20px]">
              Preferences
            </h1>
            <h1 className="text-[12px] font-medium leading-[20px]">
              You may reset your preferences to update properties on your feed
            </h1>
          </div>
          {/* apply changes button */}
          <button
            className={`px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal text-white ${JSON.stringify(preferences) == JSON.stringify(initialPreferences)
              ? "bg-green-300"
              : "bg-[#3EB87F]"
              } border border-white `}
            onClick={async () => {
              setLoading(true)
                await updatePreferences(preferences.id, preferences);
                setLoading(false)
            }}
            disabled={
              JSON.stringify(preferences) == JSON.stringify(initialPreferences)
            }
          >
           {loading ?  <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" /> : "Apply Changes"}
          </button>
        </div>

        {/* home warranty */}
        <div className="mt-7">
          <h1 className="text-[18px] font-medium leading-[24px]">
            Home Warranty
          </h1>
          {/* <PreferencesRadioBox /> */}
          <RadioGroup className="flex max-md:flex-col md:space-x-8 my-2">
            {[
              "All Warranties",
              "Home Warranty Available",
              "Home Warranty Unavailable",
            ].map((i) => {
              return (
                <div
                  className="flex items-center space-x-2"
                  key={i}
                  onClick={() =>
                    setPreferences({ ...preferences, homeWarranty: i })
                  }
                >
                  <RadioGroupItem
                    checked={preferences?.homeWarranty == i}
                    value={i}
                    id={i}
                  />
                  <Label
                    className={`text-[16px] font-normal leading-[22px] ${preferences?.homeWarranty != i
                      ? "text-[#34495D]"
                      : "text-[#3EB87F]"
                      } `}
                    htmlFor={i}
                  >
                    {i}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {/* Filter by furnished */}
        <div className="mt-7">
          <h1 className="text-[18px] font-medium leading-[24px]">
            Filter by furnished
          </h1>
          <RadioGroup className="flex max-md:flex-col md:space-x-8 my-2">
            {["Furnished Properties", "Unfurnished Properties"].map((i) => {
              return (
                <div
                  className="flex items-center space-x-2"
                  key={i}
                  onClick={() => {
                    setPreferences({
                      ...preferences,
                      filterByFurnished: i,
                    });
                  }}
                >
                  <RadioGroupItem
                    checked={preferences?.filterByFurnished == i}
                    value={i}
                    id={i}
                  />
                  <Label
                    className={`text-[16px] font-normal leading-[22px] ${preferences?.filterByFurnished != i
                      ? "text-[#34495D]"
                      : "text-[#3EB87F]"
                      } `}
                    htmlFor={i}
                  >
                    {i}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {/* Input specific keywords or phrases */}
        <div className="mt-7">
          <h1 className="text-[18px] font-medium leading-[24px]">
            Input specific keywords or phrases
          </h1>
          <KeywordsInput
            placeholder={"Input specific keywords or phrases"}
            KeywordsPreferences={
              preferences?.specific_keywords_or_phrases || []
            }
            setKeywordsPreferences={(arg: any) => {
              setPreferences({
                ...preferences,
                specific_keywords_or_phrases: arg,
              });
            }}
            maxKeywords={10}
          />
          {/* <TagsInput
            className='my-2'
            placeholder="Enter keyword"
            clearButtonProps={{
              size: "lg", // Set the size of the clear button to small
              color: "blue", // Set the color of the clear button to gray
            }}
          /> */}
        </div>

        {/* property Amenities */}
        <div className="mt-7">
          {/* property Amenties text */}
          <h1 className="text-[16px] font-medium leading-[50px] text-black">
            Property Amenities.
          </h1>
          {/* Property amenities */}
          <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 max-w-[900px]">
            {[
              "Security Cameras",
              "Pool",
              "Laundry",
              "Garden",
              "Dish Washer",
              "Internet",
              "Garage",
              "Elevator",
              "Jacuzzi",
            ].map((i) => {
              return (
                <PreferencesCheckBox
                  text={i}
                  key={i}
                  checked={
                    preferences?.propertyAmenities?.[camelCase(i)] || false
                  }
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      propertyAmenities: {
                        ...preferences.propertyAmenities,
                        [camelCase(i)]:
                          !preferences?.propertyAmenities?.[camelCase(i)] ||
                          false,
                      },
                    })
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Architectural Styles */}
        <div className="mt-7">
          {/* Architectural styles text*/}
          <h1 className="text-[16px] font-medium leading-[50px] text-black">
            Architectural styles
          </h1>
          {/* Architectural styles */}
          <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 max-w-[800px]">
            {["Colonial", "Contemporary", "Craftsman", "Others"].map((i) => {
              return (
                <PreferencesCheckBox
                  text={i}
                  key={i}
                  checked={
                    preferences?.architecturalStyles?.[camelCase(i)] || false
                  }
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      architecturalStyles: {
                        ...preferences.architecturalStyles,
                        [camelCase(i)]:
                          !preferences?.architecturalStyles?.[camelCase(i)] ||
                          false,
                      },
                    })
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Virtual tours */}
        <div className="mt-7">
          <h1 className="text-[18px] font-medium leading-[24px]">
            Virtual Tours
          </h1>
          <RadioGroup className="flex max-md:flex-col md:space-x-8 my-2">
            {["Virtual Tours Only", "All Listings"].map((i) => {
              return (
                <div
                  className="flex items-center space-x-2"
                  key={i}
                  onClick={() =>
                    setPreferences({ ...preferences, virtualTours: i })
                  }
                >
                  <RadioGroupItem
                    checked={preferences?.virtualTours == i}
                    value={i}
                    id={i}
                  />
                  <Label
                    className={`text-[16px] font-normal leading-[22px] ${preferences?.virtualTours != i
                      ? "text-[#34495D]"
                      : "text-[#3EB87F]"
                      } `}
                    htmlFor={i}
                  >
                    {i}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {/*  Property Type*/}
        <div className="mt-7">
          <h1 className="text-[18px] font-medium leading-[24px]">
            Property Type
          </h1>
          <RadioGroup className="flex max-md:flex-col md:space-x-8 my-2">
            {["For Sale", "For Rent", "New Construction", "Recently Sold"].map(
              (i) => {
                return (
                  <div
                    className="flex items-center space-x-2"
                    key={i}
                    onClick={() =>
                      setPreferences({ ...preferences, propertyType: i })
                    }
                  >
                    <RadioGroupItem
                      checked={preferences?.propertyType == i}
                      value={i}
                      id={i}
                    />
                    <Label
                      className={`text-[16px] font-normal leading-[22px] ${preferences?.propertyType != i
                        ? "text-[#34495D]"
                        : "text-[#3EB87F]"
                        } `}
                      htmlFor={i}
                    >
                      {i}
                    </Label>
                  </div>
                );
              }
            )}
          </RadioGroup>
        </div>

        {/* close Proximities */}
        <div className="mt-7">
          {/* property Amenties text */}
          <h1 className="text-[16px] font-medium leading-[50px] text-black">
            Close Proximities
          </h1>
          {/* Property amenities */}
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 max-w-[900px]">
            {[
              "Nearby Schools",
              "Nearby Airports",
              "Nearby Gardens",
              "Nearby Hospitals",
              "Nearby University",
              "Nearby College",
            ].map((i) => {
              return (
                <PreferencesCheckBox
                  text={i}
                  key={i}
                  checked={
                    preferences?.closeProximities?.[camelCase(i)] || false
                  }
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      closeProximities: {
                        ...preferences.closeProximities,
                        [camelCase(i)]:
                          !preferences?.closeProximities?.[camelCase(i)] ||
                          false,
                      },
                    })
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Home Types */}
        <div className="mt-7">
          {/* Home Types text*/}
          <h1 className="text-[16px] font-medium leading-[50px] text-black">
            Home Types
          </h1>
          {/* Home Types */}
          <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 max-w-[800px]">
            {["Single-Family", "Multi-Family", "Others"].map((i) => {
              return (
                <PreferencesCheckBox
                  text={i}
                  key={i}
                  checked={preferences?.homeTypes?.[camelCase(i)] || false}
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      homeTypes: {
                        ...preferences.homeTypes,
                        [camelCase(i)]:
                          !preferences?.homeTypes?.[camelCase(i)] || false,
                      },
                    })
                  }
                />
              );
            })}
          </div>
        </div>

        {/* the charts */}
        <div className="max-md:space-y-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 md:space-x-6">
          <PreferencesRangeData
            text="price"
            type="priceRange"
            preferences={preferences}
            setPreferences={setPreferences}
          />
          <PreferencesRangeData
            text="construction date"
            type="constructionDateRange"
            preferences={preferences}
            setPreferences={setPreferences}
          />
          <PreferencesRangeData
            text="size considerations"
            type="sizeConsiderationsRange"
            preferences={preferences}
            setPreferences={setPreferences}
          />
        </div>

        {/* Property Category */}
        <div className="mt-7">
          <h1 className="text-[18px] font-medium leading-[24px]">
            Property Category
          </h1>
          <RadioGroup className="flex max-md:flex-col md:space-x-8 my-2">
            {[
              "House",
              "Apartment",
              "Condo",
              "Townhouse",
              "Land",
              "Commercial",
            ].map((i) => {
              return (
                <div
                  className="flex items-center space-x-2"
                  key={i}
                  onClick={() =>
                    setPreferences({ ...preferences, propertyCategory: i })
                  }
                >
                  <RadioGroupItem
                    checked={preferences?.propertyCategory == i}
                    value={i}
                    id={i}
                  />
                  <Label
                    className={`text-[16px] font-normal leading-[22px] ${preferences?.propertyCategory != i
                      ? "text-[#34495D]"
                      : "text-[#3EB87F]"
                      } `}
                    htmlFor={i}
                  >
                    {i}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {/* last section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-y-10 gap-x-12">
          <PreferencesSelectBox
            header="City"
            data={["Toronto,ON", "Toronto, VA", "Toronto, MN"]}
            seledtedValue={preferences?.location?.city}
            onValueChange={(arg) => {
              setPreferences({
                ...preferences,
                location: {
                  ...preferences.location,
                  city: arg,
                },
              });
            }}
          />
          <PreferencesSelectBox
            header="Neighborhood"
            data={["Ontario", "Vancouver", "Montreal"]}
             seledtedValue={preferences?.location?.neighborhood}
            onValueChange={(arg) => {
             setPreferences({
                ...preferences,
                location: {
                  ...preferences.location,
                  neighborhood: arg,
                },
              });
            }}
          />
          <PreferencesSelectBox
            header="ZIP Code"
            data={["6768", "5767", "8809", "7987"]}
            seledtedValue={preferences?.location?.zipCode}
            onValueChange={(arg) => {
             setPreferences({
                ...preferences,
                location: {
                  ...preferences.location,
                  zipCode: arg,
                },
              });
            }}
          />
          <PreferencesSelectBox
            header="Any Specific Landmarks"
            data={["Near Gas Station",
              "Opposite Abc Hospital",
              "Near St. Merry School",]}
              seledtedValue={preferences?.location?.landmarks}
              onValueChange={(arg) => {
             setPreferences({
                ...preferences,
                location: {
                  ...preferences.location,
                  landmarks: arg,
                },
              });
            }}
          />
        </div>
      </div>
    );
  };
  return (
    <section>
      <Divider my="sm" />

      {userRole == "user" ? (
        <PreferencesForNormalUsers />
      ) : (
        <PreferencesForProfessionals />
      )}
    </section>
  );
};

export default Preferences;
