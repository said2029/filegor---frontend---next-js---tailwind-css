/* eslint-disable @typescript-eslint/no-explicit-any */
import Main_Card from "@/Components/Cards/Main_Card";
import { get_application } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

export default async function Home({ params }: { params: any }) {
  const { locale } = await params;
  const windows = await get_application({
    perPage: 10,
    category: "Windows",
    topDownloads: true,
  });
  const MacOs = await get_application({
    perPage: 10,
    category: "MacOs",
    topDownloads: true,
  });
  const Android = await get_application({
    perPage: 10,
    category: "Android",
    topDownloads: true,
  });
  const pc_games = await get_application({
    perPage: 10,
    category: "PC Games",
    topDownloads: true,
  });

  return (
    <main className="px-4 md:px-0">
      <section className="container flex flex-col gap-7 lg:flex-row">
        <div className="mt-10 w-full space-y-10">
          {/* Windows */}
          <div>
            <div className="flex w-full items-center justify-between border-s-[10px] border-primary bg-white px-5 py-5">
              <h3 className="text-xl font-medium">Windows</h3>
              <Link
                href={"/"}
                className="rounded-sm border px-2 py-1 opacity-80"
              >
                View All
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {windows &&
                windows?.map((item) => (
                  <Main_Card key={item.id} item={item} locale={locale} />
                ))}
            </div>
          </div>
          {/* MacOs */}
          <div>
            <div className="flex w-full items-center justify-between border-s-[10px] border-primary bg-white px-5 py-5">
              <h3 className="text-xl font-medium">MacOs</h3>
              <Link
                href={"/"}
                className="rounded-sm border px-2 py-1 opacity-80"
              >
                View All
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {MacOs?.map((item) => (
                <Main_Card key={item.id} item={item} locale={locale} />
              ))}
            </div>
          </div>
          {/* Android */}
          <div>
            <div className="flex w-full items-center justify-between border-s-[10px] border-primary bg-white px-5 py-5">
              <h3 className="text-xl font-medium">Android</h3>
              <Link
                href={"/"}
                className="rounded-sm border px-2 py-1 opacity-80"
              >
                View All
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {Android?.map((item) => (
                <Main_Card key={item.id} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </div>

        <div className="sticky top-10 mt-10 h-fit bg-white p-5 lg:w-[470px]">
          <h2 className="text-2xl">Pc Games</h2>
          <hr />
          <div>
            {pc_games?.map((item, index) => (
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
                    <p className="text-lg font-bold">
                      {" "}
                      {item.size.split(" ")[0]}
                    </p>
                    <span className="text-xs opacity-85">
                      {" "}
                      {item.size.split(" ")[1]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
