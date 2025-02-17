"use client";
import React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
export default function Slider_Images({ images }: { images: string[] }) {
  return (
    <Carousel opts={{
        align:"center"
    }} className="w-full overflow-hidden my-5">
      <CarouselContent className="h-[370px]">
        {images.slice(1, images.length).map((image: string, index: number) => (
          <CarouselItem
            key={index}
            className="pointer-events-none select-none overflow-hidden"
          >
            <Image
              draggable={false}
              width={500}
              height={300}
              className="pointer-events-none size-full select-none object-contain"
              src={image}
              alt=""
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
