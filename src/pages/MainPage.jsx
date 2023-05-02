import React from 'react';
import '../style/mainPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import 'swiper/swiper.min.css'; //basic
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Link } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination]);
export default function MainPage() {
  return (
    <>
      <Swiper
        className="swiper"
        loop={true}
        loopAdditionalSlides={1}
        spaceBetween={300}
        slidesPerView={2}
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
      <Link className="view-more">
        자세히 보기
        <FontAwesomeIcon icon={faArrowRightLong} />
      </Link>

      <div className="top_btn">
        <FontAwesomeIcon className="top_btn_arrow" icon={faChevronUp} />
      </div>
    </>
  );
}
