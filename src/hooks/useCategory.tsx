import { get_Categories } from "@/utils/actions";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    get_Categories().then((res) => {
        console.log(res);
      setCategory(res);
    });
  }, []);
  return {category}
}
