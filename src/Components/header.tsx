/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useCategory from "@/hooks/useCategory";
import { Loader, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { HiMenuAlt3, HiOutlineViewGridAdd } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { SiOpensearch } from "react-icons/si";
import { AnimatePresence, motion } from "motion/react";

export default function Header() {
  const t = useTranslations("header");
  const { category } = useCategory(7);
  const locale = useLocale();
  const router = useRouter();
  const [isSearchPinding, StartSearchPinding] = useTransition();
  const [ShowNavMobile, setShowNavMobile] = useState(false);
  return (
    <header className="w-screen overflow-hidden bg-white md:px-0">
      {/* top */}
      <div className="container z-[70] flex items-center justify-between bg-white px-4 py-4">
        <div className="flex w-[100px] items-center gap-3 overflow-hidden">
          <Link
            href={"/"}
            className="grid aspect-square size-11 place-content-center rounded-md bg-primary text-white"
          >
            <SiOpensearch size={30} />
          </Link>
          {/* search */}
          <div className="flex items-center">
            <div className="grid size-11 place-content-center rounded-s-md bg-primary text-white">
              {!isSearchPinding ? (
                <IoIosSearch size={30} />
              ) : (
                <div>
                  <Loader className="animate-spin" />
                </div>
              )}
            </div>
            <input
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  console.log(event);
                  const q = event.currentTarget.value;
                  StartSearchPinding(() => {
                    router.push(`/${locale}/search?q=${q}`);
                  });
                }
              }}
              className="h-11 rounded-e-md border border-black/5 bg-gray-400/15 ps-3 focus:outline-none md:w-96"
              placeholder={t("inputSearch")}
              type="search"
            />
          </div>
        </div>

        {/* mobile Button */}
        <button
          onClick={() => {
            setShowNavMobile((pre) => !pre);
          }}
          className="grid aspect-square size-11 place-content-center rounded-md bg-primary text-white md:hidden"
        >
          {ShowNavMobile ? <X size={20} /> : <HiMenuAlt3 />}
        </button>
      </div>
      <hr className="h-[0.5px] border-black/25" />

      <div className="container hidden h-20 items-center justify-between md:flex">
        {category.map((item: any) => (
          <Link
            key={item?.id}
            className="flex h-full flex-grow items-center justify-center gap-2 border-e-[0.5px] border-s-[0.5px] border-black/10 opacity-85 transition-all hover:bg-primary hover:text-white"
            href={`/${locale}/category/${item.slug}`}
          >
            <div className="size-8">
              <Image
                width={32}
                height={32}
                alt={item?.name}
                src={item?.image}
              />
            </div>
            <h3 className="text-md font-medium">{item?.name}</h3>
          </Link>
        ))}
      </div>
      <hr className="h-[0.5px] border-black/25" />

      <AnimatePresence>
        {ShowNavMobile && (
          <motion.div
            variants={{
              init: { y: "-140%" },
              show: { y: "0dvh" },
            }}
            initial="init"
            animate="show"
            exit={"init"}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 left-0 top-14 z-[60] min-h-[100vh] w-full bg-white py-11"
          >
            {category.map((cat: any) => (
              <Link
                onClick={() => {
                  setShowNavMobile(false);
                }}
                className="flex items-center gap-5 px-3 py-3 transition-all hover:bg-primary hover:text-white"
                key={cat.id}
                href={`/${locale}/category/${cat.slug}`}
              >
                <div className="size-8">
                  <Image
                    width={32}
                    height={32}
                    alt={cat?.name}
                    src={cat?.image}
                  />
                </div>
                <h3 className="text-md font-medium">{cat?.name}</h3>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
