import React, { useEffect, useRef, useState } from 'react';

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
import axios from 'axios';
import { Link } from 'react-router-dom';
import { showItems } from '../../apis/item';
SwiperCore.use([Navigation, Pagination, Mousewheel, Scrollbar, Autoplay]);

export default function NewItems() {
  const swiperRef = useRef(null);
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const resItems = await showItems();
      const itemsData = resItems.data;
      setItems(itemsData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getItems();
  }, []);

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

  // 최근에 올라온 상품 15개 출력
  const recentItems = items.slice(-15).reverse();

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
            spaceBetween={10}
            slidesPerView={5}
            scrollbar={{ dragSize: 100 }}
          >
            {recentItems.map((item) => (
              <>
                <SwiperSlide>
                  <Link
                    to={`/productdetails/${item.itemID}`}
                    className="item_img"
                  >
                    {item.itemTitle}
                  </Link>
                  <div className="img_desc">
                    <p>
                      {' '}
                      [{item.categoryId}]{` `}
                      {item.itemName}
                    </p>
                    <p>가격 : {item.itemPrice}</p>
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
