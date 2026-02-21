"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { productsRespons } from "@/app/_interfaces/productInterfacs";
import { getSpecificBrand } from "@/app/_services/brandsServices";
import LodingScrean from "@/app/_componentes/LodingScrean";
import CreateProductsCard from "@/app/_componentes/CreateProductsCard";
import { Pagination } from "@heroui/react";

function page() {
  const { brandID } = useParams();

  const [curantPage, setCurantPage] = useState(1);
  const [loding, setLoding] = useState(true);
  const [data, setData] = useState<productsRespons>();

  useEffect(() => {
    async function getData() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setLoding(true);
      const response = await getSpecificBrand(curantPage, brandID as string);
      console.log(response);
      setData(response);
      setLoding(false);
    }
    getData();
  }, [curantPage]);

  if (data === null) {
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
            {data?.data.map((product) => (
              <CreateProductsCard key={product._id} product={product} />
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

export default page;
