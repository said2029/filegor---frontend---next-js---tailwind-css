/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
const BACKENDURL = process.env.BACKEND_URL;
const FetchHalper = async (path: string) => {
  return await fetch(BACKENDURL + `/api/${path}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

const get_Categories = async (perPage = 10) => {
  const res = await FetchHalper(`category?perPage=${perPage}`);
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
}

const get_application = async ({
  perPage = 10,
  search,
  category,
  page = 1,
}: Get_appPropt) => {
  const filter = `${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}`;
  const res = await FetchHalper(
    `program?perPage=${perPage}&page=${page}${filter}`,
  );
  if (!res || !Array.isArray(res)) return;
  return res?.map((item: any) => ({
    ...item,
    category: { ...item.category, image: `${BACKENDURL}/upload/${item.category.image}` },
    images: item.images.map((image: string) => `${BACKENDURL}/upload${image}`),
  }));
};

export { get_Categories, get_application };
