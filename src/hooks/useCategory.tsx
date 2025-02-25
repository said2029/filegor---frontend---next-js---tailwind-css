/* eslint-disable @typescript-eslint/no-explicit-any */
import { get_Categories } from "@/utils/actions";
import { useEffect, useState } from "react";

export default function useCategory(perPage = 10) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    get_Categories(perPage).then((res: any) => {
      setCategory(res);
    });
  }, [perPage]);
  return { category };
}
