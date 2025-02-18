"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { GoDownload } from "react-icons/go";
import { useTranslations } from "next-intl";

export default function ButtonDownload({ link }: { link: string }) {
  const [CanDownload, setCanDownload] = useState(false);
  const t =useTranslations("download-page");
  return (
    <Link
      target="_blank"
      href={link}
      className={clsx(
        "flex h-[50px] w-fit justify-center overflow-hidden rounded-full bg-teal-600 px-3 py-3 text-white transition-all",
        {
          "pointer-events-none opacity-80": !CanDownload,
        },
      )}
    >
      <motion.ul
        variants={{
          init: { y: "0px" },
          step1: {
            y: "-37px",
            transition: { delay: 10 },
          },
        }}
        initial="init"
        animate="step1"
        onAnimationComplete={() => {
          setCanDownload(true);
        }}
        transition={{ duration: 1000, type: "tween" }}
        className="button-generate-url-ul block space-y-3"
      >
        <li className="flex items-center gap-3">
          <Loader2 className="animate-spin" />
          <p>{t("generate")}</p>
        </li>
        <li className="flex items-center gap-3">
          <GoDownload size={20} />
          <p>{t("download")}</p>{" "}
        </li>
      </motion.ul>
    </Link>
  );
}
