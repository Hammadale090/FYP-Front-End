"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import PreferenceSugestionButton from "./PreferenceSugestionButton";
import PreferenceChatbotMessageBox from "./PreferenceChatbotMessageBox";
import PreferenceChatBoxInputText from "./PreferenceChatBoxInputText";
import PreferencesQuestions from "@/features/Preferences/components/PreferencesQuestions";
import {
  defaultPreferences,
  questionsForNormaluser,
  realtorQuestions,
  questionsForProfessionals,
  defaultPreferencesForProfessionals,
} from "@/features/Preferences/defaultPreferences";
import Image from "next/image";
import { useGetPreferences } from "@/hooks/useGetPreferences";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { PreferencesContext } from "@/context/PreferencesContext";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {};

const PreferenceChatbotArea = (props: Props) => {
  const { userRole } = useContext(AuthContext);
  const { updatePreferences, id, preferences, setPreferences } =
    useContext(PreferencesContext);

  const [questions, setQuestions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [questionsWithAnswers, setQuestionsWithAnswers] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const router = useRouter();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (userRole && userRole == "user") {
      setPreferences(defaultPreferences);
      setQuestions(questionsForNormaluser);
    } else if (userRole && userRole != "user") {
      setPreferences(defaultPreferencesForProfessionals);
      setQuestions(questionsForProfessionals);
    }
  }, [userRole]);

  function hasAnsweredCurrentQuestion(data) {
    if (data !== null && typeof data === "object") {
      return Object.keys(data).filter((key) => data[key]).length > 0;
    }
    if (data !== null && typeof data === "string") {
      return data.length > 0;
    }
    return false;
  }

  function hasSkippedAllQuestions() {
    return (
      questionsWithAnswers.map(
        (i) => hasAnsweredCurrentQuestion(i?.answer) == true
      ).length < 1
    );
  }



  return (
    <div className="md:min-w-[90] relative h-[450px]  rounded-[12px] border border-[#D9D9D9] ">
      {questions && questions.length > 0 && (
        <>
          <div className="w-full h-[350px] overflow-auto py-7 px-10">
            <h1 className="text-[16px] my-3 font-medium leading-[20px] text-black">
              Tell me your preferences that you want to update?
            </h1>

            {/* the question suggestions */}
            {/* <div className='flex flex-wrap mt-5'>
                <PreferenceSugestionButton text='What budget range should I have?' />
                <PreferenceSugestionButton text='Can you suggest me some properties based on my lifestyle?' />
                <PreferenceSugestionButton text='Lorem ipsum dolor sit amet,' />
                <PreferenceSugestionButton text='Lorem ipsum dolor sit amet,' active />
                <PreferenceSugestionButton text='Lorem ipsum dolor sit amet,' />
                <PreferenceSugestionButton text='Lorem ipsum dolor sit amet,' />
            </div> */}

            {/* the chat box area */}
            {questionsWithAnswers?.map((i: any, index: number) => {
              if (
                index == currentQuestionIndex ||
                !hasAnsweredCurrentQuestion(i?.answer)
              ) {
                return <></>;
              } else
                return (
                  <div key={index}>
                    <PreferenceChatbotMessageBox text={i?.question} date="" />
                    <PreferenceChatbotMessageBox
                      sender
                      text={
                        Array.isArray(i.answer) // Check if it's an array
                          ? i.answer.join(", ") // Join array elements with commas
                          : typeof i.answer === "object" // Check if it's an object
                          ? Object.keys(i.answer)
                              .filter(
                                (key) =>
                                  typeof i.answer[key] === "boolean" ||
                                  i.answer[key]
                              ) // Filter keys with boolean or non-boolean values
                              .map((key) =>
                                typeof i.answer[key] === "boolean"
                                  ? key
                                  : i.answer[key]
                              ) // Map keys with boolean values and values with non-boolean values
                              .join(", ") // Join the result with commas
                          : i.answer // Treat as a single string
                      }
                      date=""
                    />
                  </div>
                );
            })}

            {questions[currentQuestionIndex] && (
              <PreferencesQuestions
                questions={questions}
                preferences={preferences}
                setPreferences={setPreferences}
                questionsWithAnswers={questionsWithAnswers}
                setQuestionsWithAnswers={setQuestionsWithAnswers}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                currentQuestion={questions[currentQuestionIndex]}
              />
            )}

            <div ref={messagesEndRef}></div>
            {/*  send message input field */}
            {/* <div className="">
        <PreferenceChatBoxInputText />
      </div> */}
          </div>

          {/* apply changes button */}
          <div className="w-full h-[100px] z-90 flex justify-end px-4 items-center">
            {(hasAnsweredCurrentQuestion(
              questionsWithAnswers[currentQuestionIndex]?.answer
            ) ||
              currentQuestionIndex <= questions.length) &&(
                <div
                  className="px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal text-white bg-[#3EB87F] border border-white w-[100px] h-[40px]"
                  onClick={async () => {
                    if (currentQuestionIndex == questions.length) {
                      let update_status;
                      if (userRole) {
                        setLoading(true);
                        update_status = await updatePreferences(
                          id,
                          preferences
                        );
                      }
                      if (update_status) {
                        router.push("/dashboard/preferences");
                        setLoading(false);
                      }
                      setLoading(false)
                    } else {
                      setCurrentQuestionIndex(currentQuestionIndex + 1);
                    }
                  }}
                >
                  {currentQuestionIndex < questions.length ? (
                    <div className="flex justify-between items-center">
                      <h1 className="text-white text-[14px] font-normal leading-[18px] mr-2">
                        Send
                      </h1>
                      <Image
                        src={"/send.svg"}
                        className="w-[18px] h-[18px]"
                        alt="emoji"
                        height={500}
                        width={500}
                      />
                    </div>
                  ) : (
                    loading? <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />:"Confirm"
                  )}
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default PreferenceChatbotArea;
