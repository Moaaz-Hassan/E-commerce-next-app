"use client";
import { useState, useEffect } from "react";
import { Input, Button } from "@heroui/react";
import { CreateReview } from "@/app/_services/ReviewsServices";
import Star from "./Star";
import { rewiew } from "@/app/_interfaces/reviewsinterfaces";
import { updateReviews } from "@/app/_services/ReviewsServices";

interface ReviewFormProps {
  productId: string;
  fechdata: () => Promise<void>;
  reviewForUpdate: rewiew | null;
  setreviewForUpdate : React.Dispatch<React.SetStateAction<string>> ;
}

function ReviewForm({ productId, fechdata, reviewForUpdate , setreviewForUpdate }: ReviewFormProps) {
  const [ratingnumber, setRatingnumber] = useState(0);
  const [loding, setLoding] = useState(false);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (reviewForUpdate) {
      setRatingnumber(reviewForUpdate.rating);
      setReviewText(reviewForUpdate.review);
    }
  }, [reviewForUpdate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (reviewForUpdate) {
      if (ratingnumber && reviewText) {
        setLoding(true);
        const respons = await updateReviews(reviewForUpdate._id, {
          review: reviewText,
          rating: ratingnumber,
        });
        if (respons) {
          setRatingnumber(0);
          setReviewText("");
          await fechdata();
          setreviewForUpdate(null)
        } else {
          console.log(respons);
        }
        setLoding(false);
      }
    } else {
      if (ratingnumber && reviewText) {
        setLoding(true);
        const respons = await CreateReview(productId, {
          review: reviewText,
          rating: ratingnumber,
        });
        if (respons) {
          setRatingnumber(0);
          setReviewText("");
          await fechdata();
        } else {
          console.log(respons);
        }
        setLoding(false);
      }
    }
  }

  return (
    <div>
      <form className=" flex  justify-between gap-5" onSubmit={handleSubmit}>
        <div className=" grow ">
          <Input
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="write your review"
            name="review"
            type="review"
          />
          <Star rating={ratingnumber} setRating={setRatingnumber} />
        </div>
        <Button
          isLoading={loding}
          disabled={loding}
          color="primary"
          type="submit"
        >
          {reviewForUpdate ? "Update" : "Add"}
        </Button>
      </form>
    </div>
  );
}

export default ReviewForm;
