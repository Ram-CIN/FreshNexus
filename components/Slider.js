"use client";

import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    image: "/products/Capture1.png",
  },
  {
    image: "/products/Capture2.png",
  },
  {
    image: "/products/Capture3.png",
  },
  {
    image: "/products/Capture2.png",
  },
];

export default function GrocerySwiper() {
  return (
    <section className="w-full py-6 mt-15">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={18}
        slidesPerView={1.1}
        centeredSlides={false}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.1,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 2.4,
            spaceBetween: 24,
          },
        }}
        className="!pb-10"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[170px] overflow-hidden    sm:h-[210px] md:h-[290px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover transition-transform duration-500 "
                priority={index === 0}
              />
          </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}