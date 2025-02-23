/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function AsideDownloadButton({
  program,
  locale,
}: {
  program: any;
  locale: string;
}) {
  const roter = useRouter();
  const handleDewnload = (url: string) => {
    sessionStorage.setItem("downloadUrl", url);
    roter.push(
      `/${locale}/${program?.category?.name}/${program.slug}/file-download`,
    );
  };
  return (
    <div className="w-full space-y-2 px-4 lg:px-10">
      {program?.versions?.[0]?.links.map((link: string, index: number) => (
        <button
          onClick={() => handleDewnload(link)}
          key={index}
          className="block w-full rounded-md bg-zinc-800 py-3 text-sm font-semibold text-white"
        >
          Direct Download
        </button>
      ))}
      {program?.versions?.[0]?.torrents.map((link: string, index: number) => (
        <button
          onClick={() => handleDewnload(link)}
          key={index}
          className="block w-full rounded-md bg-[#74b23e] py-3 text-sm font-semibold text-white"
        >
          Torrent Download
        </button>
      ))}
    </div>
  );
}
