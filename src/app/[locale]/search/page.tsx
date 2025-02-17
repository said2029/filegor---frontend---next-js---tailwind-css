/* eslint-disable @typescript-eslint/no-explicit-any */
import Main_Card from "@/Components/Cards/Main_Card";
import { get_application } from "@/utils/actions";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { page, q } = await searchParams;
  const { locale } = await params;
  const applications = await get_application({
    topDownloads: false,
    search: q,
    page: page ?? 1,
  });
  const pc_games = await get_application({
    topDownloads: true,
    category: "PC Game",
  });

  return (
    <main>
      <div className="w-screen bg-gradient-to-r from-blue-500 to-teal-500 py-5">
        <div className="container flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-start">
          <h1 className="text-2xl text-white">Search : {q}</h1>
        </div>
      </div>

      <section className="container mt-10 grid w-screen lg:grid-cols-3 lg:gap-10">
        <aside className="space-y-6 px-4 md:px-0">
          <aside className="sticky top-10 h-fit bg-white p-5">
            <h2 className="text-2xl">Pc Games</h2>
            <hr />
            <div>
              {pc_games?.map((item, index) => (
                <Link
                  href={`/${locale}/${item.category.name}/${item.slug}`}
                  key={index}
                  className="mt-7 flex gap-2"
                >
                  <div className="aspect-square min-w-[74px] overflow-hidden rounded-md bg-gray-200">
                    <Image
                      className="size-full object-cover"
                      width={74}
                      height={74}
                      alt={item?.title}
                      src={item?.images[0]}
                    />
                  </div>
                  <div>
                    <h3 className="line-clamp-1 text-base">{item.title}</h3>
                    <p className="text-xs font-semibold text-primary">
                      {item.category.name}
                    </p>
                    <div className="flex gap-1 text-black">
                      <p className="text-lg font-bold">
                        {" "}
                        {item.size.split(" ")[0]}
                      </p>
                      <span className="text-xs opacity-85">
                        {" "}
                        {item.size.split(" ")[1]}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </aside>
        <main className="w-screen px-4 md:px-0 lg:col-span-2 lg:w-full">
          <div className="flex w-full items-center justify-between border-s-[6px] border-primary bg-white px-5 py-4">
            <h3 className="text-xl font-medium">Search</h3>
            {/* <Link href={"/"} className="rounded-sm border px-2 py-1 opacity-80">
              View All
            </Link> */}
          </div>
          <div className="mt-5">
            {applications?.map((item) => (
              <Main_Card key={item.id} item={item} locale={locale} />
            ))}

            {applications?.length == 0 && (
              <div className="w-full text-center">No applications found</div>
            )}
          </div>

          <div className="mt-10 flex w-full items-center justify-between">
            <Link
              href={`/${locale}/search?q=${q}&page=${+page > 1 ? +page - 1 : 1}`}
              className={clsx("bg-black px-5 py-2 text-white", {
                "pointer-events-none bg-black/50 opacity-50": page <= 1,
              })}
            >
              Previews
            </Link>
            <Link
              href={`/${locale}/search?q=${q}&page=${+(page || 1) + 1}`}
              className={clsx("bg-black px-5 py-2 text-white", {
                "pointer-events-none bg-black/50 opacity-50":
                  applications?.length == 0,
              })}
            >
              Next
            </Link>
          </div>
        </main>
      </section>
    </main>
  );
}
