import React from "react";
import banner from "./banner-img/banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import CustomToolbar from "../customToolbar/CustomToolbar";
// import CustomToolbar from "../customToolbar/CustomToolbar";

const Banner = ({ from, to }) => {
  return (
    <div className="relative h-80">
      {/* <CustomToolbar/> */}
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        className="h-full"
      >
        <SwiperSlide>
          <div
            className="h-full w-full rounded-b-3xl overflow-hidden relative bg-center bg-cover"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="absolute inset-0 bg-black/40" />

            {/* текст */}

            <div className="absolute inset-0 flex flex-col justify-end pb-16 pl-10 text-white w-[70%]">
              <p className="text-sm opacity-90 font-semibold">
                {from || "Бишкек"} →
              </p>
              <h1 className="text-2xl font-bold ">{to || "Ош"}</h1>
              <p className="text-lg mt-1  text-center ">От 11 407с</p>
            </div>

            {/* логотип */}
            {/* <div className="absolute top-20 right-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              KYRGYZ <br /> CONCEPT
            </div> */}

            <div className="absolute top-12 right-4">
              <div className="inline-block bg-blue-500 text-white px-4 py-2 leading-none text-center rounded-full font-semibold text-xs">
                KYRGYZ <br /> CONCEPT
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
