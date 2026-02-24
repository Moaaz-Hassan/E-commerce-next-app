export async function GetResetCode(Email: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email: Email })
      },
    );

    const CodeResponse = await response.json();
    return CodeResponse;
  } catch (err) {
    console.log(err);
  }
}



export async function VerifyResetCode(code: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ resetCode: code })
      },
    );


    const CodeResponse = await response.json();
    return CodeResponse;
  } catch (err) {
    console.log(err);
  }
}





export async function ResetPassword(value: { email: string , newPassword: string }) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(value),
      },
    );

    const ResetResponse = await response.json();
    return ResetResponse;
  } catch (err) {
    console.log(err);
  }
}



