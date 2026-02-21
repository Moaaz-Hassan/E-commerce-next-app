"use client";
import { useState, useEffect } from "react";
import { categoriesRespons } from "@/app/_interfaces/categoriesInterface";
import { getAllCategories } from "@/app/_services/categoriesServices";
import { Skeleton } from "@heroui/react";
import Link from "next/link";


interface Category {
  _id: string;
  name: string;
  image: string;
}

function CategoriesComponentes() {
  const [loding, setLoding] = useState(true);
    const [data, setData] = useState<categoriesRespons >();
  
    useEffect(() => {
      async function getData() {
        setLoding(true);
        const response = await getAllCategories(1);
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
          <div className="h-16 md:h-28 w-full overflow-hidden">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className=" w-16 md:h-28 md:w-28 h-16 ml-2 inline-block cursor-pointer"
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">categories</h2>
          <div className="w-full overflow-x-scroll scrollbar-hide flex items-center gap-2 flex-wrap">
            {data?.data.map((category:Category) => (
              <Link key={category._id} href={`/category-detailes/${category._id}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className=" w-16 object-cover md:h-28 md:w-28 h-16  hover:border-1 hover:border-blue-700 "
                />
              </Link>
            ))}
          </div>
          <div className="text-end mt-2">
            <Link
              className="text-blue-600 text-xl font-medium "
              href="/categories"
            >
              View all
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesComponentes