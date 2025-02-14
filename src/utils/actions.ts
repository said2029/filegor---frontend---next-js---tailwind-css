"use server";
const BACKENDURL = process.env.BACKEND_URL;
const FetchHalper = async (path: string) => {
  return await fetch(BACKENDURL + `/api/${path}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

const get_Categories = async () => {
  const res = await FetchHalper("category");
  if (!res) return null;
  return res.map((item: any) => ({
    ...item,
    image: `${BACKENDURL}/upload/${item.image}`,
  }));
};

export { get_Categories };
