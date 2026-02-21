import { getToken } from "./CartServices";

export async function AddToWishlist(productId: string) {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
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

    const WishlistResponse = await response.json();

    return WishlistResponse;
  } catch (err) {
    console.log(err);
  }
}
export async function  GetWishlist () {
    const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
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
    const WishlistResponse = await response.json();

    return WishlistResponse;
  } catch (err) {
    console.log(err);
  }

}

export async function RemoveProductFromWishlist(productId: string) {
      const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      },
    );

    const WishlistResponse = await response.json();

    return WishlistResponse;
  } catch (err) {
    console.log(err);
  }

}
