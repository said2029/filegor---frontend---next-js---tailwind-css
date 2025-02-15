import { get_application, get_by_slug } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiClock2 } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import { SiUtorrent } from "react-icons/si";

export default async function page({
  params: { slug, category, locale },
}: {
  params: { slug: string; category: string; locale: string };
}) {
  const program = await get_by_slug(slug);
  const related = await get_application({
    topDownloads: true,
    category: category,
  });
  console.log(program);
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 py-8">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl text-white">{program.title}</h1>
          <div>
            <ul className="flex space-x-2 text-white">
              <li>
                <Link href={"/"}>Home</Link>{" "}
              </li>
              <li>{">"}</li>
              <li>
                <Link href={"/"}>{program.category.name}</Link>
              </li>
              <li>{">"}</li>
              <li>
                <Link href={"/"}>{program.subCategory[0].name}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="container mt-10 flex gap-10">
        <main className="space-y-3">
          <div className="w-full rounded-lg border border-black/10 bg-white px-4 py-5">
            <h1 className="text-3xl">{program?.title}</h1>
            <p className="mt-3 opacity-65">{program?.subtitle}</p>
            <div
              style={{
                backgroundImage: `url(${program?.images?.[1]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="my-4 aspect-[2/1] w-full bg-gray-100"
            ></div>
            <div
              dangerouslySetInnerHTML={{ __html: program.description }}
            ></div>
          </div>

          <div className="w-full rounded-lg border border-black/10 bg-white px-4 py-5">
            <h2 className="text-xl">Previous version</h2>
            <hr className="mt-2 w-full" />
            <table className="mt-4 w-full space-y-5">
              <thead className="bg-gray-100 py-3 block">
                <tr className="flex items-center justify-between font-normal">
                  <th className="w-28">Date</th>
                  <th>Additional info</th>
                  <th>downloads</th>
                </tr>
              </thead>
              <tbody className="space-y-4 mt-7 block">
                {program.versions.map((ver: { id: string; createAt: string; fullName: string; versionName: string; links: string[]; torrents: string[] }) => (
                  <tr key={ver.id} className="flex justify-between">
                    <td className="text-sm opacity-80 w-28">{ver.createAt}</td>
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
                          href={"/"}
                        >
                          <FaDownload />
                        </Link>
                      ))}
                      {ver.torrents.map((link: string, index: number) => (
                        <Link
                          key={link + index}
                          className="grid size-9 place-content-center rounded-lg bg-teal-600 text-white"
                          href={"/"}
                        >
                          <SiUtorrent />
                        </Link>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <aside className="w-[430px] space-y-6">
          <div className="w-full rounded-lg border border-black/10 bg-white px-3 py-5 text-center">
            <h1 className="text-6xl font-medium text-black">
              {program.size} <span className="text-xl">{program.sizeType}</span>
            </h1>
            <hr className="my-5" />

            <div className="w-full space-y-2 px-10">
              {program?.versions?.[0]?.links.map((link: string,index:number) => (
                <Link
                  key={index}
                  className="block w-full rounded-md bg-zinc-800 py-3 text-sm font-semibold text-white"
                  href={"/"}
                >
                  Direct Download
                </Link>
              ))}
              {program?.versions?.[0]?.torrents.map((link: string,index:number) => (
                <Link
                  key={index}
                  className="block w-full rounded-md bg-[#74b23e] py-3 text-sm font-semibold text-white"
                  href={"/"}
                >
                  Torrent Download
                </Link>
              ))}
            </div>

            <div className="mt-7 grid place-content-center text-teal-600">
              <a
                href={"/"}
                className="flex items-center gap-1 text-sm font-medium"
              >
                <CiClock2 size={20} />
                <p>Version history</p>
              </a>
            </div>
          </div>

          <div className="w-full rounded-lg border border-black/10 bg-white px-3 py-5">
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
                    {program?.versions?.[0].versionName}
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

          <div className="sticky top-10 mt-10 h-fit bg-white p-5 lg:w-[470px]">
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
