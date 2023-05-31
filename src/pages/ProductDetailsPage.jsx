import React, { useEffect, useState } from 'react';
import '../style/productDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faWonSign } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { showItems } from '../apis/item';
import ReactHtmlParser from 'react-html-parser';
import 'swiper/swiper.min.css'; //basic
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

export default function ProductDetailsPage() {
  const { itemID } = useParams();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [category, setCategory] = useState('');
  const categories = [
    {
      category_id: -1,
      name: 'ALL',
    },
    {
      category_id: 1,
      name: '상의',
    },
    {
      category_id: 2,
      name: '하의',
    },
    {
      category_id: 3,
      name: '신발',
    },
    {
      category_id: 4,
      name: '악세사리',
    },
    {
      category_id: 5,
      name: '기타',
    },
  ];

  // 모든 물품 가져오는 함수
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

  // 가져온 데이터 중 itemID와 같은 값인 데이터만 추출
  useEffect(() => {
    if (items.length > 0) {
      const foundItem = items.find((item) => item.itemID === Number(itemID));
      setSelectedItem(foundItem);
      // 카테고리 숫자에 해당하는 카테고리 이름 categories에서 찾아서
      // category라는 state에 저장
      categories.forEach((el) => {
        if (el.category_id === foundItem.categoryId) {
          setCategory(el.name);
        }
      });
    }
  }, [items, itemID]);

  // 해당 itemID를 가진 user(판매자-seller)의 정보를 가져오는 함수
  const [sellerInfo, setSellerInfo] = useState([]);
  const getSellerInfo = async () => {
    try {
      const resSellerInfo = await axios.get(`/productDetails/${itemID}`);
      const sellerData = resSellerInfo.data;
      setSellerInfo(sellerData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSellerInfo();
  }, []);

  // 위시리스트에 담기
  const wishCount = () => {};

  return (
    <>
      <div className="detail-container">
        {/* 왼쪽 - 이미지 및 기타 설명 */}
        <div className="left-gray-box"></div>
        <div className="left-container">
          <Swiper
            className="swiper"
            loop={true}
            loopAdditionalSlides={1}
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
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
          {/* 상품 정보 */}
          <div className="product-more">
            <p>상품정보</p>
            {ReactHtmlParser(selectedItem.itemContent)}
            <div className="hashtag">
              {selectedItem &&
                selectedItem.itemTag &&
                selectedItem.itemTag.split(' ').map((tag, index, array) => {
                  const hashtag = '#' + tag;
                  return index === array.length - 1 ? (
                    <Link>{hashtag.slice(1)}</Link>
                  ) : (
                    <Link>{hashtag}</Link>
                  );
                })}
            </div>
            {/* 판매자 정보 */}
            <div className="seller-info">
              <p>판매자 정보</p>
              <p></p>
            </div>
          </div>
        </div>
        {/* 오른쪽 - 상품 디테일  */}
        <div className="right-container">
          <div className="product-detail">
            {/* 상품 메뉴 이동 창 */}
            <div className="product-menu">
              <Link to="/">HOME</Link>
              <span> {'>'} 카테고리 </span>
              {'>'}
              <Link to={`../${selectedItem.itemGender}_product`}>
                {' '}
                {selectedItem.itemGender}{' '}
              </Link>
              {'>'}
              <Link to={`../${category}`}> {category} </Link>
            </div>
            {/* 상품 내용 */}
            <ul className="product-content">
              <li>{selectedItem.itemTitle}</li>
              <li>{selectedItem.itemName}</li>
              <li>
                <FontAwesomeIcon icon={faWonSign} className="won-icon" />
                {selectedItem.itemPrice}
                <span>
                  <FontAwesomeIcon icon={faHeart} className="heart-icon" />3
                </span>
              </li>
            </ul>
            <ul className="product-status">
              <li>거래 지역</li>
              <li>안양시 동안구</li>
            </ul>
            <ul className="product-status">
              <li>상품 상태</li>
              <li>새상품</li>
            </ul>
            <ul className="product-status">
              <li>교환</li>
              <li>가능</li>
            </ul>

            <div className="product_btn">
              <p>1:1 채팅하기</p>
              <p onClick={wishCount}>위시리스트 담기</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
