import Link from "next/link";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

export default async function Home() {
  return (
    <main className="px-4 md:px-0">
      <section className="container flex flex-col lg:flex-row gap-7">
        <div className="mt-10 w-full">
          <div className="flex w-full items-center justify-between border-s-[10px] border-primary bg-white px-5 py-5">
            <h3 className="text-xl font-medium">Windows</h3>
            <Link href={"/"} className="rounded-sm border px-2 py-1 opacity-80">
              View All
            </Link>
          </div>

          <div className="mt-10 space-y-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-3 justify-between border border-black/10 bg-white p-3"
              >
                <div className="flex gap-2 w-full">
                  <div className="size-16 bg-red-400">sdf</div>
                  <div>
                    <h3 className="text-lg font-bold text-black">
                      Altium Designer 25.3.2.17
                    </h3>
                    <p className="text-sm opacity-50">
                      Best PCB Design Software for Engineers
                    </p>
                    <p className="text-sm text-primary">
                      Engineering & Simulation
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-5 w-full">
                  <div className="flex flex-col items-center gap-2 ">
                    <div className="flex items-center gap-2">
                      <span className="block size-10 bg-red-500"></span>
                      <h3>Windows</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="block size-4">
                        <AiOutlineCloudDownload />
                      </span>
                      <p className="text-xs">23534</p>
                    </div>
                  </div>
                  <hr className="h-full border-2 border-black" />
                  <div className="space-y-2 text-center">
                    <h3>Reputation</h3>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                    </div>
                  </div>
                  <hr className="h-full border-2 border-black" />
                  <div className="flex gap-1 text-black">
                    <h3 className="text-xl font-bold text-nowrap">12.4</h3>
                    <span className="text-xs opacity-85">gb</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky top-10 mt-10 h-fit lg:w-[470px] bg-white p-5">
          <h2 className="text-2xl">Pc Games</h2>
          <hr />
          <div>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="mt-7 flex gap-2">
                <div className="size-16 bg-red-600">ddf</div>
                <div>
                  <h3 className="text-base">Grand Theft Auto GTA 5</h3>
                  <p className="text-xs font-semibold text-primary">PC Games</p>
                  <div className="flex gap-1 text-black">
                    <p className="text-lg font-bold">12.4</p>
                    <span className="text-xs opacity-85">gb</span>
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
