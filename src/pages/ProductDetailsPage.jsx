import React, { useEffect, useState } from 'react';
import '../style/productDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faWonSign } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { showItems } from '../apis/item';

export default function ProductDetailsPage() {
  // itemID 값이 변경될때마다 상품 상세 페이지 보여줌
  // useEffect(() => {
  //   showItemsDetails(itemID);
  // }, [itemID]);

  // // itemID 값을 params로 받아와서 보여주는 함수
  // const showItemsDetails = async (itemID) => {
  //   try {
  //     const resItemsDetails = await axios.get(`/productdetails/${itemID}`);
  //     const itemDetails = resItemsDetails.data;
  //     console.log(itemDetails);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  useEffect(() => {
    if (items.length > 0) {
      const foundItem = items.find((item) => item.itemID === Number(itemID));
      setSelectedItem(foundItem);

      categories.forEach((el) => {
        if (el.category_id === foundItem.categoryId) {
          setCategory(el.name);
        }
      });
    }
  }, [items, itemID]);

  return (
    <>
      <div className="detail-container">
        {/* 왼쪽 - 이미지 및 기타 설명 */}
        <div className="left-container">
          <img></img>
          <div className="product-more">
            <p>상품 정보</p>
            <p>{selectedItem.itemContent}</p>
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
              <Link> {selectedItem.itemGender} </Link>
              {'>'}
              <Link> {category} </Link>
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
