"use client";

import { ResetPassword } from "@/app/_services/ForgotPassword";
import { useParams } from "next/navigation";
import { Input, Button } from "@heroui/react";
import { useState, useContext, useRef } from "react";
import * as zod from "zod";
import { AuthContext } from "@/app/context/AuthContext";
import { setToken } from "@/app/_services/cookies";
import { useRouter } from "next/navigation";

const passwordSchema = zod.object({
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Use at least 8 characters including letters, numbers, and a special symbol",
    ),
});

function page() {
  let { email } = useParams();
  email = decodeURIComponent(email as string);
  const password = useRef<HTMLInputElement>(null);
  const { setTokenContext } = useContext(AuthContext)!;
  const router = useRouter();



  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loding, setloding] = useState<boolean>(false);
  const [schemaError, setSchemaError] = useState<string | null>();
  const [ApiError, setApiError] = useState<string | null>();
  const toggleVisibility = () => setIsVisible(!isVisible);

  async function ResetNewPassword() {
    if (passwordSchema.safeParse({ password: password.current?.value }).success) {
      
      setApiError(null)
      setSchemaError(null);
      setloding(true)
      
      const respons = await ResetPassword({
        email: email as string,
        newPassword: password.current?.value as string,
      });

      if(respons.token){
        setTokenContext(respons.token)
        setToken(respons.token)
        router.replace("/");

      }else{
        setApiError(respons.message)
      }



      setloding(false)

    } else {
      setSchemaError(
        passwordSchema.safeParse({ password: password.current?.value }).error
          ?.issues[0].message,
      );
    }
  }

  return (
    <div className=" flex gap-4 flex-col mt-14 justify-center items-center bg-white py-10 px-6 rounded-2xl shadow-2xl md:w-[70%] mx-auto ">
      <h2 className=" text-2xl mb-4">Reset Password</h2>
      <Input
        isDisabled
        variant="bordered"
        label="email"
        type="email"
        labelPlacement="outside"
        placeholder={email as string}
      />
      <Input
        isInvalid={schemaError != null}
        errorMessage={schemaError}
        ref={password}
        variant="bordered"
        label="newPassword"
        type={isVisible ? "text" : "password"}
        labelPlacement="outside"
        placeholder="Enter your new Password"
        endContent={
          <button
            aria-label="toggle password visibility"
            className="focus:outline-solid outline-transparent"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
        }
      />
      {ApiError && 
      <h2 className=" text-red-500 my-3 text-medium">{ApiError}</h2>
      }

      <Button isLoading={loding} isDisabled={loding} onPress={ResetNewPassword} size="lg" color="primary">
        Reset
      </Button>
    </div>
  );
}

export default page;
