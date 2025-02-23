/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FiDownloadCloud } from "react-icons/fi";
import ButtonDownload from "./_components/ButtonDownload";
import { Link } from "lucide-react";
import { get_application, get_by_slug } from "@/utils/actions";
import { getTranslations } from "next-intl/server";
import Main_Card from "@/Components/Cards/Main_Card";


export default async function Page({
  params,
  locale,
}: {
  params: any;
  locale: string;
}) {
  const t = await getTranslations("download-page");

  const { slug }: { slug: string } = await params;
  // const { slug, locale, category } = await params;

  const program: any = await get_by_slug(slug);
  const related: any = await get_application({
    topDownloads: true,
    category: program.category.slug,
  });

  return (
    <main className="container">
      <div className="mt-10 flex w-full flex-col items-center justify-center rounded-lg border border-black/15 bg-white p-5">
        <div className="flex items-center gap-4">
          <div>
            <FiDownloadCloud strokeWidth={1} size={100} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{t("thanks")}</h2>
            <p className="text-teal-600">{program?.title}</p>
          </div>
        </div>

        <div className="mt-10 w-fit">
          <ButtonDownload />
        </div>

        <div>
          <p className="mt-6 font-semibold text-red-500">{t("password")}</p>
        </div>
      </div>
      <hr className="my-16" />

      <div>
        <div className="flex w-full items-center justify-between border-s-[10px] border-primary bg-white px-5 py-5">
          <h3 className="text-xl font-medium">Windows</h3>
          <Link href={"/"} className="rounded-sm border px-2 py-1 opacity-80">
            View All
          </Link>
        </div>

        <div className="mt-5 space-y-4">
          {related &&
            related?.map((item: any) => (
              <Main_Card key={item.id} item={item} locale={locale} />
            ))}
        </div>
      </div>
    </main>
  );
}
