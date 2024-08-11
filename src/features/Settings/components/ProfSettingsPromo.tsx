"use client";

import { ProfSettingsContext } from "@/context/ProfSettingsContext";
import IconShowcaseBox from "@/features/Dashboard/shared/IconShowcaseBox";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

const ProfSettingsPromo = (props: Props) => {
  
  const { profDetails, setProfDetails, isEditing, setIsEditing } = useContext(ProfSettingsContext);
  const [details, setDetails] = useState({
    promo_code: "",
    promo_text: "",
  });

  useEffect(() => {
    setDetails({
      promo_code: profDetails?.promo_code,
      promo_text: profDetails?.promo_text,
    });
  }, [profDetails]);

  const handleCancel = () => {
    setIsEditing(false);
    setProfDetails((prev) => ({
      ...prev,
      promo_code: details?.promo_code,
      promo_text: details?.promo_text,
    }));
  };

  return (
    <div className="my-2 flex max-md:flex-col-reverse max-md:items-center max-md:space-y-3 md:space-x-48 md:px-[20px] rounded-[5px] bg-black py-[15px]">
      {/* Edit this banner */}
      {!isEditing ? (
        <IconShowcaseBox
          px="15px"
          text="Edit this Banner"
          textCN="text-[#11142D] text-[14px] leading-[22px]"
          noBorder
          rounded="8px"
          onClick={() => setIsEditing(true)}
        />
      ) : (
        <div className="flex items-center gap-[10px]">
          <IconShowcaseBox
            px="15px"
            text="Cancel"
            textCN="text-[#FFF] text-[14px] leading-[22px]"
            // noBorder
            rounded="8px"
            onClick={handleCancel}
            color="transparent"
          />
        </div>
      )}
      <div className="flex justify-center space-x-6 items-center">
        <Image
          src={"/Broker/tag.svg"}
          className="w-[24px] h-[24px]"
          width={500}
          height={500}
          alt="tag"
        />
        {isEditing ? (
          <input
            type="text"
            placeholder="E.g - Get 15% OFF, user promo code"
            className="w-[400px]  border-b border-white outline-none bg-transparent p-2 text-white"
            value={profDetails?.promo_text}
            onChange={(e) =>
              setProfDetails((prev) => ({
                ...prev,
                promo_text: e.target.value,
              }))
            }
          />
        ) : (
          <h1 className="text-[16px] font-bold text-white">
            {profDetails?.promo_text
              ? profDetails?.promo_text
              : "Get 15% OFF, user promo code"}
          </h1>
        )}
        <div className="px-4 py-2 border border-dashed border-white rounded-[4px] text-[16px] font-bold text-white">
          {isEditing ? (
            <input
              className="w-[100px] border-b outline-none bg-transparent"
              placeholder="REAL15"
              value={profDetails?.promo_code}
              onChange={(e) =>
                setProfDetails((prev) => ({
                  ...prev,
                  promo_code: e.target.value,
                }))
              }
            />
          ) : profDetails?.promo_code ? (
            profDetails?.promo_code
          ) : (
            "REAL15"
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfSettingsPromo;
