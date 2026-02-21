"use client";
import { useState, useEffect } from "react";
import { GetReviewsForProduct } from "@/app/_services/ReviewsServices";
import { rewiewsRespons } from "@/app/_interfaces/reviewsinterfaces";
import ReviewsLoding from "./ReviewsLoding";
import { timeAgo } from "@/app/_services/timeFormat";
import { VerifyToken } from "@/app/_services/VerifyToken";
import ReviewForm from "./ReviewForm";
import { deletReviews } from "@/app/_services/ReviewsServices";
import { Spinner } from "@heroui/react";
import { rewiew } from "@/app/_interfaces/reviewsinterfaces";

function ProductReviews({ productId }: { productId: string }) {
  const [loding, setLodind] = useState(true);
  const [deletloding, setdeletLodind] = useState(false);
  const [data, setData] = useState<rewiewsRespons | null>(null);
  const [userId, setuserId] = useState<string | null>(null);

  const [reviewForUpdate, setreviewForUpdate] = useState<rewiew | null>(null);



  async function delet(id:string){
    setdeletLodind(true)
    const respons = await deletReviews(id)
    if(respons){
      await fechdata()
    }
    setdeletLodind(false)

  }

  async function fechdata( ){
    const response = await GetReviewsForProduct(productId);
      setData(response);

    
  }

  useEffect(() => {
    async function getData() {
      setLodind(true);
      await fechdata()
      const currentUserId = await VerifyToken();
      setuserId(currentUserId);

      setLodind(false);
    }
    getData();
  }, []);

  if (loding)
    return (
      <div className=" mt-3">
        <ReviewsLoding />
        <ReviewsLoding />
      </div>
    );

  return (
    <div>
      <div className=" mt-3 ">
        {userId && <ReviewForm reviewForUpdate={reviewForUpdate}  setreviewForUpdate={setreviewForUpdate}   productId={productId} fechdata={fechdata} />}
        {data?.data?.length === 0 ? (
          <h2 className="mt-2 text-gray-600">
            No reviews yet. Be the first to review this product
          </h2>
        ) : (
          data?.data?.map((rewiew) => (
            <div
              key={rewiew._id}
              className={`mt-2 p-2 border-1 border-gray-300 rounded-xl w-full md:w-[50%] ${reviewForUpdate && "  bg-gray-400 "}`}
            >
              <div>
                <h2 className="text-sm text-gray-700">{rewiew.user.name}</h2>
                <h2 className="text-sm text-gray-700">
                  {timeAgo(rewiew.createdAt)}
                </h2>
              </div>

              <h2 className="text-xl font-medium text-gray-800">
                {rewiew.review}
              </h2>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={rewiew.rating >= index+1 ? "size-5 text-amber-400" :  "size-5 text-gray-500" }
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>

              {userId === rewiew.user._id && (
                <div className="flex items-center gap-2">
                  <h2 className=" cursor-pointer " onClick={()=>{setreviewForUpdate(rewiew)}} >Update</h2>
                  <h2 className=" cursor-pointer " onClick={()=>{delet(rewiew._id)}}> {deletloding ? <Spinner size="sm" /> : "Delete" } </h2>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
