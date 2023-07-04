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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
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

  //최근 본 상품 추가 ()
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const storedRecentlyViewed = JSON.parse(
      localStorage.getItem('recentlyViewed'),
    );
    if (storedRecentlyViewed) {
      setRecentlyViewed(storedRecentlyViewed);
    }
  }, []);

  // 상품 클릭 시 최근 본 상품에 추가
  const handleProductClick = (product) => {
    console.log('newitems 최근 본 상품');
    const updatedRecentlyViewed = [product, ...recentlyViewed.slice(0, 4)];
    const uniqueRecentlyViewed = [...new Set(updatedRecentlyViewed)]; //상품 중복처리
    setRecentlyViewed(uniqueRecentlyViewed);
    localStorage.setItem(
      'recentlyViewed',
      JSON.stringify(uniqueRecentlyViewed),
    );
  };

  return (
    <>
      <div className="new_items_container">
        <div className="new_items_title">
          <p>New Items</p>
        </div>
        <div>
          {/* swiper navigation 버튼 */}
          {/* <button onClick={slidePrev}>이전</button>
          <button onClick={slideNext}>다음</button> */}

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
                    onClick={() => handleProductClick(item)}
                  >
                    {item.imagePath ? (
                      <img
                        className="item_img"
                        src={`/${item.imagePath.replace(
                          /.*[\\/]images[\\/]/,
                          'images/',
                        )}`}
                        alt="상품이미지"
                      />
                    ) : (
                      <div className="no_image_div">
                        <div className="no_image">
                          <FontAwesomeIcon
                            icon={faCircleExclamation}
                            size="4x"
                            style={{ color: '#2d2f45' }}
                          />
                          <p>No Image</p>
                        </div>
                      </div>
                    )}
                  </Link>
                  <div className="img_desc">
                    <div className="img_text_desc">
                      <div className="category_desc">
                        {item.itemGender.toUpperCase()} &gt; {item.categoryId}
                      </div>
                      <div className="title_desc">{item.itemName}</div>
                      <div className="price_desc">{item.itemPrice} 원</div>
                    </div>
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
