/* eslint-disable @typescript-eslint/no-explicit-any */
import { get_application } from "@/utils/actions";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const applicatons: any = await get_application({
    perPage: 50000,
    topDownloads: false,
  });
  return applicatons?.map((item:any) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/${item?.category?.slug}/${item?.slug}`,
    lastModified: applicatons?.updateAt,
    changeFrequency: "weekly",
    priority: 0.5,
    images: applicatons?.images as string[],
  }));
}
