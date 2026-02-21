"use client";

import { useState } from "react";
import home_1 from "../../assets/home_1.png";
import home_2 from "../../assets/home_2.png";
import home_3 from "../../assets/home_3.png";
import home_4 from "../../assets/home_4.png";
import Image from "next/image";
import Link from "next/link";

function HomeSlider() {
  const images = [home_1, home_2, home_3, home_4];

  const [curantImage, setCurantImage] = useState(0);

  setTimeout(() => {
    if (images.length > curantImage + 1) {
      setCurantImage(curantImage + 1);
    } else {
      setCurantImage(0);
    }
  }, 2000);

  return (
    <Link href={"/products"}>
      <div className=" flex items-center justify-center w-full h-60 lg:h-72">
        <Image
          className=" w-[80%] md:w-[70%] h-full object-cover rounded-xl  "
          alt="home Imag"
          src={images[curantImage]}
          width={1000}
          height={1000}
        />
      </div>
    </Link>
  );
}

export default HomeSlider;
