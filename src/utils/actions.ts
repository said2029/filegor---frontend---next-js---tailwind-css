/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
const BACKENDURL = process.env.BACKEND_URL;
//#region  halpers
const FetchHalper = async (path: string, header?: RequestInit) => {
  return await fetch(BACKENDURL + `/api/${path}`, header)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};
const GenerateProgram = (item: any) => {
  return {
    ...item,
    category: {
      ...item.category,
      image: `${BACKENDURL}/upload/${item.category.image}`,
    },
    images: item.images.map((image: string) =>
      image?.startsWith("http") ? image : `${BACKENDURL}/upload${image}`,
    ),
    icon: item?.icon?.startsWith("http")
      ? item.icon
      : `${BACKENDURL}/upload${item.icon}`,
  };
};
//#endregion

const get_Categories = async (perPage = 10) => {
  const res = await FetchHalper(`category?perPage=${perPage}`);
  if (!res||!Array.isArray(res)) return [];
  return res?.map((item: any) => ({
    ...item,
    image: `${BACKENDURL}/upload/${item.image}`,
  }));
};

const get_SubCategories = async (perPage = 10) => {
  const res = await FetchHalper(`sub-category?perPage=${perPage}`);
  if (!res) return null;
  return res.map((item: any) => ({
    ...item,
    image: `${BACKENDURL}/upload/${item.image}`,
  }));
};

interface Get_appPropt {
  search?: string;
  category?: string;
  subCategory?: string;
  perPage?: number;
  page?: number;
  topDownloads: boolean;
}
const get_application = async ({
  perPage = 10,
  search,
  category,
  page = 1,
  topDownloads = false,
}: Get_appPropt) => {
  const filter = `${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}`;
  const res = await FetchHalper(
    `program?perPage=${perPage}&page=${page}&topDownloads=${topDownloads}${filter}`,
  );
  if (!res || !Array.isArray(res)) return;
  return res?.map((item: any) => GenerateProgram(item));
};
const incrementDownload = async (slug: string) => {
  return await FetchHalper(`program/incrementDownload/${slug}`, {
    method: "PUT",
  });
};

const get_by_slug = async (slug: string) => {
  const res = await FetchHalper(`program/slug/${slug}`);
  return GenerateProgram(res);
};

export {
  get_Categories,
  get_application,
  incrementDownload,
  get_by_slug,
  get_SubCategories,
};
