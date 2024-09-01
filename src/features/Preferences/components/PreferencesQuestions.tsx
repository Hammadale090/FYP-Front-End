// =================
"use-client";
import camelCase from "camelcase";

import PreferencesCheckBox from "./PreferencesCheckBox";
import PreferencesRadioBox from "./PreferencesRadioBox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Divider, TagsInput } from "@mantine/core";
import { Label } from "@/components/ui/label";
import PreferencesRangeData from "./PreferencesRangeData";

import { useGetPreferences } from "@/hooks/useGetPreferences";
import PreferencesSelectBox from "./PreferencesSelectBox";
import { useState } from "react";
import KeywordsInput from "@/features/Settings/shared/KeywordsInput";
import { defaultPreferences } from "../defaultPreferences";
import PreferenceChatbotMessageBox from "@/features/PreferenceChatbot/components/PreferenceChatbotMessageBox";
import Image from "next/image";
import ConstructionDateRangePicker from "./ConstructionDateRangePicker";
import { Input } from "@/components/ui/input";

type Props = {
  questions: any;
  preferences: any;
  setPreferences: any;
  questionsWithAnswers: any;
  setQuestionsWithAnswers: any;
  currentQuestionIndex: any;
  setCurrentQuestionIndex: any;
  currentQuestion: any;
};
const PreferencesQuestions = ({
  questions,
  preferences,
  setPreferences,
  questionsWithAnswers,
  setQuestionsWithAnswers,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  currentQuestion,
}: Props) => {
  console.log({ questionsWithAnswers, preferences });
  return (
    <section>
      {/* top section */}
      {/* preferences text and apply changes button */}

      <div className=" my-7">
        {/* home warranty */}
        <div className="  my-7 flex gap-6  items-center ">
          <PreferenceChatbotMessageBox text={currentQuestion?.text} date="" />

          {currentQuestionIndex < questions.length && (
            <div
              className="px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal text-white bg-green-500 border border-white mb-[-6px] "
              onClick={async () => {
                if (currentQuestionIndex < questions.length) {
                  try {
                    const _questionsWithAnswers = questionsWithAnswers;
                    _questionsWithAnswers[currentQuestionIndex] = {
                      question: currentQuestion.text,
                      answer: null,
                    };
                    setQuestionsWithAnswers(_questionsWithAnswers);

                    const _preference = { ...preferences };
                    if (
                      currentQuestion?.type == "range" ||
                      currentQuestion?.type == "date"
                    ) {
                      delete _preference?.[`min_${currentQuestion.key}`];
                      delete _preference?.[`max_${currentQuestion.key}`];
                    } else {
                      delete _preference?.[currentQuestion.key];
                    }

                    setPreferences(_preference);
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  } catch (error) { }
                }
              }}
            >
              Skip
            </div>
          )}
        </div>
        {currentQuestion?.type == "radio" && (
          <div className="mt-7">
            {/* <PreferenceChatbotMessageBox text={currentQuestion.text} date="" /> */}
            {/* <PreferencesRadioBox /> */}
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

                      const _questionsWithAnswers = questionsWithAnswers;
                      _questionsWithAnswers[currentQuestionIndex] = {
                        question: currentQuestion.text,
                        answer: i,
                      };
                      setQuestionsWithAnswers(_questionsWithAnswers);
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
            {/* <PreferenceChatbotMessageBox text={currentQuestion.text} date="" /> */}
            <KeywordsInput
              placeholder={"Enter specific keywords or phrases "}
              KeywordsPreferences={preferences?.[currentQuestion.key] || []}
              setKeywordsPreferences={(arg: any) => {
                setPreferences({
                  ...preferences,
                  [currentQuestion.key]: arg,
                });
                const _questionsWithAnswers = questionsWithAnswers;
                _questionsWithAnswers[currentQuestionIndex] = {
                  question: currentQuestion.text,
                  answer: arg,
                };
                setQuestionsWithAnswers(_questionsWithAnswers);
              }}
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
        )}
        {currentQuestion?.type == "user_input" && (
          <div className="mt-7">
            {/* <PreferenceChatbotMessageBox text={currentQuestion.text} date="" /> */}
            <KeywordsInput
              placeholder={"Enter specific keywords or phrases "}
              KeywordsPreferences={preferences?.[currentQuestion.key] || []}
              setKeywordsPreferences={(arg: any) => {
                setPreferences({
                  ...preferences,
                  [currentQuestion.key]: arg,
                });
                const _questionsWithAnswers = questionsWithAnswers;
                _questionsWithAnswers[currentQuestionIndex] = {
                  question: currentQuestion.text,
                  answer: arg,
                };
                setQuestionsWithAnswers(_questionsWithAnswers);
              }}
              maxKeywords={5}
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
        )}

        {/* property Amenities */}
        {currentQuestion?.type == "checkbox" && (
          <div className="mt-7">
            {/* property Amenties text */}
            {/* <PreferenceChatbotMessageBox text={currentQuestion.text} date="" /> */}
            {/* Property amenities */}
            <div className=" mt-7 flex  flex-wrap max-w-[900px]">
              {currentQuestion?.options?.map((i) => {
                return (
                  <PreferencesCheckBox
                    text={i}
                    key={i}
                    checked={preferences?.[currentQuestion.key]?.[camelCase(i)]}
                    onClick={() => {
                      setPreferences({
                        ...preferences,
                        [currentQuestion.key]: {
                          ...preferences[currentQuestion.key],
                          [camelCase(i)]:
                            !preferences?.[currentQuestion.key]?.[camelCase(i)],
                        },
                      });

                      const _questionsWithAnswers = questionsWithAnswers;
                      _questionsWithAnswers[currentQuestionIndex] = {
                        question: currentQuestion.text,
                        answer: {
                          ..._questionsWithAnswers[currentQuestionIndex]
                            ?.answer,
                          [i]: !preferences?.[currentQuestion.key]?.[
                            camelCase(i)
                          ],
                        },
                      };
                      setQuestionsWithAnswers(_questionsWithAnswers);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* the charts */}
        {currentQuestion?.type == "range" && (
          <div className="mt-7">
            {/* <PreferenceChatbotMessageBox text={currentQuestion.text} date="" /> */}
            <div className="max-md:flex max-md:flex-wrap max-md:space-y-6 max-md:justify-center md:grid md:grid-cols-2 lg:grid-cols-1 mt-5">
              <PreferencesRangeData
                text={currentQuestion.label}
                type={currentQuestion.key}
                preferences={preferences}
                setPreferences={(arg: any) => {
                  setPreferences({
                    ...arg,
                  });

                  const _questionsWithAnswers = questionsWithAnswers;
                  _questionsWithAnswers[currentQuestionIndex] = {
                    question: currentQuestion.text,
                    answer: [
                      arg?.[`min_${currentQuestion.key}`],
                      arg?.[`max_${currentQuestion.key}`],
                    ],
                  };
                  setQuestionsWithAnswers(_questionsWithAnswers);
                }}
              />
            </div>
          </div>
        )}
        {currentQuestion?.type == "date" && (
          <div className="mt-7">
            {/* <PreferenceChatbotMessageBox text={currentQuestion.text} date="" /> */}
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
                    [`min_${currentQuestion.key}`]: arg.min.toISOString(),
                    [`max_${currentQuestion.key}`]: arg.max.toISOString(),
                  });

                  const _questionsWithAnswers = questionsWithAnswers;
                  _questionsWithAnswers[currentQuestionIndex] = {
                    question: currentQuestion.text,
                    answer: [arg?.min.toDateString(), arg?.max.toDateString()],
                  };
                  setQuestionsWithAnswers(_questionsWithAnswers);
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
            {/* <PreferenceChatbotMessageBox text={currentQuestion.text} date="" /> */}
            <div className="mt-7 flex  flex-wrap ">
              <PreferencesSelectBox
                header="City"
                data={["Toronto,ON", "Toronto, VA", "Toronto, MN"]}
                onValueChange={(arg) => {
                  //---------------------------------------
                  setPreferences({
                    ...preferences,
                    [currentQuestion.key]: {
                      ...preferences[currentQuestion.key],
                      city: arg,
                    },
                  });

                  const _questionsWithAnswers = questionsWithAnswers;
                  _questionsWithAnswers[currentQuestionIndex] = {
                    question: currentQuestion.text,
                    answer: {
                      ..._questionsWithAnswers[currentQuestionIndex]?.answer,
                      city: arg,
                    },
                  };
                  setQuestionsWithAnswers(_questionsWithAnswers);

                  //----------------
                }}
              />
              <PreferencesSelectBox
                header="Neighborhood"
                data={["Ontario", "Vancouver", "Montreal"]}
                onValueChange={(arg) => {
                  //---------------------------------------

                  setPreferences({
                    ...preferences,
                    [currentQuestion.key]: {
                      ...preferences[currentQuestion.key],
                      neighborhood: arg,
                    },
                  });

                  const _questionsWithAnswers = questionsWithAnswers;
                  _questionsWithAnswers[currentQuestionIndex] = {
                    question: currentQuestion.text,
                    answer: {
                      ..._questionsWithAnswers[currentQuestionIndex]?.answer,
                      neighborhood: arg,
                    },
                  };
                  setQuestionsWithAnswers(_questionsWithAnswers);

                  //----------------
                }}
              />
              <PreferencesSelectBox
                header="ZIP Code"
                data={["6768", "5767", "8809", "7987"]}
                onValueChange={(arg) => {
                  //---------------------------------------

                  setPreferences({
                    ...preferences,
                    [currentQuestion.key]: {
                      ...preferences[currentQuestion.key],
                      zipCode: arg,
                    },
                  });

                  const _questionsWithAnswers = questionsWithAnswers;
                  _questionsWithAnswers[currentQuestionIndex] = {
                    question: currentQuestion.text,
                    answer: {
                      ..._questionsWithAnswers[currentQuestionIndex]?.answer,
                      zipCode: arg,
                    },
                  };
                  setQuestionsWithAnswers(_questionsWithAnswers);

                  //----------------
                }}
              />
              <PreferencesSelectBox
                header="Any Specific Landmarks"
                data={[
                  "Near Gas Station",
                  "Opposite Abc Hospital",
                  "Near St. Merry School",
                ]}
                onValueChange={(arg) => {
                  //---------------------------------------

                  setPreferences({
                    ...preferences,
                    [currentQuestion.key]: {
                      ...preferences[currentQuestion.key],
                      landmarks: arg,
                    },
                  });

                  const _questionsWithAnswers = questionsWithAnswers;
                  _questionsWithAnswers[currentQuestionIndex] = {
                    question: currentQuestion.text,
                    answer: {
                      ..._questionsWithAnswers[currentQuestionIndex]?.answer,
                      landmarks: arg,
                    },
                  };
                  setQuestionsWithAnswers(_questionsWithAnswers);

                  //----------------
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex max-md:flex-col max-md:space-y-2 justify-end items-start">
        {/* preferences text */}
      </div>
    </section>
  );
};

export default PreferencesQuestions;
