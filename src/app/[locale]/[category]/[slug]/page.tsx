import { get_by_slug } from "@/utils/actions";
import React from "react";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const program = await get_by_slug(slug);
  console.log(program);
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 py-8">
        <div className="container">
          <h1 className="text-white text-2xl">{program.title}</h1>
        </div>
      </div>

      {slug}
    </div>
  );
}
