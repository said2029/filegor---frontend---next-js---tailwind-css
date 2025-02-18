/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider_Images from "@/Components/slider_Images";
import { get_application, get_by_slug } from "@/utils/actions";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { cache } from "react";
import { CiClock2 } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import { SiUtorrent } from "react-icons/si";

const Application = cache(async (slug: string) => {
  return await get_by_slug(slug);
});

export async function generateStaticParams() {
  const applications = await get_application({
    topDownloads: false,
    perPage: 100,
  });
  return (
    applications?.map((app: any) => ({
      slug: app.slug,
      category: app.category.slug,
      locale: "en",
    })) ?? []
  );
}

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { slug, category } = await params;
  const program = await Application(slug);

  return {
    title: program?.title,
    description: program?.subtitle + " " + program?.title,
    // keywords: data?.tags,
    openGraph: {
      title: program?.title,
      description: program?.subtitle + " " + program?.title,
      url: process.env.NEXT_PUBLIC_BASE_URL + `/en/${category}/${slug}`,
      images: [
        {
          url: program?.images?.[1],
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: program?.title,
      images: [
        {
          url: program?.images?.[1],
          width: 500,
          height: 500,
        },
      ],
    },
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  };
}

export default async function page({ params }: { params: any }) {
  const { slug, category, locale } = params;
  const program = await Application(slug);
  const related = await get_application({
    topDownloads: true,
    category: category,
  });
  return (
    <div>
      <div className="w-screen bg-gradient-to-r from-blue-500 to-teal-500 py-5">
        <div className="container flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-start">
          <h1 className="text-2xl text-white">{program.title}</h1>
          <div>
            <ul className="flex space-x-2 text-white">
              <li>
                <Link href={"/"}>Home</Link>{" "}
              </li>
              <li>{">"}</li>
              <li>
                <Link href={"/"}>{program?.category?.name}</Link>
              </li>
              <li>{">"}</li>
              <li>
                <Link href={"/"}>{program.subCategory?.[0]?.name}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="container mt-10 grid w-screen lg:grid-cols-3 lg:gap-10">
        <main className="w-screen space-y-3 px-4 md:px-0 lg:col-span-2 lg:w-full">
          <div className="rounded-lg border border-black/10 bg-white px-4 py-5">
            <h1 className="text-3xl">{program?.title}</h1>
            <p className="mt-3 opacity-65">{program?.subtitle}</p>
            <Slider_Images images={program?.images} />

            <div
              dangerouslySetInnerHTML={{ __html: program.description }}
            ></div>
          </div>

          <div className="w-full rounded-lg border border-black/10 bg-white px-4 py-5">
            <h2 className="text-xl">Previous version</h2>
            <hr className="mt-2 w-full" />
            <div className="max-w-[100dvw] overflow-x-auto">
              <table
                id="versions"
                className="mt-4 w-full min-w-[700px] space-y-5"
              >
                <thead className="block bg-gray-100 py-3">
                  <tr className="flex items-center justify-between font-normal">
                    <th className="w-28">Date</th>
                    <th>Additional info</th>
                    <th>Downloads</th>
                  </tr>
                </thead>
                <tbody className="mt-7 block space-y-4">
                  {program.versions.map(
                    (ver: {
                      id: string;
                      createAt: string;
                      fullName: string;
                      versionName: string;
                      links: string[];
                      torrents: string[];
                    }) => (
                      <tr key={ver.id} className="flex justify-between">
                        <td className="w-28 text-sm opacity-80">
                          {ver.createAt}
                        </td>
                        <td>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <h6 className="text-sm font-medium opacity-85">
                                File Name:{" "}
                              </h6>
                              <p className="text-xs font-semibold opacity-60">
                                {ver.fullName}
                              </p>
                            </li>
                            <li className="flex items-center gap-2">
                              <h6 className="text-sm font-medium opacity-85">
                                Version:
                              </h6>
                              <p className="text-xs font-semibold opacity-60">
                                {ver.versionName}
                              </p>
                            </li>
                          </ul>
                        </td>
                        <td className="flex items-center gap-1">
                          {ver.links.map((link: string, index: number) => (
                            <Link
                              key={link + index}
                              className="grid size-9 place-content-center rounded-lg bg-teal-600 text-white"
                              href={`/${locale}/${program?.category?.name}/${slug}/file-download/?u=${link}`}
                            >
                              <FaDownload />
                            </Link>
                          ))}
                          {ver.torrents.map((link: string, index: number) => (
                            <Link
                              key={link + index}
                              className="grid size-9 place-content-center rounded-lg bg-teal-600 text-white"
                              href={`/${locale}/${program?.category?.name}/${slug}/file-download/?u=${link}`}
                            >
                              <SiUtorrent />
                            </Link>
                          ))}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <aside className="space-y-6 px-4 md:px-0">
          <div className="w-full rounded-lg border border-black/10 bg-white px-3 py-5 text-center">
            <h1 className="text-6xl font-medium text-black">
              {program.size} <span className="text-xl">{program.sizeType}</span>
            </h1>
            <hr className="my-5" />

            <div className="w-full space-y-2 px-4 lg:px-10">
              {program?.versions?.[0]?.links.map(
                (link: string, index: number) => (
                  <Link
                    key={index}
                    className="block w-full rounded-md bg-zinc-800 py-3 text-sm font-semibold text-white"
                    href={`/${locale}/${program?.category?.name}/${slug}/file-download/?u=${link}`}
                  >
                    Direct Download
                  </Link>
                ),
              )}
              {program?.versions?.[0]?.torrents.map(
                (link: string, index: number) => (
                  <Link
                    key={index}
                    className="block w-full rounded-md bg-[#74b23e] py-3 text-sm font-semibold text-white"
                    href={`/${locale}/${program?.category?.name}/${slug}/file-download/?u=${link}`}
                  >
                    Torrent Download
                  </Link>
                ),
              )}
            </div>

            <div className="mt-7 grid place-content-center text-teal-600">
              <a
                href={"#versions"}
                className="flex items-center gap-1 text-sm font-medium"
              >
                <CiClock2 size={20} />
                <p>Version history</p>
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 bg-white px-3 py-5">
            <h1 className="text-xl font-medium">Product Information</h1>
            <hr className="mt-3" />

            <div className="mt-5">
              <ul className="space-y-4">
                <li className="flex items-center justify-between gap-5">
                  <h5 className="text-sm font-medium opacity-75">File name</h5>
                  <p className="text-xs font-semibold opacity-70">
                    {program.title}
                  </p>
                </li>
                <hr className="mt-3" />
                <li className="flex items-center justify-between gap-5">
                  <h5 className="text-sm font-medium opacity-75">Created by</h5>
                  <p className="text-xs font-semibold opacity-70">
                    {program.createdBy}
                  </p>
                </li>
                <hr className="mt-3" />
                <li className="flex items-center justify-between gap-5">
                  <h5 className="text-sm font-medium opacity-75">Version</h5>
                  <p className="text-xs font-semibold opacity-70">
                    {program?.versions?.[0]?.versionName}
                  </p>
                </li>
                <hr className="mt-3" />
                <li className="flex items-center justify-between gap-5">
                  <h5 className="text-sm font-medium opacity-75">
                    License type
                  </h5>
                  <p className="text-xs font-semibold opacity-70">
                    {program?.licenseType}
                  </p>
                </li>
                <hr className="mt-3" />
                <li className="flex items-center justify-between gap-5">
                  <h5 className="text-sm font-medium opacity-75">
                    Release Date
                  </h5>
                  <p className="text-xs font-semibold opacity-70">
                    {program?.createAt}
                  </p>
                </li>
                <hr className="mt-3" />
                <li className="flex items-center justify-between gap-5">
                  <h5 className="text-sm font-medium opacity-75">Languages</h5>
                  <p className="text-xs font-semibold opacity-70">
                    {program?.languages?.toString()}
                  </p>
                </li>
                <hr className="mt-3" />
                <li className="flex items-center justify-between gap-5">
                  <h5 className="text-sm font-medium opacity-75">
                    Total Downloads
                  </h5>
                  <p className="text-xs font-semibold opacity-70">
                    {program?.downloads}
                  </p>
                </li>
                <hr className="mt-3" />
                <li className="flex items-center justify-between gap-5">
                  <h5 className="text-sm font-medium opacity-75">
                    Uploaded By
                  </h5>
                  <p className="text-xs font-semibold opacity-70">
                    {program?.uploadedBy}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 bg-white p-3">
            <h2 className="text-2xl">Pc Games</h2>
            <hr />
            <div>
              {related?.map((item, index) => (
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
                      <p className="text-lg font-bold"> {item.size}</p>
                      <span className="text-xs opacity-85">
                        {" "}
                        {item.sizeType}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
