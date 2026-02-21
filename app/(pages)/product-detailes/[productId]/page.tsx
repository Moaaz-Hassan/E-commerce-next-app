import { Params } from "next/dist/server/request/params";
import { getProductDetailes } from "@/app/_services/ProductsServices";
import { product } from "@/app/_interfaces/productInterfacs";
import ImabeSlider from "@/app/_componentes/ImageSlider";
import Image from "next/image";
import AddToCart from "@/app/_componentes/AddToCart";
import { currencyFormat } from "@/app/_services/currencyFormat";
import ProductReviews from "@/app/_componentes/ReviewsComponentes/ProductReviews";

async function ProductDetailes({ params }: { params: Params }) {
  const { productId } = await params;
  const { data }: { data: product } = await getProductDetailes(productId);

  if (data == null) {
    return (
      <div className=" w-full h-96 flex items-center justify-center">
        <h2 className=" text-gray-800 font-extrabold text-3xl">Error</h2>
      </div>
    );
  }

  return (
    <div>
    <div className=" grid gap-8 grid-cols-1 md:grid-cols-3 rounded-xl border border-blue-300 p-3 mt-5 mb-3">
      <ImabeSlider titel={data.title} imges={data.images} />

      <div className=" md:col-span-2">
        <h2 className=" text-sm text-gray-600 font-medium mt-2">
          {data.category.name}
        </h2>
        <h1 className=" text-gray-900 font-bold  text-2xl ">{data.title}</h1>
        <div className=" flex items-center justify-between">
          <Image
            src={data.brand.image}
            alt={data.title}
            width={300}
            height={300}
            className="w-28 "
          />
          <div className=" flex items-center gap-1">
            {Array.from({ length:5  }).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={data.ratingsAverage >= index+1 ? "size-6 text-amber-400" :  "size-6 text-gray-500" }
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
        <h3 className=" font-bold text-gray-600 text-sm mb-5">
          {data.description}
        </h3>
        <h2 className="text-xl text-gray-800 ">{currencyFormat(data.price)}</h2>

        <AddToCart productId={data.id} />
      </div>
    </div>
    <ProductReviews productId={Array.isArray(productId) ? productId[0] : productId ?? ""}/>
    </div>
  );
}

export default ProductDetailes;
