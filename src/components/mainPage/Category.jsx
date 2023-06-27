import React, { useEffect, useState } from 'react';
import '../../style/category.scss';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { showItems } from '../../apis/item';
import ProductDetailsPage from '../../pages/ProductDetailsPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [items, setItems] = useState([]);

  const categories = [
    {
      category_id: 'ALL',
      name: 'ALL',
      color: '#F99B7D',
    },
    {
      category_id: '상의',
      name: '상의',
      color: '#7286D3',
    },
    {
      category_id: '하의',
      name: '하의',
      color: '#9DC08B',
    },
    {
      category_id: '신발',
      name: '신발',
      color: '#FEA1BF',
    },
    {
      category_id: '악세사리',
      name: '악세사리',
      color: '#D09CFA',
    },
    {
      category_id: '기타',
      name: '기타',
      color: '#9E7676',
    },
  ];

  // 선택된 카테고리 변경시
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  // 백에서 item 데이터 가져오기
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

  // 선택된 카테고리에 따라 보여줄 아이템 필터링
  // categoryId는 db에 담긴 이름
  const itemsShow =
    selectedCategory === 'ALL'
      ? items
      : items.filter((item) => item.categoryId === selectedCategory);

  console.log(itemsShow);
  // 랜덤으로 9개까지만 띄우게 하기
  const randomItems = itemsShow.sort(() => Math.random() - 0.5).slice(0, 9);

  return (
    <>
      <div className="category_container">
        <div className="category_title">
          <p>Category</p>
        </div>
        <div className="category_menu">
          <ul className="category_ul">
            {/* key 값은 내가 categories에 있는 value - all, 상의, 하의, 신발, 악세사리, 기타 */}
            {/* value가 6개니까 li는 6개 */}
            {categories.map((category) => (
              <li
                key={category.category_id}
                // li 중에서 선택된 value를 selectedCategory에 담아줌
                // 선택된 li의 className은 selected로 바뀜 안 선택되면 className 없음
                onClick={() => handleCategoryChange(category.category_id)}
                className={
                  category.category_id === selectedCategory ? 'selected' : ''
                }
              >
                {/* li 6개 */}
                {category.name}

                {/* 카테고리 선택시 생기는 동그라미 */}
                {category.category_id === selectedCategory && (
                  <div
                    className="category_dot"
                    style={{
                      backgroundColor: category.color,
                    }}
                  ></div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="category_items">
          <ul className="items_list">
            <div className="shortCuts_div">
              <Link
                className="shortCuts_btn"
                // 내가 선택한 카테고리의 색 지정
                // 내가 선택한 값대로 categories에 있는 color 정보 가져와서 배경색으로 지정
                style={{
                  backgroundColor: categories.find(
                    (category) => category.category_id === selectedCategory,
                  )?.color,
                }}
              >
                <p className="shortCuts_category">
                  {
                    categories.find(
                      (category) => category.category_id === selectedCategory,
                    )?.name
                  }
                </p>
                <p className="shortCuts">바로가기</p>
              </Link>
            </div>

            {randomItems.map((item, index) => (
              <>
                <Link
                  to={`/productdetails/${item.itemID}`}
                  key={index}
                  className="items_div"
                >
                  {item.imagePath ? (
                    <img
                      className="item_img"
                      src={`/${item.imagePath.replace(
                        'src/main/resources/static/',
                        '',
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
                  <div className="img_desc">
                    <div className="img_text_desc">
                      <div className="category_desc">
                        {item.itemGender.toUpperCase()} &gt; {item.categoryId}
                      </div>
                      <div className="title_desc">{item.itemName}</div>
                      <div className="price_desc">{item.itemPrice} 원</div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
