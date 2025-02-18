/* eslint-disable @typescript-eslint/no-explicit-any */
import { get_Categories } from "@/utils/actions";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const applicatons: any = await get_Categories(50000);
  return applicatons?.map((item: any) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/category/${item?.slug}`,
    lastModified: applicatons?.updateAt,
    changeFrequency: "weekly",
    priority: 0.5,
  }));
}
