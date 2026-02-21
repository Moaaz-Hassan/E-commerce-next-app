"use server";

import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return token;
}

export async function AddProductToCart(productId: string) {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart`,
      {
        method: "POST",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      },
    );
    if (!response.ok) {
      console.log("Request failed");
      return null;
    }

    const cartResponse = await response.json();

    return cartResponse;
  } catch (err) {
    console.log(err);
  }
}

export async function getCartDetails() {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart`,
      {
        method: "GET",
        headers: {
          token: token as string,
        },
      },
    );

    if (!response.ok) {
      console.log(response);
      return null;
    }
    const cartResponse = await response.json();

    return cartResponse;
  } catch (err) {
    console.log(err);
  }
}

export async function updateProductQuantity(ProductID: string, Amount: number) {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${ProductID}`,
      {
        method: "PUT",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: Amount }),
      },
    );

    const cartResponse = await response.json();

    return cartResponse;
  } catch (err) {
    console.log(err);
  }
}

export async function RemoveProductFromCart(ProductID: string) {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${ProductID}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      },
    );

    const cartResponse = await response.json();

    return cartResponse;
  } catch (err) {
    console.log(err);
  }
}

export async function ClearCart() {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      },
    );
    if (!response.ok) {
      console.log(response);
      return null;
    }
    const cartResponse = await response.json();

    return cartResponse;
  } catch (err) {
    console.log(err);
  }
}
