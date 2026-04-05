import React from "react";
import banner from "./banner-img/banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import CustomToolbar from "../customToolbar/CustomToolbar";
import { IonHeader, IonToolbar } from "@ionic/react";

const Banner = ({ from, to }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        className="h-80"
      >
        <SwiperSlide>
          <CustomToolbar>
            <div
              className="h-80 w-full rounded-b-3xl overflow-hidden relative bg-center bg-cover"
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="absolute inset-0 bg-black/40" />

              {/* текст */}
              <div className=" text-white  mt-32 ml-10">
                <p className="text-sm opacity-90">{from} →</p>
                <h1 className="text-3xl font-bold">{to}</h1>
                <p className="text-lg mt-1 ml-10">От 11 407c</p>
              </div>

              {/* логотип */}
              <div className="absolute top-20 right-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                KYRGYZ <br /> CONCEPT
              </div>

              {/* <div className="absolute top-4 right-4">
              <div className="inline-block bg-blue-500 text-white px-4 py-2 leading-none text-center rounded-full border-2 border-purple-400 font-semibold">
                KYRGYZ <br /> CONCEPT
              </div>
            </div> */}
            </div>
          </CustomToolbar>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
