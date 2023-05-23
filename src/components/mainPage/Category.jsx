import React, { useState } from 'react';
import '../../style/category.scss';
import { Link } from 'react-router-dom';

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    {
      name: 'ALL',
      value: 'ALL',
      color: '#F99B7D',
    },
    {
      name: '상의',
      value: '상의',
      color: '#7286D3',
    },
    {
      name: '하의',
      value: '하의',
      color: '#9DC08B',
    },
    {
      name: '신발',
      value: '신발',
      color: '#FEA1BF',
    },
    {
      name: '악세사리',
      value: '악세사리',
      color: '#D09CFA',
    },
    {
      name: '기타',
      value: '기타',
      color: '#9E7676',
    },
  ];

  const items = {
    ALL: [
      'All 1',
      'All 2',
      'All 3',
      'All 4',
      'All 5',
      'All 6',
      'All 7',
      'All 8',
      'All 9',
    ],
    상의: [
      '상의 1',
      '상의 2',
      '상의 3',
      '상의 4',
      '상의 5',
      '상의 6',
      '상의 7',
      '상의 8',
      '상의 9',
    ],
    하의: [
      '하의 1',
      '하의 2',
      '하의 3',
      '하의 4',
      '하의 5',
      '하의 6',
      '하의 7',
      '하의 8',
      '하의 9',
    ],
    신발: [
      '신발 1',
      '신발 2',
      '신발 3',
      '신발 4',
      '신발 5',
      '신발 6',
      '신발 7',
      '신발 8',
      '신발 9',
    ],
    악세사리: [
      '악세사리 1',
      '악세사리 2',
      '악세사리 3',
      '악세사리 4',
      '악세사리 5',
      '악세사리 6',
      '악세사리 7',
      '악세사리 8',
      '악세사리 9',
    ],
    기타: [
      '기타 1',
      '기타 2',
      '기타 3',
      '기타 4',
      '기타 5',
      '기타 6',
      '기타 7',
      '기타 8',
      '기타 9',
    ],
  };

  // 선택된 카테고리 변경시
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  const itemsToShow =
    selectedCategory === 'ALL' ? items.ALL : items[selectedCategory];

  return (
    <>
      <div className="category_container">
        <div className="category_title">
          <p>Category</p>
        </div>
        <div className="category_menu">
          <ul className="category_ul">
            {categories.map((category) => (
              <li
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={
                  category.value === selectedCategory ? 'selected' : ''
                }
              >
                {category.name}
                {/* 카테고리 선택시 생기는 동그라미 */}
                {category.value === selectedCategory && (
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
                style={{
                  backgroundColor: categories.find(
                    (category) => category.value === selectedCategory,
                  )?.color,
                }}
              >
                <p className="shortCuts_category">{selectedCategory}</p>
                <p className="shortCuts">바로가기</p>
              </Link>
            </div>

            {itemsToShow.map((item, index) => (
              <>
                <Link key={index} className="items_div">
                  {item}
                  <div className="img_desc">
                    <p>상품명</p>
                    <p>가격</p>
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
