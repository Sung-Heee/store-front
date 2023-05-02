import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css'; //basic
import 'swiper/css/navigation';
import 'swiper/css/pagination';
SwiperCore.use([Navigation, Pagination]);
export default function MainSwiper() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      scrollbar={{ draggable: true }}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        768: {
          slidesPerView: 7,
        },
      }}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
}
