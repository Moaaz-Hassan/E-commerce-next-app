"use client";
import { useState } from "react";
import Image from "next/image";

type ImabeSliderProps = {
  imges: string[];
  titel: string;
};

function ImabeSlider({ imges, titel }: ImabeSliderProps) {
  const [currentImage, setCurrentImage] = useState(0);

  function nextImage() {
    setCurrentImage((prev) => (prev === imges.length - 1 ? 0 : prev + 1));
  }

  function previousImage() {
    setCurrentImage((prev) => (prev === 0 ? imges.length - 1 : prev - 1));
  }

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8 absolute left-0 top-[50%] cursor-pointer text-blue-700 active:text-blue-500  "
        onClick={previousImage}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
        />
      </svg>

      <img alt={titel} src={imges[currentImage]} className=" w-full" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8 absolute right-0 top-[50%] cursor-pointer text-blue-700 active:text-blue-500  "
        onClick={nextImage}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
}

export default ImabeSlider;
