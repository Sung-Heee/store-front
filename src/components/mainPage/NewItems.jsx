import React from 'react';
import '../../style/newItems.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Navigation, Pagination } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Scrollbar, Pagination]);
import 'swiper/swiper.scss';

export default function NewItems() {
  return (
    <>
      <div className="new_items_container">
        <div className="new_items_title">
          <p>New Items</p>
        </div>
        <div>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Scrollbar, Pagination]}
            spaceBetween={10}
            slidesPerView={5}
            navigation={true}
            // scrollbar={{ draggable: true }}
            scrollbar={{ draggable: true, dragSize: 100 }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
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
