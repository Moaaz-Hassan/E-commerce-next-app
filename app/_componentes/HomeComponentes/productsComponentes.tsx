"use client";
import { useState, useEffect } from "react";
import { productsRespons } from "@/app/_interfaces/productInterfacs";
import CreateProductsCard from "../CreateProductsCard";
import { getProducts } from "@/app/_services/ProductsServices";
import LodingScrean from "../LodingScrean";
import Link from "next/link";

function ProductsComponentes() {
  const [loding, setLoding] = useState(true);
  const [data, setData] = useState<productsRespons | null>(null);

  useEffect(() => {
    async function getData() {
      setLoding(true);
      const response = await getProducts(1);
      setData(response);
      setLoding(false);
    }
    getData();
  }, []);
  return (
    <div>
      {loding ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Products</h2>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 ">
            <LodingScrean />
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Products</h2>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-3 mb-5 ">
            {data?.data.map((product) => (
              <CreateProductsCard key={product._id} product={product} />
            ))}
          </div>
          <div className="text-end">
            <Link
              className="text-blue-600 text-xl font-medium"
              href="/products"
            >
              View all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsComponentes;
