import { getToken } from "./CartServices";

export async function GetReviewsForProduct(id: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`,
    );

    if (!response.ok) {
      return null;
    }

    const Reviews = await response.json();
    return Reviews;
  } catch (erro) {
    console.log(erro);
  }
}

export async function updateReviews(
  reviewId: string,
  bode: {
    review: string;
    rating: number;
  },
) {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      {
        method: "PUT",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bode),
      },
    );

    if (!response.ok) {
      return null;
    }

    const Reviews = await response.json();
    return Reviews;
  } catch (erro) {
    console.log(erro);
  }
}

export async function deletReviews(reviewId: string) {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      },
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function CreateReview(
  productId: string,
  body: {
    review: string;
    rating: number;
  },
) {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("CreateReview failed:", err);
      return null;
    }
    return response.json();
  } catch (erro) {
    console.log(erro);
  }
}
