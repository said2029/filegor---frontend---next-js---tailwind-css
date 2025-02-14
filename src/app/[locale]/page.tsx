import { get_application } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

export default async function Home() {
  const windows = await get_application({
    perPage: 10,
    category: "Windows",
    topDownloads: true,
  });
  const pc_games = await get_application({
    perPage: 10,
    category: "PC Games",
    topDownloads: true,
  });
  console.log(windows);

  return (
    <main className="px-4 md:px-0">
      <section className="container flex flex-col gap-7 lg:flex-row">
        <div className="mt-10 w-full">
          <div className="flex w-full items-center justify-between border-s-[10px] border-primary bg-white px-5 py-5">
            <h3 className="text-xl font-medium">Windows</h3>
            <Link href={"/"} className="rounded-sm border px-2 py-1 opacity-80">
              View All
            </Link>
          </div>

          <div className="mt-10 space-y-4">
            {windows &&
              windows?.map((item, index) => (
                <Link
                  href={`/${item.category.name}/${item.slug}`}
                  key={index}
                  className="flex flex-col items-center justify-between gap-3 border border-black/10 bg-white p-3 md:flex-row"
                >
                  <div className="flex w-full max-w-[500px] gap-2">
                    <div className="aspect-square min-w-[74px] overflow-hidden rounded-md bg-gray-200">
                      <Image
                        className="size-full object-cover"
                        width={74}
                        height={74}
                        alt={item?.title}
                        src={item?.images[0]}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-md line-clamp-2 font-medium text-black">
                        {item?.title}
                      </h3>
                      <p className="line-clamp-1 text-xs opacity-75">
                        {item?.subtitle}
                      </p>
                      <p className="text-sm text-primary">
                        {item?.subCategory?.[0]?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-5 lg:flex-nowrap">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="block size-9">
                          <Image
                            width={30}
                            height={30}
                            alt={item?.category?.name}
                            src={item?.category?.image}
                          />
                        </span>
                        <h3>{item?.category?.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="block size-4">
                          <AiOutlineCloudDownload />
                        </span>
                        <p className="text-xs">{item?.downloads}</p>
                      </div>
                    </div>
                    <hr className="h-full border-2 border-black" />
                    {item?.rate != 0 && (
                      <>
                        <div className="space-y-2 text-center">
                          <h3>Reputation</h3>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: item.rate }).map(
                              (item, index) => (
                                <FaStar
                                  className="text-yellow-500"
                                  key={index}
                                />
                              ),
                            )}
                          </div>
                        </div>
                        <hr className="h-full border-2 border-black" />
                      </>
                    )}
                    <div className="flex gap-1 text-black">
                      <h3 className="text-nowrap text-2xl">
                        {item.size.split(" ")[0]}
                      </h3>
                      <span className="text-xs opacity-85">
                        {item.size.split(" ")[1]}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="sticky top-10 mt-10 h-fit bg-white p-5 lg:w-[470px]">
          <h2 className="text-2xl">Pc Games</h2>
          <hr />
          <div>
            {pc_games?.map((item, index) => (
              <div key={index} className="mt-7 flex gap-2">
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
