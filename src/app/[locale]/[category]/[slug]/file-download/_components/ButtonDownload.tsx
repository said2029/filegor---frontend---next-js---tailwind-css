"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { GoDownload } from "react-icons/go";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { incrementDownload } from "@/utils/actions";

export default function ButtonDownload() {
  const [CanDownload, setCanDownload] = useState(false);
  const t = useTranslations("download-page");
  const { slug }: { slug: string } = useParams();

  const handleDownload = async () => {
    const link = sessionStorage.getItem("downloadUrl");
    if (!link) return;
    if (slug) await incrementDownload(slug);
    const a = document.createElement("a");
    a.setAttribute("download", "file.zip");
    a.setAttribute("href", link);
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button
      onClick={handleDownload}
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
    </button>
  );
}
