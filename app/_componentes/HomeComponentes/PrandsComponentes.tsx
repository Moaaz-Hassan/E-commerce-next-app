"use client";
import { useState, useEffect } from "react";
import { BrandResponse } from "@/app/_interfaces/brandsInterface";
import { getAllBrands } from "@/app/_services/brandsServices";
import { Skeleton } from "@heroui/react";
import Link from "next/link";

function PrandsComponentes() {
  const [loding, setLoding] = useState(true);
  const [data, setData] = useState<BrandResponse | null>(null);

  useEffect(() => {
    async function getData() {
      setLoding(true);
      const response = await getAllBrands(1);
      setData(response);
      setLoding(false);
    }
    getData();
  }, []);

  return (
    <div className="mt-4">
      {loding ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Brands</h2>
          <div className="h-12 md:h-16 w-full overflow-hidden">
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton
                key={index}
                className="rounded-full w-12 md:h-16 md:w-16 h-12 ml-2 inline-block cursor-pointer"
              />
            ))}
          </div>
          <div className="text-end">
            <Link
              className="text-blue-600 text-xl font-medium"
              href="/brands"
            >
              View all
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Brands</h2>
          <div className="w-full overflow-x-scroll scrollbar-hide flex items-center gap-2 flex-wrap">
            {data?.data.map((brand) => (
              <Link key={brand._id} href={`/brand-detailes/${brand._id}`}>
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="rounded-full w-12 md:h-16 md:w-16 h-12 border-1 border-gray-600 hover:border-blue-700 "
                />
              </Link>
            ))}
          </div>
          <div className="text-end mt-2">
            <Link
              className="text-blue-600 text-xl font-medium "
              href="/brands"
            >
              View all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrandsComponentes;
