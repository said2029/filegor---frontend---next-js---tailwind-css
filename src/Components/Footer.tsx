import { get_Categories } from "@/utils/actions";
import { config } from "@/utils/contents";
import Link from "next/link";
import React from "react";

export default async function Footer({ locale = "en" }: { locale: string }) {
  const topCategorys = await get_Categories();
  const date= new Date();
  return (
    <footer className="mt-60 w-screen overflow-hidden bg-black pt-10 text-white hover:[&_a]:text-white">
      <div className="container px-4">
        <div className="flex flex-wrap justify-between px-6">
          <ul>
            <li>Download Software</li>
            <div className="mt-3 space-y-1 text-white/65">
              {topCategorys.slice(0, 3).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${locale}/category/${cat.name}`}>{cat.name}</Link>
                </li>
              ))}
            </div>
          </ul>
          <ul>
            <li>Download Systems</li>
            <div className="mt-3 space-y-1 text-white/65">
              <li>
                <Link href={`/${locale}/category/windows/windows-11`}>Windows 11</Link>
              </li>
              <li>
                <Link href={`/${locale}/category/windows/windows-10`}>Windows 10</Link>
              </li>
              <li>
                <Link href={`/${locale}/category/windows/windows-8`}>Windows 8</Link>
              </li>
              <li>
                <Link href={`/${locale}/category/windows/windows-7`}>Windows 7</Link>
              </li>
            </div>
          </ul>
          <ul>
            <li>Common Issues</li>
            <div className="mt-3 space-y-1 text-white/65">
              {/* <li>
                <Link href={""}>Ad Blocker</Link>
              </li> */}
              <li>
                <Link href={`/${locale}/how-to-download`}>How to Download</Link>
              </li>
              <li>
                <Link href={`/${locale}/zip-password`}>Zip Password</Link>
              </li>
            </div>
          </ul>
          <ul>
            <li>Company Info</li>
            <div className="mt-3 space-y-1 text-white/65">
              <li>
                <Link href={`/${locale}/about`}>About</Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div className="mt-10 bg-zinc-950/50 py-3">
        <div className="container flex flex-wrap items-center justify-center gap-3 md:justify-between">
          <p className="text-sm">
            ©{config.name} -{" "}
            <span className="opacity-75">All Rights Reserved {date.getFullYear()}</span>
          </p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Link href={`/${locale}/terms`}>Terms</Link>
            {/* <Link href={"/"}>Cookies Policy</Link> */}
            <Link href={`/${locale}/privacy`}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
