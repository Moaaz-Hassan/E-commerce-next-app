"use server";

export async function signin(value: { email: string; password: string }) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(value),
      },
    );

    const signinResponse = await response.json();
    return signinResponse;
  } catch (err) {
    console.log(err);
  }
}

export async function Signup(value: {name : string , email: string; password: string ,rePassword:string ,phone: string  }) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(value),
      },
    );

    const signinResponse = await response.json();
    return signinResponse;
  } catch (err) {
    console.log(err);
  }
}
