"use client";
import React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
export default function Slider_Images({ images }: { images: string[] }) {
  return (
    <Carousel opts={{
        align:"center"
    }} className="h-fit w-full overflow-hidden">
      <CarouselContent className="w-full h-full">
        {images.slice(1, images.length).map((image: string, index: number) => (
          <CarouselItem
            key={index}
            className="pointer-events-none w-full select-none overflow-hidden"
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
