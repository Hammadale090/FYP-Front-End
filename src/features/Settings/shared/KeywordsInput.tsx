"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useToast } from '@/components/ui/use-toast'
import { getProfessionalByEmail } from "../functions";
import { AuthContext } from "@/context/AuthContext";
import { ListingContext } from "@/context/ListingContext";

type Keywords = Array<string>;
type Props = {
  placeholder?: string;
  refer?: boolean;
  setKeywordsPreferences?: (arg: any) => void;
  KeywordsPreferences?: Keywords;
  onclick?: () => void;
  loading?: boolean;
  maxKeywords?: number; // Added maxKeywords prop
  listingInvite?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

const KeywordsInput = ({
  placeholder,
  refer,
  setKeywordsPreferences,
  KeywordsPreferences,
  onclick,
  loading,
  maxKeywords, // Destructure maxKeywords prop
  listingInvite,
  setLoading
}: Props) => {
  const { jwt, profileEmail, prof } = useContext(AuthContext)
  const { referred, setReferred } = useContext<any>(ListingContext)
  const [keywords, setKeywords] = useState<Keywords>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast()



  // only for listing invities, check if email is in the database for brokers
  const checkEmail = async (email: string) => {
    if (email === profileEmail || email === prof?.data?.attributes?.email) {
      toast({
        variant: "destructive",
        description: "You cannot refer yourself",
      });
      return false
    }
    setLoading(true)
    try {
      const response = await getProfessionalByEmail(email, jwt)
      console.log("the response", response)
      if (!response) {
        setLoading(false)
        toast({
          variant: "destructive",
          description: "The Email is not that of a professional in the app",
        });
      }

      setLoading(false)
      return response
    } catch (error) {
      setLoading(false)
      toast({
        variant: "destructive",
        description: "Cannot Add Email as invite at the moment",
      });
    }

  }


  const handleEvent = async (newKeyword, event, input?) => {
    if (!maxKeywords || keywords.length < maxKeywords) {
      // Check if maxKeywords is not set or not reached
      if (!keywords.includes(newKeyword)) {
        if (listingInvite) {
          let response = await checkEmail(newKeyword)
          if (response) {
            if (!referred.some((item: any) => item.id === response)) {
              // If response is not in the referrer array, add it
              setReferred([...referred, { id: response, email: newKeyword }])
              setKeywords([...keywords, newKeyword]);
              setKeywordsPreferences &&
                setKeywordsPreferences([...keywords, newKeyword]);
            }
          }
        } else {
          setKeywords([...keywords, newKeyword]);
          setKeywordsPreferences &&
            setKeywordsPreferences([...keywords, newKeyword]);
        }

      }

      if (input) {
        inputRef.current.value = ''
      }
      else {
        (event.target as HTMLInputElement).value = ""; // Clear the input field after adding
      }
    }
  }

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newKeyword = (event.target as HTMLInputElement).value.trim(); // Trim leading/trailing spaces

    // console.log("this is the evebt", event)
    // Check if the Enter key was pressed or backspace with empty input and focus on input
    if (event.key === 'Enter') {
      event?.preventDefault();
    }

    if (event.key === "Enter" && newKeyword) {
      if (!listingInvite) {
        handleEvent(newKeyword, event)
      }
    } else if (
      event.key === "Backspace" &&
      !newKeyword &&
      document.activeElement === inputRef.current &&
      (event.target as HTMLInputElement).value.length === 0
    ) {

      if (!listingInvite) {
        // If backspace is pressed with empty input and focus on input, delete the most recent keyword
        const lastIndex = keywords.length - 1;
        if (lastIndex >= 0) {
          handleDeleteKeyword(lastIndex);
        }
      }

    }
  };



  const handleDeleteKeyword = (index: number) => {
    // Guard clause to prevent out-of-bounds errors
    if (index < 0 || index >= keywords.length) {
      return; // Silently handle invalid index
    }

    const newKeywords = [...keywords]; // Create a copy to avoid mutation
    let bug = newKeywords.splice(index, 1); // Remove the element at the specified index
    if (listingInvite) {
      let index = referred.findIndex((item: any) => item.email === bug[0]);

      // If the email is found in the 'referred' array, remove the object at that index
      if (index !== -1) {
        // Remove the object with the matching email from the 'referred' array
        const updatedReferred = [...referred.slice(0, index), ...referred.slice(index + 1)];
        // Update the state with the updated 'referred' array
        setReferred(updatedReferred);
      }
    }
    setKeywords(newKeywords);
    setKeywordsPreferences && setKeywordsPreferences(newKeywords);
  };

  useEffect(() => {
    // keywords.length == 0 && setKeywords(KeywordsPreferences || []);
    setKeywords(KeywordsPreferences || []);
  }, [KeywordsPreferences]);

  return (
    <div className="rounded-[4px] flex mt-1 flex-wrap items-center border border-ravinna w-full ">
      {keywords?.map((keyword, index) => (
        <div
          key={`${keyword}-${index}`}
          className="px-[14px] mx-2 max-w-[100%] my-2 py-[10px] rounded-[6px] border border-ravinna bg-white flex items-center space-x-3"
        >
          <h1 className="text-ravinna text-[14px] font-medium leading-[20px] break-all">
            {keyword}
          </h1>
          <Image
            onClick={() => handleDeleteKeyword(index)}
            src={"/Realtor/Cross.svg"}
            className="w-[16.5px] border-none mr-3 h-[16.5px] cursor-pointer"
            width={500}
            height={500}
            alt="cross realtor"
          />
        </div>
      ))}

      {(!maxKeywords || keywords.length < maxKeywords) && (
        <Input
          ref={inputRef}
          className="flex-1 min-w-[100px] h-[40px] mx-2 my-2 border-none"
          onKeyDown={handleKeyDown}
          placeholder={placeholder ? placeholder : "Enter Keywords"}
        />
      )}
      {refer && (
        <div
          onClick={(e: any) => {
            if (listingInvite) {
              let newKeyword = inputRef?.current?.value?.trim();
              if (newKeyword === "") {
                return
              } else {
                handleEvent(newKeyword, e, true)
              }
            } else {
              onclick()
            }
          }}
          className="bg-[#3EB87F] mx-1 my-1 rounded-[4px] gap-[10px] px-[18px] py-[6px] text-[16px] font-bold leading-[26px] text-white cursor-pointer"
        >
          {loading ? (
            <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />
          ) : (
            "Refer"
          )}
        </div>
      )}
    </div>
  );
};

export default KeywordsInput;
