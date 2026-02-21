"use client";
import { useState, useEffect } from "react";
import { WishlistResponse } from "@/app/_interfaces/wishlistInterfacee";
import { GetWishlist } from "@/app/_services/WishlistServices";
import CreateProductsCard from "@/app/_componentes/CreateProductsCard";
import LodingScrean from "@/app/_componentes/LodingScrean";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";


function WishList() {
  const { data, isLoading } = useQuery({
    queryKey: ["getWishProductes"],
    queryFn: GetWishlist,
  });

  if (isLoading) return <LodingScrean />;

  if (!data) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <h2 className="text-gray-800 font-extrabold text-3xl">Error</h2>
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className=" w-full h-96 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {" "}
          Your wishlist is empty
        </h2>
        <Link
          href={"/products"}
          className=" active:bg-blue-400 text-white font-semibold text-xl bg-blue-600 p-3 rounded-xl"
        >
          Add Onesh
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="md:text-2xl text-xl font-semibold text-gray-800 my-1">
        You have {data.data.length} {data.data.length === 1 ? "item" : "items"}{" "}
        in your wishlist
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
        {data.data.map((product) => (
          <CreateProductsCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default WishList;
