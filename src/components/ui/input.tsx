"use client";
import * as React from "react"
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [active, setActive] = React.useState<boolean>(false)
    return (
      <div className="flex space-x-4 items-center">
        <input
          type={active ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border- file:bg-transparent file:text-sm file:font-medium placeholder-gray-500 placeholder-opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2z disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {
          type === "password" && (
            <>
              {
                active ? (
                  <IoEyeOutline onClick={() => { setActive(false) }} className="cursor-pointer" />
                ) : (
                  <FaEyeSlash onClick={() => { setActive(true) }} className="cursor-pointer" />
                )
              }
            </>

          )
        }

      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
