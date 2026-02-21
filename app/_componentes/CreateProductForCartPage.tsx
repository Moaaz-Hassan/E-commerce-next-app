"use client";

import { useState, useEffect } from "react";
import { cartProduct } from "../_interfaces/cartInterfacs";
import Image from "next/image";
import { currencyFormat } from "../_services/currencyFormat";
import { updateProductQuantity } from "../_services/CartServices";
import { Spinner } from "@heroui/react";
import { Alert } from "@heroui/react";
import { RemoveProductFromCart } from "../_services/CartServices";

import { cartrespons } from "../_interfaces/cartInterfacs";

interface CreateProductProps {
  product: cartProduct;
  setCartProducts: React.Dispatch<React.SetStateAction<cartrespons | undefined>>;
}

function CreateProductForCartPage({
  product,
  setCartProducts,
}: CreateProductProps) {
  const [numberOfProduct, setNumberOfProduct] = useState(product.count);
  const [loding, setLoding] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const [removeLoding, setRemoveLoding] = useState(false);
  
  async function RemoveProduct() {
    setRemoveLoding(true);
    const respons = await RemoveProductFromCart(product.product.id);
    if (respons?.status === "success") {
      setCartProducts(respons);
    }
    setRemoveLoding(false);
  }

  async function increaseProductAmount() {
    const newCount = numberOfProduct + 1;
    await updateQuantity(newCount);
  }
  async function decreaseProductAmount() {
    if (numberOfProduct <= 1) return;
    const newCount = numberOfProduct - 1;
    await updateQuantity(newCount);
  }

  async function updateQuantity(count: number) {
    setLoding(true);

    const respons = await updateProductQuantity(product.product.id, count);

    if (respons?.status === "success") {
      setStatus("success");
      setCartProducts(respons);
      setNumberOfProduct(count);
    } else {
      setStatus("fail");
    }

    setIsVisible(true);
    setLoding(false);
  }

  return (
    <>
      {isVisible && (
        <Alert
          className="w-96 z-50 fixed top-3 left-1/2 -translate-x-1/2"
          color={status === "success" ? "success" : "danger"}
          description={
            status === "success"
              ? "Product Quantity Updated Successfully"
              : "Something went wrong"
          }
          title={status === "success" ? "Success" : "Error"}
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
      )}

      <div className="shadow-md w-full border-1 border-gray-400 hover:border-blue-700 rounded-xl px-3 py-5 grid grid-cols-4 ">
        <div className=" flex gap-2 items-center col-span-3">
          <Image
            className=" w-24 h-24  object-cover rounded-xl md:w-28 md:h-28"
            alt={product.product.title}
            height={100}
            width={100}
            src={product.product.imageCover}
          ></Image>
          <div className=" flex flex-col ">
            <h2 className=" line-clamp-1 text-medium font-semibold text-gray-900">
              {product.product.title}
            </h2>
            <div className=" flex gap-1 ">
              <p className=" text-sm font-medium text-gray-700 pr-1 border-r-1">
                {product.product.brand.name}
              </p>
              <p className=" text-sm font-medium text-gray-700">
                {product.product.category.name}
              </p>
            </div>
            <div className=" flex gap-4 mt-3">
              <p
                onClick={loding ? undefined : decreaseProductAmount}
                className={`w-7 h-7 rounded-md border flex items-center justify-center
              ${loding ? "opacity-50 pointer-events-none" : "cursor-pointer active:bg-gray-200"}`}
              >
                -
              </p>

              <p className=" text-medium font-semibold text-gray-800">
                {loding ? <Spinner size="sm" /> : numberOfProduct}
              </p>

              <p
                onClick={loding ? undefined : increaseProductAmount}
                className={`w-7 h-7 rounded-md border flex items-center justify-center
              ${loding ? "opacity-50 pointer-events-none" : "cursor-pointer active:bg-gray-200"}`}
              >
                +
              </p>
            </div>
          </div>
        </div>
        <div className=" col-span-1 flex flex-col items-end justify-between ">
          <div>
            <h3 className=" text-gray-800 font-semibold">
              {currencyFormat(product.price)}
            </h3>
            <p className=" text-gray-600 font-light text-sm">each</p>
          </div>

          <h3 onClick={removeLoding ? undefined : RemoveProduct} className=" text-red-700 active:text-red-400 cursor-pointer">
            {removeLoding? <Spinner size="sm" color="danger"/> : "Remove"}
          </h3>
        </div>
      </div>
    </>
  );
}

export default CreateProductForCartPage;
