"use client";

import { cartrespons } from "@/app/_interfaces/cartInterfacs";
import { useState, useEffect } from "react";
import { currencyFormat } from "@/app/_services/currencyFormat";
import { getCartDetails } from "@/app/_services/CartServices";
import EmptCart from "@/app/_componentes/EmptCart";
import { Button } from "@heroui/react";
import CreateProductForCartPage from "@/app/_componentes/CreateProductForCartPage";
import { ClearCart } from "@/app/_services/CartServices";
import Link from "next/link";
import { Alert, Spinner } from "@heroui/react";
import CheckOutComponentes from "@/app/_componentes/CheckOutComponentes";

function Cart() {
  const [cartProducts, setCartProducts] = useState<cartrespons >();
  const [loding, setLoding] = useState(true);

  const [clearloding, setClearLoding] = useState(false);
  const [status, setStatus] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  async function crear() {
    setClearLoding(true);
    const respons = await ClearCart();
    if (respons !== null) {
      setStatus(respons?.status);
      setIsVisible(true);
      setCartProducts(respons);
    } else {
      setStatus("Error");
      setIsVisible(true);
    }

    setClearLoding(false);
  }

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  useEffect(() => {
    async function getdata() {
      setLoding(true);
      const respons = await getCartDetails();
      console.log(respons);
      setCartProducts(respons);
      setLoding(false);
    }
    getdata();
  }, []);

  if (cartProducts === null) {
    return (
      <div className=" w-full h-96 flex items-center justify-center">
        <h2 className=" text-gray-800 font-extrabold text-3xl">Error</h2>
      </div>
    );
  }

  return (
    <div>
      {isVisible && (
        <Alert
          className="w-96 z-50 fixed top-3 left-1/2 -translate-x-1/2"
          color={status === "success" ? "success" : "danger"}
          description={
            status === "success"
              ? "your cart is empty "
              : "Something went wrong"
          }
          title={status === "success" ? "Success" : "Error"}
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
      )}
      {loding ? (
        <div className=" w-full h-96 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div>
          {cartProducts?.data?.products?.length === 0 ? (
            <EmptCart />
          ) : (
            <div>
              <h1 className=" text-3xl font-bold text-gray-900 mt-4">
                shopping cart
              </h1>
              <p className=" text-medium font-semibold text-gray-700 mt-1">{`${cartProducts?.numOfCartItems} items in your cart`}</p>
              <div className=" grid grid-cols-1 md:grid-cols-3 gap-3 mt-10 mb-5">
                <div className=" col-span-1 md:col-span-2 flex flex-col gap-4 overflow-y-scroll scrollbar-hide  max-h-[60vh] ">
                  {cartProducts?.data.products.map((cartProduct) => (
                    <CreateProductForCartPage
                      key={cartProduct._id}
                      setCartProducts={setCartProducts}
                      product={cartProduct}
                    />
                  ))}
                </div>
                <div>
                  <div className=" col-span-1 gap-2 px-3 py-5 flex flex-col shadow-xl h-fit rounded-xl border-1 border-gray-400">
                    <h2 className=" text-xl font-bold text-gray-900 mb-2">
                      Order Summry
                    </h2>
                    <div className=" flex items-center justify-between">
                      <h2 className=" text-sm font-medium text-gray-700">
                        Subtotal
                      </h2>
                      <h2 className=" text-medium font-medium text-gray-900">
                        {currencyFormat(cartProducts?.data.totalCartPrice)}
                      </h2>
                    </div>
                    <div className=" flex items-center justify-between border-b-1 border-gray-900 pb-2">
                      <h2 className=" text-sm font-medium text-gray-700">
                        shippingCost
                      </h2>
                      <h2 className=" text-medium font-bold text-green-600">
                        Free
                      </h2>
                    </div>
                    <div className=" flex items-center justify-between ">
                      <h2 className=" text-medium font-semibold text-gray-700">
                        Total
                      </h2>
                      <h2 className=" text-xl font-bold text-gray-950">
                        {currencyFormat(cartProducts?.data.totalCartPrice)}
                      </h2>
                    </div>

                    <Link className="w-full " href="/products">
                      <Button className=" w-full mt-3 bg-transparent text-black border-1 font-bold">
                        continue shopping
                      </Button>
                    </Link>
                    <CheckOutComponentes cartId={cartProducts?.cartId} />
                    
                  </div>
                  <div className=" text-end">
                    <Button
                      onPress={crear}
                      className=" mt-3"
                      size="md"
                      color="danger"
                    >
                      {clearloding ? (
                        <Spinner color="white" size="sm" />
                      ) : (
                        "Clear Cart"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
