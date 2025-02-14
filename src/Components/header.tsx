"use client";
import useCategory from "@/hooks/useCategory";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiMenuAlt3, HiOutlineViewGridAdd } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { SiOpensearch } from "react-icons/si";

export default function Header() {
  const t = useTranslations("header");
  const { category } = useCategory();
  console.log(category);
  return (
    <header className="bg-white px-4 md:px-0">
      {/* top */}
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-content-center rounded-md bg-primary text-white">
            <SiOpensearch size={30} />
          </div>
          <div className="flex items-center">
            <div className="grid size-11 place-content-center rounded-s-md bg-primary text-white">
              <IoIosSearch size={30} />
            </div>
            <input
              className="h-11 rounded-e-md border border-black/5 bg-gray-400/15 ps-3 focus:outline-none md:w-96"
              placeholder={t("inputSearch")}
              type="search"
            />
          </div>
        </div>

        <div className="hidden items-center gap-2 opacity-80 md:flex">
          <HiOutlineViewGridAdd size={30} />
          <h3 className="text-lg font-thin">Category</h3>
        </div>
        {/* mobile Button */}
        <button className="grid size-11 place-content-center rounded-md bg-primary text-white md:hidden">
          <HiMenuAlt3 />
        </button>
      </div>
      <hr className="h-[0.5px] border-black/25" />

      <div className="container hidden h-20 items-center justify-between md:flex">
        {category.map((item, index) => (
          <Link
            key={item?.id}
            className="flex h-full flex-grow items-center justify-center gap-2 border-e-[0.5px] border-s-[0.5px] border-black/10 opacity-85 transition-all hover:bg-primary hover:text-white"
            href={"/"}
          >
            <div className="size-8 bg-red-400">
                <Image width={32} height={32} alt={item.name} src={item.image} />
            </div>
            <h3 className="text-md font-medium">{item?.name}</h3>
          </Link>
        ))}
      </div>
      <hr className="h-[0.5px] border-black/25" />
    </header>
  );
}
