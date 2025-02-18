import React from "react";
import { FiDownloadCloud } from "react-icons/fi";
import ButtonDownload from "./_components/ButtonDownload";
import { get_application, get_by_slug } from "@/utils/actions";
import { Link } from "lucide-react";
import Main_Card from "@/Components/Cards/Main_Card";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string; locale: string; category: string };
  searchParams: { u: string };
}) {
  const { slug, locale,category } = await params;
  const { u } = searchParams;
  if (!u) return redirect(`/${locale}/${category}/${slug}`);
  const program = await get_by_slug(slug);
  const related = await get_application({
    topDownloads: true,
    category: program.category.name,
  });

  return (
    <main className="container">
      <div className="mt-10 flex w-full flex-col items-center justify-center rounded-lg border border-black/15 bg-white p-5">
        <div className="flex items-center gap-4">
          <div>
            <FiDownloadCloud strokeWidth={1} size={100} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Thanks for Downloading</h2>
            <p className="text-teal-600">{program?.title}</p>
          </div>
        </div>

        <div className="mt-10 w-fit">
          <ButtonDownload link={u} />
        </div>

        <div>
          <p className="mt-6 font-semibold text-red-500">
            The password for Zip file is: 123
          </p>
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
            related?.map((item) => (
              <Main_Card key={item.id} item={item} locale={locale} />
            ))}
        </div>
      </div>
    </main>
  );
}
