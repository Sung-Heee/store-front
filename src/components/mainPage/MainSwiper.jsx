import React from 'react';
import 'swiper/swiper.min.css'; //basic
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);
export default function MainSwiper() {
  return (
    <>
      <Swiper
        className="swiper"
        loop={true}
        loopAdditionalSlides={1}
        spaceBetween={0}
        slidesPerView={1.8}
        centeredSlides={true}
        scrollbar={{ draggable: true }}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide className="swiper-slide">
          <img></img>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img></img>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
