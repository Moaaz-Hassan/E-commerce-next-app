import { getToken } from "./CartServices";

export async function VerifyToken() {
  const token = await getToken();
  if (!token) {
    return null;
  }
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,
      {
        method: "GET",
        headers: {
          token: token as string,
        },
      },
    );

    const userData = await response.json();

    return userData.decoded.id;
  } catch (err) {
    console.log(err);
  }
}
