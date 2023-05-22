import React, { useRef } from 'react';

import '../../style/newItems.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Scrollbar,
  Autoplay,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Mousewheel, Scrollbar, Autoplay]);

export default function NewItems() {
  const swiperRef = useRef(null);

  const slideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      <div className="new_items_container">
        <div className="new_items_title">
          <p>New Items</p>
        </div>
        <div>
          {/* swiper navigation 버튼 */}
          <button onClick={slidePrev}>이전</button>
          <button onClick={slideNext}>다음</button>

          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Mousewheel, Scrollbar, Autoplay]}
            mousewheel={{ forceToAxis: true }}
            spaceBetween={0}
            slidesPerView={5}
            scrollbar={{ draggable: true, dragSize: 100 }}
          >
            <SwiperSlide>
              <img src="https://cdn.magloft.com/github/swiper/images/page-001.jpg" />
              <div className="img_desc">
                <p>상품명</p>
                <p>가격</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://cdn.magloft.com/github/swiper/images/page-002.jpg" />
              <div className="img_desc">
                <p>상품명</p>
                <p>가격</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://cdn.magloft.com/github/swiper/images/page-003.jpg" />
              <div className="img_desc">
                <p>상품명</p>
                <p>가격</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://cdn.magloft.com/github/swiper/images/page-004.jpg" />
              <div className="img_desc">
                <p>상품명</p>
                <p>가격</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://cdn.magloft.com/github/swiper/images/page-005.jpg" />
              <div className="img_desc">
                <p>상품명</p>
                <p>가격</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://cdn.magloft.com/github/swiper/images/page-006.jpg" />
              <div className="img_desc">
                <p>상품명</p>
                <p>가격</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://cdn.magloft.com/github/swiper/images/page-007.jpg" />
              <div className="img_desc">
                <p>상품명</p>
                <p>가격</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://cdn.magloft.com/github/swiper/images/page-008.jpg" />
              <div className="img_desc">
                <p>상품명</p>
                <p>가격</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://cdn.magloft.com/github/swiper/images/page-009.jpg" />
              <div className="img_desc">
                <p>상품명</p>
                <p>가격</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
