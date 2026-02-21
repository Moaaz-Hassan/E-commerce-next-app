"use client";
import { useState, useEffect } from "react";
import { getAllCategories } from "@/app/_services/categoriesServices";
import { categoriesRespons } from "@/app/_interfaces/categoriesInterface";
import { Pagination } from "@heroui/react";
import LodingScrean from "@/app/_componentes/LodingScrean";
import Link from "next/link";
import Image from "next/image";

function Categories() {
  const [curantPage, setCurantPage] = useState(1);
  const [loding, setLoding] = useState(true);
  const [data, setData] = useState<categoriesRespons | []>([]);

  useEffect(() => {
    async function getData() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setLoding(true);
      const response = await getAllCategories(curantPage);
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
            {data?.data.map((cat) => (
              <Link
                key={cat._id}
                className=" h-fit"
                href={`category-detailes/${cat._id}`}
              >
                <div className="p-3 h-fit  mx-auto w-full max-w-sm rounded-md border-1 border-gray-300  shadow-xl hover:border-blue-700 ">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={300}
                    height={300}
                    className="w-full h-24 object-contain mx-auto"
                  />
                  <h2 className=" text-gray-800 font-medium text-xl text-center mt-3 ">
                    {cat.name}
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

export default Categories;
