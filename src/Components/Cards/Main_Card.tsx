/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

export default function Main_Card({
  item,
  locale,
}: {
  item: any;
  locale: string;
}) {
  return (
    <Link
      href={`/${locale}/${item.category.slug}/${item.slug}`}
      className="flex flex-col items-center justify-between gap-3 border border-black/10 bg-white p-3 md:flex-row"
    >
      <div className="flex w-full gap-2">
        <div className="aspect-square min-w-[74px] overflow-hidden rounded-md bg-gray-200">
          <Image
            className="size-full object-cover"
            width={74}
            height={74}
            alt={item?.title}
            src={item?.icon}
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-md line-clamp-2 font-medium text-black">
            {item?.title}
          </h3>
          <p className="line-clamp-1 text-xs opacity-75">{item?.subtitle}</p>
          <p className="text-sm text-primary">{item?.category.name}</p>
        </div>
      </div>

      <div className="flex h-full flex-wrap items-center justify-between gap-5 lg:flex-nowrap">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="block size-4">
              <Image
                width={20}
                height={20}
                alt={item?.category?.name}
                src={item?.category?.image}
              />
            </span>
            <h3 className="text-xs text-teal-800">{item?.category?.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="block size-4">
              <AiOutlineCloudDownload />
            </span>
            <p className="text-xs">{item?.downloads}</p>
          </div>
        </div>

        <hr className="h-full border border-black" />
        {item?.rate && (item?.rate?.average || 0) != 0 && (
          <>
            <div className="space-y-2 text-center">
              <h3>Reputation</h3>
              <div className="flex items-center gap-1">
                {Array.from({ length: item.rate.average }).map(
                  (item, index) => (
                    <FaStar size={13} className="text-yellow-500" key={index} />
                  ),
                )}
                {Array.from({ length: 5 - Math.floor(item.rate.average) }).map(
                  (item, index) => (
                    <FaStar size={13} className="text-gray-500" key={index} />
                  ),
                )}
              </div>
            </div>
            <hr className="h-full border-2 border-black" />
          </>
        )}
        <div className="flex gap-1 text-black">
          <h3 className="text-4xl opacity-80">{item.size}</h3>
          <span className="text-xs opacity-85">{item.sizeType}</span>
        </div>
      </div>
    </Link>
  );
}
