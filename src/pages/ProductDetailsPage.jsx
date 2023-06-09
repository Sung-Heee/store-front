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
import ChatModal from '../components/ChatModal';

SwiperCore.use([Navigation, Pagination]);

export default function ProductDetailsPage() {
  const { itemID } = useParams();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [userId, setUserId] = useState();
  const [wish, setWishList] = useState();
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

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
      const res = await axios.get('/main/wishlist', {
        params: {
          itemID: itemID,
          userID: sessionStorage.getItem('userId'),
        },
      });
      // 찜한 개수 데이터 받아옴
      const wishListCount = res.data.count;
      setWishCount(wishListCount);

      // 내가 위시리스트에 상품담았는지 안담았는지 확인
      if (res.data.message === '데이터가 있음') {
        setWishList('위시리스트 삭제');
      } else {
        setWishList('위시리스트 담기');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    WishListCount();
  }, []);

  // 위시리스트에 이미 담겨있을땐 삭제 요청
  const deleteWishList = async () => {
    console.log('삭제요청');
    try {
      const resDeleteWish = await axios.post('/main/delete/wishlist', null, {
        params: {
          itemID: itemID,
          userID: sessionStorage.getItem('userId'),
        },
      });

      // 삭제 눌렀을때 받을 메세지
      const message = resDeleteWish.data.message;
      if (resDeleteWish.data.status === '200') {
        alert(message);
        location.reload(); // 삭제되고 페이지 새로고침
      } else {
        return alert(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //위시리스트에 담겨 있지 않다면 추가 요청.
  const wishList = async () => {
    console.log('클릭');
    try {
      const resWish = await axios.post('/main/wishlist', null, {
        params: {
          itemID: itemID,
          userID: sessionStorage.getItem('userId'),
        },
      });

      // 찜했을때 받을 메세지
      const message = resWish.data.message;
      if (resWish.data.status === '200') {
        alert(message);
        location.reload(); // 찜 담고 페이지 새로고침
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
        const resDelete = axios.post('/main/itemDelete/', null, {
          params: {
            itemID: itemId,
            userID: sessionStorage.getItem('userId'),
          },
        });
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

  // 이미지 경로 담는 배열
  const itemImageArr = [];

  for (let i = 1; i <= 3; i++) {
    // selectedItem에서 imagePath1, imagePath2, imagePath3 값 가져오기
    const imagePath = selectedItem[`imagePath${i}`];
    // imagePath 값이 존재하면 추가, 없으면 null 값 추가
    itemImageArr.push(imagePath || null);
  }

  console.log(itemImageArr);

  const handleOpenChatModal = () => {
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
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
              initialSlide={2}
            >
              {itemImageArr.map(
                (item, index) =>
                  item !== null && (
                    <SwiperSlide key={index} className="swiper-slide">
                      <img
                        src={`/${item.replace(
                          /.*[\\/]images[\\/]/,
                          'images/',
                        )}`}
                        alt="상품이미지"
                      />
                    </SwiperSlide>
                  ),
              )}
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
                <p onClick={handleOpenChatModal}>1:1 채팅하기</p>
                {/* {isChatModalOpen && (
                  <ChatModal
                    isOpen={isChatModalOpen}
                    onClose={handleCloseChatModal}
                  />
                )} */}
                {wish === '위시리스트 담기' ? (
                  <p onClick={wishList}>{wish}</p>
                ) : (
                  <p onClick={deleteWishList}>{wish}</p>
                )}
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
