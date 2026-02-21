import { CartItem } from "../_interfaces/ordersintrface"
import Link from "next/link";
import Image from "next/image";
import AddToCart from "./AddToCart";
import { currencyFormat } from "../_services/currencyFormat";

function CreatProductOrder({ product }: { product: CartItem }) {
  return (
    <div className="p-3 mx-auto w-full max-w-sm rounded-md border-1 border-gray-300  shadow-xl hover:border-blue-700 ">
      <Link href={`/product-detailes/${product.product._id}`}>
        <div className=" px-4 w-36 rounded-2xl py-2 bg-blue-600 flex items-center justify-center text-white font-bold">Ordered {product.count}</div>
        <Image
          src={product.product.imageCover}
          alt={product.product.title}
          width={300}
          height={300}
          className="w-full  h-72  object-contain rounded-xl"
        />
        <h2 className=" text-sm text-gray-600 font-medium mt-2">
          {product.product.subcategory.name}
        </h2>
        <h1 className=" text-gray-900 font-bold  text-2xl line-clamp-1">
          {product.product.title}
        </h1>
        <div className=" flex items-center justify-between">
          <Image
            src={product.product.brand.image}
            alt={product.product.title}
            width={300}
            height={300}
            className="w-12 h-auto "
          />
          <div className=" flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={product.product.ratingsAverage >= index+1 ? "size-6 text-amber-400" :  "size-6 text-gray-500" }
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
        <h2 className="text-xl text-gray-800 ">{currencyFormat(product.price)}</h2>
      </Link>
    </div>
  )
}

export default CreatProductOrder