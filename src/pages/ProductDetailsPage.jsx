import React, { useEffect } from 'react';
import '../style/productDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faWonSign } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetailsPage() {
  const { itemID } = useParams();

  // itemID 값이 변경될때마다 상품상세페이지 보여줌
  useEffect(() => {
    showItemsDetails(itemID);
  }, [itemID]);

  // itemID 값을 params로 받아와서 보여주는 함수
  const showItemsDetails = async (itemID) => {
    try {
      const resItemsDetails = await axios.get(`/productdetails/${itemID}`);
      const itemDetails = resItemsDetails.data;
      console.log(itemDetails);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="detail-container">
        {/* 왼쪽 - 이미지 및 기타 설명 */}
        <div className="left-container">
          <img></img>
          <div className="product-more">
            <p>상품 정보</p>
            <p>상품 팔아용</p>
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
              <Link> 여성 </Link>
              {'>'}
              <Link> 신발</Link>
            </div>
            {/* 상품 내용 */}
            <ul className="product-content">
              <li>뉴발 팔아요~</li>
              <li>뉴발 574</li>
              <li>
                <FontAwesomeIcon icon={faWonSign} />
                1000원
                <span>
                  <FontAwesomeIcon icon={faHeart} className="heart-icon" />3
                </span>
              </li>
            </ul>
            <ul className="product-status">
              <li>상품 상태</li>
              <li>새상품</li>
            </ul>
            <ul className="product-status">
              <li>교환</li>
              <li>가능</li>
            </ul>
            <ul className="product-status">
              <li>거래 지역</li>
              <li>안양시 동안구</li>
            </ul>
            <div className="product_btn">
              <p>바로 구매하기</p>
              <p>위시리스트 담기</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
