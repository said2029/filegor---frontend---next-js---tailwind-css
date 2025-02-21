/* eslint-disable @typescript-eslint/no-explicit-any */
import Main_Card from "@/Components/Cards/Main_Card";
import { get_application, get_Categories } from "@/utils/actions";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
}: {
  params: any;
  searchParams: any;
}) {
  const { category, locale } = await params;
  const applications = await get_application({
    category: category[0],
    topDownloads: false,
    ...(category[1] != "undefined" && { subCategory: category[1] }),
    page: category[2] ?? 1,
  });

  const categoris = await get_Categories();

  return (
    <main>
      <div className="w-screen bg-gradient-to-r from-blue-500 to-teal-500 py-5">
        <div className="container flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-start">
          <h1 className="text-2xl text-white">{decodeURI(category[0])}</h1>
          <div>
            <ul className="flex space-x-2 text-white">
              <li>
                <Link href={"/"}>Home</Link>{" "}
              </li>
              <li>{">"}</li>
              <li>
                <Link
                  className="first-letter:uppercase"
                  href={`/${locale}/category/${decodeURI(category[0])}`}
                >
                  {decodeURI(category[0])}
                </Link>
              </li>
              {category[1] && (
                <>
                  <li>{">"}</li>
                  <Link
                    className="first-letter:uppercase"
                    href={`/${locale}/category/${category[0]}/${decodeURI(category[1])}`}
                  >
                    {decodeURI(category[1])}
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <section className="container mt-10 grid w-screen lg:grid-cols-3 lg:gap-10">
        <aside className="space-y-6 px-4 md:px-0">
          <div className="max-h-[500px] w-full overflow-y-auto rounded-lg border border-black/10 bg-white px-5 py-5">
            <h1 className="text-xl font-medium text-black opacity-80">
              Primary Category
            </h1>
            <hr className="my-5" />
            <div className="space-y-7">
              {categoris?.map((cat: any) => (
                <Link
                  href={`/${locale}/category/${cat.slug}`}
                  key={cat.id}
                  className="flex cursor-pointer items-center gap-4"
                >
                  <input
                    defaultChecked={cat.slug == category[0]}
                    className="size-5 appearance-none rounded-md bg-gray-300/75 checked:bg-teal-400"
                    type="checkbox"
                  />
                  <p className="text-sm">{cat.name}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="max-h-[500px] w-full overflow-y-auto rounded-lg border border-black/10 bg-white px-5 py-5">
            <h1 className="text-xl font-medium text-black opacity-80">
              Sub Category
            </h1>
            <hr className="my-5" />
            <div className="space-y-7">
              {categoris
                ?.find((item: any) => item.slug == category[0])
                ?.subCategory?.map((subCat: any) => (
                  <Link
                    href={`/${locale}/category/${category[0]}/${subCat.slug}`}
                    key={subCat.id}
                    className="flex cursor-pointer items-center gap-4"
                  >
                    <input
                      defaultChecked={subCat.slug == category[1]}
                      className="size-5 appearance-none rounded-md bg-gray-300/75 checked:bg-teal-400"
                      type="checkbox"
                    />
                    <p className="text-sm">{subCat.name}</p>
                  </Link>
                ))}
            </div>
          </div>
        </aside>
        <main className="w-screen px-4 md:px-0 lg:col-span-2 lg:w-full">
          <div className="flex w-full items-center justify-between border-s-[6px] border-primary bg-white px-5 py-4">
            <h3 className="text-xl font-medium">{decodeURI(category[0])}</h3>
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
              href={`/${locale}/category/${category[0]}/${category[1]}/${+category[2] > 1 ? +category[2] - 1 : 1}`}
              className={clsx("bg-black px-5 py-2 text-white", {
                "pointer-events-none bg-black/50 opacity-50": category[2] <= 1,
              })}
            >
              Previews
            </Link>
            <Link
              href={`/${locale}/category/${category[0]}/${category[1]}/${+(category[2] || 1) + 1}`}
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
