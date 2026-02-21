"use client";
import { useState, useEffect } from "react";
import { getAllBrands } from "@/app/_services/brandsServices";
import { BrandResponse } from "@/app/_interfaces/brandsInterface";
import { Pagination } from "@heroui/react";
import LodingScrean from "@/app/_componentes/LodingScrean";
import Link from "next/link";
import Image from "next/image";

function Brands() {
  const [curantPage, setCurantPage] = useState(1);
  const [loding, setLoding] = useState(true);
  const [data, setData] = useState<BrandResponse | []>([]);

  useEffect(() => {
    async function getData() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setLoding(true);
      const response = await getAllBrands(curantPage);
      setData(response);
      setLoding(false);
    }
    getData();
  }, [curantPage]);

  if (data == null) {
    return (
      <div className=" w-full h-96 flex items-center justify-center">
        <h2 className=" text-gray-800 font-extrabold text-3xl">Error</h2>
      </div>
    );
  }

  return (
    <div>
      {loding ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 ">
          <LodingScrean />
        </div>
      ) : (
        <div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 ">
            {data?.data.map((brand) => (
              <Link key={brand._id} href={`brand-detailes/${brand._id}`}>
                <div className="p-3 mx-auto w-full max-w-sm rounded-md border-1 border-gray-300  shadow-xl hover:border-blue-700">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={300}
                    height={300}
                    className="w-full"
                  />
                  <h2 className=" text-gray-800 font-medium text-xl text-center mt-3">
                    {brand.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
          <div className=" w-full my-4  flex items-center justify-center">
            <Pagination
              page={curantPage}
              onChange={(page) => setCurantPage(page)}
              total={data?.metadata?.numberOfPages}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Brands;
