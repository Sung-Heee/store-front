import React, { useEffect, useState } from 'react';
import '../style/productDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faWonSign } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { deleteItem, showItems } from '../apis/item';
import ReactHtmlParser from 'react-html-parser';
import 'swiper/swiper.min.css'; //basic
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import ScrollReset from '../components/ScrollReset';
import CryptoJS, { SHA256 } from 'crypto-js';
SwiperCore.use([Navigation, Pagination]);

export default function ProductDetailsPage() {
  const { itemID } = useParams();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

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
    }
  }, [items, itemID]);

  // 아이디 암호화
  const aes128Encode = (secretKey, Iv, data) => {
    const cipher = CryptoJS.AES.encrypt(
      data,
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: CryptoJS.enc.Utf8.parse(Iv), // [Enter IV (Optional) 지정 방식]
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC, // [cbc 모드 선택]
      },
    );
    return cipher.toString();
  };

  const dbUserId = aes128Encode(
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_EMAIL_AES_SECRET_KEY,
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_AES_SECRET_IV,
    selectedItem.userID,
  );

  useEffect(() => {
    setUserId(sessionStorage.getItem('userId'));
  }, []);

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

  // 찜한 총 개수 보여주기
  const [wishCount, setWishCount] = useState(0);
  const WishListCount = async () => {
    try {
      const res = await axios.get('/wishlist');
      // 찜한 개수 데이터 받아옴
      const wishListCount = res.data.count;
      setWishCount(wishListCount);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    WishListCount();
  }, []);

  // 위시리스트에 post 요청
  const wishList = async () => {
    try {
      const resWish = await axios.post('/wishlist', {
        itemID: itemID,
        userID: selectedItem.userID,
      });

      // 찜했을때 받을 메세지
      const message = resWish.data.message;
      if (resWish.data.status === '200') {
        alert(message);
      } else {
        return alert(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제하기
  const deleteItemFunc = async (e) => {
    e.preventDefault(); // 자동 새로고침 방지

    if (window.confirm('상품을 삭제하시겠습니까?')) {
      try {
        const itemId = selectedItem.itemID;
        const resDelete = await deleteItem(itemId);
        const message = resDelete.data.message;
        if (resDelete.data.status === '200') {
          alert(message); // 삭제되었습니다.
          navigate('/');
        } else {
          return alert(message); // 삭제 실패
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <ScrollReset />
      <div className="detail-container">
        {/* 왼쪽 - 이미지 및 기타 설명 */}
        <div className="left-container">
          <div className="swiper-container">
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
                <img src="/images/exam.jpeg" alt="상품이미지" />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <img src="/images/exam.jpeg" alt="상품이미지" />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <img src="/images/exam.jpeg" alt="상품이미지" />
              </SwiperSlide>
            </Swiper>
          </div>
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
                    ''
                  ) : (
                    <Link>{hashtag}</Link>
                  );
                })}
            </div>
          </div>
        </div>
        {/* 오른쪽 - 상품 디테일  */}
        <div className="right-container">
          <div className="product-detail">
            {/* 상품 메뉴 이동 창 */}
            <div className="product-container">
              <div className="product-menu">
                <Link to="/">HOME</Link>
                <span> {'>'} 카테고리 </span>
                {'>'}
                <Link to={`../${selectedItem.itemGender}_product`}>
                  {' '}
                  {selectedItem.itemGender}{' '}
                </Link>
                {'>'}
                <Link to={`../${selectedItem.categoryId}`}>
                  {' '}
                  {selectedItem.categoryId}{' '}
                </Link>
              </div>
              {/* 상품 내용 */}
              <ul className="product-content">
                <li>{selectedItem.itemTitle}</li>
                <li>{selectedItem.itemName}</li>
                <li>
                  <FontAwesomeIcon icon={faWonSign} className="won-icon" />
                  {selectedItem.itemPrice}
                  <span>
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                    {wishCount}
                  </span>
                </li>
              </ul>
              <ul className="product-status">
                <li>거래 지역</li>
                <li>{selectedItem.address}</li>
              </ul>
              <ul className="product-status">
                <li>상품 상태</li>
                <li>{selectedItem.itemState}</li>
              </ul>
              <ul className="product-status">
                <li>교환</li>
                <li>{selectedItem.itemExchange}</li>
              </ul>
            </div>
            {userId === dbUserId ? (
              <div className="product_btn">
                <p onClick={deleteItemFunc}>삭제하기</p>
                <p>ㅇㅇ하기</p>
              </div>
            ) : (
              <div className="product_btn">
                <p>1:1 채팅하기</p>
                <p onClick={wishList}>위시리스트 담기</p>
              </div>
            )}

            {/* 판매자 정보 */}
            <div className="seller-info">
              <p>판매자 정보</p>
              <Link to="/user_store">{selectedItem.userID}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
