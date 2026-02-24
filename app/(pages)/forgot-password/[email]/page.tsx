"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { GetResetCode, VerifyResetCode } from "@/app/_services/ForgotPassword";
import { Spinner } from "@heroui/react";
import { InputOtp, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/app/_componentes/CountdownTimer";



interface VerifyResetCodeResponse {
  status: string;   
  message?: string;
}

interface GetResetCodeResponse {
  statusMsg: string; 
  message: string;
}


function page() {
  const { email } = useParams();
  const [loding, setLoding] = useState<boolean>(true);
  const [sendloding, setsendLoding] = useState<boolean>(false);
  const [message, setmessage] = useState<string>("");
  const [Codevalue, setCodeValue] = useState<string>("");
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(600); 



  async function sentCode() {
    if (Codevalue.length > 3) {
      setsendLoding(true);
      const respons:VerifyResetCodeResponse = await VerifyResetCode(Codevalue);
      if (respons.status == "Success") {
        router.replace(`/creat-new-password/${email}`);
      }
    }
  }

  useEffect(() => {
    async function sendRequest() {
      const respons:GetResetCodeResponse = await GetResetCode(decodeURIComponent(email as string));
      if (respons.statusMsg === "success") {
        setmessage(respons.message);
      }
      setLoding(false);
    }

    sendRequest();
  }, []);

  if (loding) {
    return (
      <div className=" h-96 flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <>
      {message && (
        <div className=" flex items-center flex-col">
          <div className="">
            <InputOtp
              color="primary"
              variant="bordered"
              size="lg"
              length={6}
              value={Codevalue}
              onValueChange={setCodeValue}
              isDisabled={timeLeft == 0 ? true : false}
            />
            <Button
              isLoading={sendloding}
              isDisabled={sendloding}
              onPress={sentCode}
              size="md"
              color="primary"
            >
              send
            </Button>
          </div>
          <div className=" flex items-center gap-2 mt-2">
            <h2>{message}</h2>
            <CountdownTimer timeLeft = {timeLeft} setTimeLeft={setTimeLeft} />
          </div>
        </div>
      )}
    </>
  );
}

export default page;
