import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-60 w-screen bg-black pt-10 text-white hover:[&_a]:text-white overflow-hidden">
      <div className="container px-4">
        <div className="flex flex-wrap justify-between px-6">
          <ul>
            <li>Download Software</li>
            <div className="mt-3 space-y-1 text-white/65">
              <li>
                <Link href={""}>Windows</Link>
              </li>
              <li>
                <Link href={""}>Mac</Link>
              </li>
              <li>
                <Link href={""}>Android APK</Link>
              </li>
            </div>
          </ul>
          <ul>
            <li>Download Systems</li>
            <div className="mt-3 space-y-1 text-white/65">
              <li>
                <Link href={""}>Windows 11</Link>
              </li>
              <li>
                <Link href={""}>Windows 10</Link>
              </li>
              <li>
                <Link href={""}>Windows 8</Link>
              </li>
              <li>
                <Link href={""}>Windows 7</Link>
              </li>
            </div>
          </ul>
          <ul>
            <li>Common Issues</li>
            <div className="mt-3 space-y-1 text-white/65">
              <li>
                <Link href={""}>Ad Blocker</Link>
              </li>
              <li>
                <Link href={""}>How to Download</Link>
              </li>
              <li>
                <Link href={""}>Zip Password</Link>
              </li>
              <li>
                <Link href={""}>Windows 7</Link>
              </li>
            </div>
          </ul>
          <ul>
            <li>Company Info</li>
            <div className="mt-3 space-y-1 text-white/65">
              <li>
                <Link href={""}>About</Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div className="mt-10 bg-zinc-950/50 py-3">
        <div className="container flex items-center justify-center md:justify-between gap-3 flex-wrap ">
          <p className="text-sm">
            ©Fliegor -{" "}
            <span className="opacity-75">All Rights Reserved 2025</span>
          </p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Link href={"/"}>Terms</Link>
            <Link href={"/"}>Cookies Policy</Link>
            <Link href={"/"}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
