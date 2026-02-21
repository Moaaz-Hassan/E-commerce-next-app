"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { Button, Alert } from "@heroui/react";
import { AddProductToCart } from "../_services/CartServices";
import { usePathname } from "next/navigation";

import {
  GetWishlist,
  AddToWishlist,
  RemoveProductFromWishlist,
} from "../_services/WishlistServices";
import { WishlistResponse } from "../_interfaces/wishlistInterfacee";
import { Spinner } from "@heroui/react";
import { queryClient } from "./ProvidersComponent";

function AddToCart({ productId }: { productId: string }) {
  const pathname = usePathname();


  const [addToCartLodding, setaddToCartLodding] = useState(false);
  const [toggelWishlistLodding, setToggelToWishlistLodding] = useState(false);
  const [status, setStatus] = useState("");
  const { tokenContext  } = useContext(AuthContext)!;
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const [wishlistIds, setWishlist] = useState<string[]>([]);

  async function sendAddToCart() {
    if (tokenContext) {
      setaddToCartLodding(true);
      const respons = await AddProductToCart(productId);
      setStatus(respons?.status);
      setIsVisible(true);
      setaddToCartLodding(false);
    } else {
      router.replace("/login");
    }
  }

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const data: WishlistResponse | null = await GetWishlist();
        if (data) {
          const ids = data.data.map((product) => product._id);
          setWishlist(ids);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        console.log("Error fetching wishlist:", err);
        setWishlist([]);
      }
    }

    if (tokenContext) {
      fetchWishlist();
    }
  }, []);

  async function ToggelWishList() {
    if (tokenContext) {
      setToggelToWishlistLodding(true);

      if (wishlistIds.includes(productId)) {
        const respons = await RemoveProductFromWishlist(productId);
        if (respons.status == "success") {
          setWishlist(respons.data);
          // Invalidate the wishlist query so the page refetches the updated data
          // and completely removes the deleted product from the Wishlist UI.
          if(pathname == "/wishlist"){
            queryClient.invalidateQueries({queryKey :["getWishProductes"]});

          }
          
        }
      } else {
        const respons = await AddToWishlist(productId);
        if (respons.status == "success") {
          setWishlist(respons.data);
        }
      }

      setToggelToWishlistLodding(false);
    } else {
      router.replace("/login");
    }
  }

  return (
    <div>
      {isVisible && (
        <Alert
          className="w-96 z-50 fixed top-3 left-1/2 -translate-x-1/2"
          color={status === "success" ? "success" : "danger"}
          description={
            status === "success"
              ? "Product added successfully to your cart"
              : "Something went wrong"
          }
          title={status === "success" ? "Success" : "Error"}
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
      )}
      <div className=" flex items-center  mt-5 gap-3  ">
        <Button
          onPress={sendAddToCart}
          isLoading={addToCartLodding}
          disabled={addToCartLodding}
          color="primary"
          className=" grow "
        >
          add to cart
        </Button>
        {toggelWishlistLodding ? (
          <Spinner color="danger" size="sm" />
        ) : (
          <svg
            onClick={ToggelWishList}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={` size-8 cursor-pointer active:scale-105 ${wishlistIds.includes(productId) ? "  text-red-700" : " text-gray-400"} `}
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default AddToCart;
