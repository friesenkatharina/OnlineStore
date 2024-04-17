import React from "react";
import { Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/controller";
import "../styles/slider.css";
import imageData from "../data/items.json";

const Slider = () => {
  const images = imageData.map((item) => item.imgUrl);
  return (
    <section className="bg-white mt-10 mx-4 sm:mx-8 md:mx-20 lg:mx-36 z-10 slider-container">
      <Swiper
        modules={[Autoplay, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay
        style={{ marginLeft: "40%", marginTop: "150px" }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <a href="/#">
              <img
                style={{ width: "300px" }}
                src={img}
                alt={`slide-${index + 1}`}
                className="w-fit h-[500px] mx-auto select-none slide-image"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
