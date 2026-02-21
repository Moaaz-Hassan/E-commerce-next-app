"use server";

import { getToken } from "./CartServices";
import { shppingDetailsinterface } from "../_interfaces/checkOutInterface";

export async function checkOutAction(cartId: string , shppingDetails :shppingDetailsinterface) {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.PASS_URL}`,
      {
        method: "POST",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shppingDetails }),
      },
    );
    if (!response.ok) {
      console.log("Request failed");
      return null;
    }

    const Response = await response.json();

    return Response;
  } catch (err) {
    console.log(err);
  }
}