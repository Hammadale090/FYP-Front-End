"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/context/AuthContext";
import { Divider } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";
import { updateProfileAccount, updateUserAccount } from "../functions";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {};

const parseBirthday = (birthdayString: string) => {
  const [year, month, day] = birthdayString.split("-");

  return {
    year: year ? year : "",
    month: month ? month : "",
    day: day ? day : "",
  };
};

const currentYear = new Date().getFullYear();

const UserDetails = (props: Props) => {
  const { profile, user, reload, setReload, userId, jwt, profileId, userRole } =
    useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    email: user?.data?.attributes?.email,
    username: user?.data?.attributes?.username,
    first_name: profile?.attributes?.first_name,
    last_name: profile?.attributes?.last_name,
    location: profile?.attributes?.location,
    address: profile?.attributes?.address,
    zip: profile?.attributes?.zip,
    state: profile?.attributes?.state,
    gender: profile?.attributes?.gender,
    birthday: profile?.attributes?.birthday
      ? parseBirthday(profile.attributes.birthday)
      : { year: "", month: "", day: "" },
  });

  useEffect(() => {
    setForm({
      ...form,
      email: user?.data?.attributes?.email,
      username: user?.data?.attributes?.username,
      birthday: profile?.attributes?.birthday
        ? parseBirthday(profile.attributes.birthday)
        : { year: "", month: "", day: "" },
    })
  }, [user, profile])


  // handle change of values for the form
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setError("");
    setForm({
      ...form,
      [name]: value,
    });
  };

  // update function to update the profile
  const updateProfileHandler = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (userId && (form.email || form.username) && jwt) {
        const data = {
          email: form.email,
          username: form.username,
        }
        const userAccount = await updateUserAccount(userId, data, jwt);
      }

      if (profileId && jwt) {
        const formattedBirthday = `${form.birthday.year
          }-${form.birthday.month.padStart(2, "0")}-${form.birthday.day.padStart(
            2,
            "0"
          )}`;
        // Update the profile with the formatted birthday
        const updatedForm = {
          ...form,
          birthday: formattedBirthday,
        };

        const userProfile = await updateProfileAccount(
          profileId,
          updatedForm,
          jwt
        );
      }

      setLoader(false);
      toast({
        description: "Changes saved successfully",
        action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
      });
      if (setReload) {
        setReload(!reload);
      }
    } catch (err: any) {
      setLoader(false);
      if (err?.response?.data?.error?.message) {
        toast({
          variant: "destructive",
          description: err?.response?.data?.error?.message,
        });
        setError(`${err?.response?.data?.error?.message}`);
      }
    }
  };

  return (
    <form onSubmit={updateProfileHandler}>
      <h1 className="text-[11px] text-[#222529] font-medium leading-[18px] tracking-[0.5px] px-4 ">
        *Required Fields
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* the first name */}
        <div className="flex flex-col space-y-2 px-4">
          <h1 className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] ">
            FIRST NAME
          </h1>
          <Input
            name="first_name"
            type="text"
            onChange={handleChange}
            value={
              form.first_name === "" || form.first_name
                ? form.first_name
                : profile?.attributes.first_name
                  ? profile?.attributes.first_name
                  : ""
            }
            className="rounded-[4px] border-[#34495D] bg-white w-full  h-[46px]"
            placeholder="Peter"
          />
        </div>

        {/* the last name */}
        <div className="flex flex-col space-y-2 px-4">
          <h1 className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] ">
            LAST NAME
          </h1>
          <Input
            name="last_name"
            type="text"
            onChange={handleChange}
            value={
              form.last_name === "" || form.last_name
                ? form.last_name
                : profile?.attributes.last_name
                  ? profile?.attributes.last_name
                  : ""
            }
            className="rounded-[4px] border-[#34495D] bg-white  w-full  h-[46px]"
            placeholder="Griffin"
          />
        </div>

        {/* the username */}
        <div className="flex flex-col space-y-2 px-4">
          <h1 className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] ">
            USERNAME*
          </h1>
          <Input
            className="rounded-[4px] border-[#34495D] bg-white  w-full h-[46px]"
            name="username"
            type="text"

            placeholder="Griffin"
            onChange={handleChange}
            value={
              form.email !== "" || form.username
                ? form.username
                : user?.data?.attributes?.username
                  ? user?.data?.attributes?.username
                  : ""
            }
          />
        </div>

        {/* the email */}
        <div className="flex flex-col space-y-2  w-full  px-4">
          <div className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] flex justify-between">
            <h1>EMAIL*</h1>
            <span className="text-[11px] font-normal leading-[12px] text-[#DF1C2F]">
              verify Email
            </span>
          </div>
          <Input
            name="email"
            type="email"
            required
            onChange={handleChange}
            value={
              form.email !== "" || form.email
                ? form.email
                : user?.data?.attributes?.email
                  ? user?.data?.attributes?.email
                  : ""
            }
            className="rounded-[4px] border-[#34495D] bg-white w-full  h-[46px]"
            placeholder="Email"
          />
        </div>

        {/* the birthday */}
        <div className="flex flex-col space-y-2 px-4 ">
          <h1 className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] ">
            BIRTHDAY
          </h1>
          <div className="flex flex-row space-x-2 w-full ">
            <Input
              className="rounded-[4px] border-[#34495D] md:w-[1/3] bg-white  h-[46px]"
              placeholder="Day"
              value={form.birthday.day}
              maxLength={2}
              required
              onChange={(e) => {
                const inputValue = e.target.value;
                if (parseInt(inputValue) > 31) {
                  return;
                }
                // Allow only numeric values
                if (/^\d*$/.test(inputValue)) {
                  // Update the state only if the input is numeric
                  setForm((prevState) => ({
                    ...prevState,
                    birthday: {
                      ...prevState.birthday,
                      day: inputValue,
                    },
                  }));
                }
              }}
            />
            <Input
              className="rounded-[4px] border-[#34495D] md:w-[1/3] bg-white  h-[46px]"
              placeholder="Month"
              value={form.birthday.month}
              required
              maxLength={2}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (parseInt(inputValue) > 12) {
                  return;
                }
                // Allow only numeric values
                if (/^\d*$/.test(inputValue)) {
                  // Update the state only if the input is numeric
                  setForm((prevState) => ({
                    ...prevState,
                    birthday: {
                      ...prevState.birthday,
                      month: inputValue,
                    },
                  }));
                }
              }}
            />
            <Input
              className="rounded-[4px] border-[#34495D] md:w-[1/3] bg-white  h-[46px]"
              placeholder="Year"
              maxLength={4}
              required
              value={form.birthday.year}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (parseInt(inputValue) > currentYear) {
                  return;
                }
                // Allow only numeric values
                if (/^\d*$/.test(inputValue)) {
                  // Update the state only if the input is numeric
                  setForm((prevState) => ({
                    ...prevState,
                    birthday: {
                      ...prevState.birthday,
                      year: inputValue,
                    },
                  }));
                }
              }}
            />
          </div>
        </div>

        {/* the location */}
        <div className="flex flex-col space-y-2 px-4">
          <h1 className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] ">
            LOCATION
          </h1>
          <Input
            name="location"
            type="text"
            onChange={handleChange}
            value={
              form.location === "" || form.location
                ? form.location
                : profile?.attributes?.location
                  ? profile?.attributes?.location
                  : ""
            }
            className="rounded-[4px] border-[#34495D] bg-white  w-full  h-[46px]"
            placeholder="location"
          />
        </div>


        {
          userRole !== "user" && (
            <> {/* address */}
              <div className="flex flex-col space-y-2 px-4 md:col-span-2">
                <h1 className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] ">
                  ADDRESS
                </h1>
                <Input
                  name="address"
                  type="text"
                  onChange={handleChange}
                  value={
                    form.address === "" || form.address
                      ? form.address
                      : profile?.attributes?.address
                        ? profile?.attributes?.address
                        : ""
                  }
                  className="rounded-[4px] border-[#34495D] bg-white  w-full md:w-full h-[46px]"
                  placeholder="address"
                />
              </div>

              {/* zip code */}
              <div className="flex flex-col space-y-2 px-4">
                <h1 className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] ">
                  ZIP CODE
                </h1>
                <Input
                  name="zip"
                  type="text"
                  onChange={handleChange}
                  value={
                    form.zip === "" || form.zip
                      ? form.zip
                      : profile?.attributes?.zip
                        ? profile?.attributes?.zip
                        : ""
                  }
                  className="rounded-[4px] border-[#34495D] bg-white  w-full md:w-full h-[46px]"
                  placeholder="zip code"
                />
              </div>

              {/* state */}
              <div className="flex flex-col space-y-2 px-4">
                <h1 className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] ">
                  State
                </h1>
                <Input
                  name="state"
                  type="text"
                  onChange={handleChange}
                  value={
                    form.state === "" || form.state
                      ? form.state
                      : profile?.attributes?.state
                        ? profile?.attributes?.state
                        : ""
                  }
                  className="rounded-[4px] border-[#34495D] bg-white  w-full md:w-full h-[46px]"
                  placeholder="state"
                />
              </div></>
          )
        }


        {/* the gender */}
        <div className="flex flex-col space-y-2 px-4">
          <h1 className='text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] '>GENDER</h1>
          <Select onValueChange={(e) => {
            setForm({ ...form, gender: e })
          }}>
            <SelectTrigger className="rounded-[4px] border-[#34495D] bg-white  w-full md:w-full h-[46px]">
              <SelectValue placeholder={form.gender === "" || form.gender
                ? form.gender
                : profile?.attributes.gender ? profile?.attributes.gender : ""} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* the user id */}
        <div className="flex flex-col space-y-2 px-4">
          <h1 className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] ">
            USER ID
          </h1>
          <Input
            name="userId"
            type="text"
            placeholder='e7fbe9883d6746458a6facfd70fdf09d'
            value={profileId} readOnly={true}
            className="rounded-[4px] border-[#34495D] bg-white  w-full md:w-full h-[46px] bg-[#F9FAFB]"
          />
        </div>

      </div>

      <div className="flex justify-center my-10 mx-4 md:mx-0">
        <button
          type="submit"
          className="w-full md:w-[196px] h-[48px] rounded-[6px] md:rounded-[4px] text-white bg-[#3EB87F] text-[14px] leading-[24px] font-semibold tracking-[0.5px] flex flex-col justify-center items-center "
        >
          {loader ? (
            <BiLoaderAlt className="text-center animate-spin" />
          ) : (
            "SAVE CHANGES"
          )}
        </button>
      </div>

      <Divider my="sm" />
    </form>
  );
};

export default UserDetails;
