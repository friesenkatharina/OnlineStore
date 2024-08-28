import { Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/controller";
import "../styles/slider.css";
import imageData from "../items.json";

const Slider = () => {
  const images = imageData.map((item) => item.imgUrl);

  return (
    <section className="bg-white slider-container">
      <Swiper
        modules={[Autoplay, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay
        style={{
          marginLeft: "20%",
          marginTop: "150px",
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <a href="/#">
              <img
                style={{
              
                  border: "15px solid grey",
                  padding: "10px",
                }}
                src={img}
                alt={`slide-${index + 1}`}
                className=" select-none slide-image"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
