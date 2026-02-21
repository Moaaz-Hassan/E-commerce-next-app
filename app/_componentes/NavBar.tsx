"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../assets/shopzoneLogo.png";
import { AuthContext } from "../context/AuthContext";
import { removeToken } from "../_services/cookies";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useRouter } from "next/navigation";

function NavBar() {
  const { tokenContext, setTokenContext } = useContext(AuthContext);

  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  function toggleMenu() {
    setOpenMenu(!openMenu);
  }

  function LogOut() {
    removeToken();
    setTokenContext(null);
    router.replace("/");
  }

  return (
    <div className=" bg-gray-700  shadow-2xl ">
      <div className=" container mx-auto p-3 flex items-center justify-between md:flex-row flex-col  h-full  ">
        <div className=" flex items-center justify-between w-full md:w-fit ">
          <Link href={"/"}>
            <Image src={logo} alt="ShopZone Logo" width={130} height={50} />
          </Link>
          <svg
            onClick={toggleMenu}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 cursor-pointer block md:hidden active:text-gray-300 text-gray-100"
          >
            <path
              fillRule="evenodd"
              d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="grow  items-center justify-between  hidden md:flex">
          <div></div>
          <div className="flex items-center gap-3 font-bold text-gray-100 text-md md:text-lg">
            <Link
              className={pathname === "/products" ? " border-b-2" : ""}
              href={"/products"}
            >
              Products
            </Link>
            <Link
              className={pathname === "/brands" ? " border-b-2" : ""}
              href={"/brands"}
            >
              Brands
            </Link>
            <Link
              className={pathname === "/categories" ? " border-b-2" : ""}
              href={"/categories"}
            >
              Categories
            </Link>
          </div>
          <div className=" flex gap-2  ">
            <Link className="" href={`${tokenContext ? "/cart" : "/login"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7 text-gray-100"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </Link>

            <Link
              className=""
              href={`${tokenContext ? "/wishlist" : "/login"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7 text-gray-100"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </Link>
            <Dropdown>
              <DropdownTrigger className=" cursor-pointer outline-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7 text-gray-100"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {tokenContext ? (
                  <>
                    <DropdownItem as={Link} href="/allorders" key="my-orders">
                      My Orders
                    </DropdownItem>
                    <DropdownItem
                      onClick={LogOut}
                      key={"logout"}
                      color="danger"
                    >
                      LogOut
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem as={Link} href="/login" key="login">
                      Login
                    </DropdownItem>

                    <DropdownItem as={Link} href="/register" key="register">
                      Register
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {openMenu && (
          <div className=" w-full items-center justify-between  flex md:hidden  ">
            <div className="flex items-center gap-3 font-bold text-gray-100 text-md md:text-lg">
              <Link
                className={pathname === "/products" ? " border-b-2" : ""}
                href={"/products"}
              >
                Products
              </Link>
              <Link
                className={pathname === "/brands" ? " border-b-2" : ""}
                href={"/brands"}
              >
                Brands
              </Link>
              <Link
                className={pathname === "/categories" ? " border-b-2" : ""}
                href={"/categories"}
              >
                Categories
              </Link>
            </div>
            <div className=" flex gap-2 ">
              <Link href={`${tokenContext ? "/cart" : "/login"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7 text-gray-100"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
              </Link>
              <Link
                className=""
                href={`${tokenContext ? "/wishlist" : "/login"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7 text-gray-100"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              </Link>
              <Dropdown>
                <DropdownTrigger className=" cursor-pointer outline-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-7 text-gray-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  {tokenContext ? (
                    <>
                      <DropdownItem as={Link} href="/allorders" key="my-orders">
                        My Orders
                      </DropdownItem>
                      <DropdownItem
                        onClick={LogOut}
                        key={"logout"}
                        color="danger"
                      >
                        LogOut
                      </DropdownItem>
                    </>
                  ) : (
                    <>
                      <DropdownItem as={Link} href="/login" key="login">
                        Login
                      </DropdownItem>

                      <DropdownItem as={Link} href="/register" key="register">
                        Register
                      </DropdownItem>
                    </>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
