/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaDownload } from "react-icons/fa";
import { SiUtorrent } from "react-icons/si";

export default function VersionList({
  program,
  locale,
  category,
}: {
  program: any;
  locale: string;
  category: string;
}) {
  const { slug } = useParams();
  const roter = useRouter();
  const handleDewnload = (url: string) => {
    sessionStorage.setItem("downloadUrl", url);
    roter.push(
      `/${locale}/${program?.category?.name}/${program.slug}/file-download`,
    );
  };
  return (
    <>
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
            <td className="w-28 text-sm opacity-80">{ver.createAt}</td>
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
                  <h6 className="text-sm font-medium opacity-85">Version:</h6>
                  <p className="text-xs font-semibold opacity-60">
                    {ver.versionName}
                  </p>
                </li>
              </ul>
            </td>
            <td className="flex items-center gap-1">
              {ver.links.map((link: string, index: number) => (
                <button
                  key={link + index}
                  className="grid size-9 place-content-center rounded-lg bg-teal-600 text-white"
                  onClick={() => handleDewnload(link)}
                >
                  <FaDownload />
                </button>
              ))}
              {ver.torrents.map((link: string, index: number) => (
                <button
                  key={link + index}
                  className="grid size-9 place-content-center rounded-lg bg-teal-600 text-white"
                  onClick={() => handleDewnload(link)}
                >
                  <SiUtorrent />
                </button>
              ))}
            </td>
          </tr>
        ),
      )}
      <tr className="flex justify-between">
        <td className="w-28 text-sm opacity-80">{}</td>
        <td colSpan={2}>
          <h6 className="text-sm font-medium opacity-85">File Name: </h6>
          <p className="text-xs font-semibold opacity-60">
            if other linke not working you can try this
          </p>
        </td>
        <td className="flex items-center gap-1">
          <button
            className="grid size-9 place-content-center rounded-lg bg-teal-600 text-white"
            onClick={() =>
              handleDewnload(`https://filecr.com/${category}/${slug}`)
            }
          >
            <FaDownload />
          </button>
        </td>
      </tr>
    </>
  );
}
