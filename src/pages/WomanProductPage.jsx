import React, { useEffect, useState } from 'react';
import '../style/allProduct.scss';
import { showAllItems } from '../apis/item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleUp,
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

export default function WomanProductPage() {
  const [womanOpen, setWomanOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [heart, setHeart] = useState(false);

  const itemsPerPage = 16;

  // 왼쪽 메뉴바
  const clickWoman = () => {
    setWomanOpen(!womanOpen);
    setCategory('');
  };

  // 하트 누르기
  const clickHeart = () => {
    setHeart(!heart);
  };

  // 백에서 item 데이터 가져오기
  const getAllItems = async () => {
    try {
      const resAllItems = await showAllItems();
      const itemsData = resAllItems.data;
      setItems(itemsData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllItems();
  }, []);

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory); // 선택한 카테고리 업데이트
    setCurrentPage(1); // 페이지 초기화
  };

  // 현재 페이지에 해당하는 아이템 반환
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // 선택한 카테고리에 따라 필터링
    const filteredItems = items.filter((item) => {
      if (category === '') {
        return item.itemGender === 'woman';
      } else if (item.categoryId === category) {
        return item.itemGender === 'woman' && item.categoryId === category;
      }
    });

    return filteredItems.slice(startIndex, endIndex);
  };

  // 다음 페이지로
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // 이전 페이지로
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // 전체 페이지 수 계산
  // 16개까지 보이게 했으니 전체 나누기 16
  // 선택한 카테고리에 따라 필터링
  const filteredItems = items.filter((item) => {
    if (category === '') {
      return item.itemGender === 'woman';
    } else if (item.categoryId === category) {
      return item.itemGender === 'woman' && item.categoryId === category;
    }
  });
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <>
      <div className="product_container">
        <div className="bottom_box">
          <div className="left_menu_box">
            <div className="left_menu">
              <div className="product">
                <span>PRODUCT</span>
              </div>

              <div className="category_menu" onClick={clickWoman}>
                <p className="category">WOMAN</p>
                <FontAwesomeIcon
                  className={womanOpen ? 'slide_down' : 'slide_up'}
                  icon={faAngleUp}
                />
              </div>
              <ul className={womanOpen ? 'show' : 'hide'}>
                {womanOpen && (
                  <>
                    <li
                      onClick={() => handleCategoryClick('상의')}
                      className={category === '상의' ? 'selected_option' : ''}
                    >
                      상의
                    </li>
                    <li
                      onClick={() => handleCategoryClick('하의')}
                      className={category === '하의' ? 'selected_option' : ''}
                    >
                      하의
                    </li>
                    <li
                      onClick={() => handleCategoryClick('신발')}
                      className={category === '신발' ? 'selected_option' : ''}
                    >
                      신발
                    </li>
                    <li
                      onClick={() => handleCategoryClick('악세사리')}
                      className={
                        category === '악세사리' ? 'selected_option' : ''
                      }
                    >
                      악세사리
                    </li>
                    <li
                      onClick={() => handleCategoryClick('기타')}
                      className={category === '기타' ? 'selected_option' : ''}
                    >
                      기타
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="right_box">
            <div className="right_controller">
              <div className="content">
                <div className="product_grid_container">
                  {getCurrentItems().length === 0 ? (
                    <div className="not_items">
                      <FontAwesomeIcon
                        icon={faCircleExclamation}
                        size="4x"
                        style={{ color: '#2d2f45' }}
                      />
                      <p>제품이 존재하지 않습니다.</p>
                    </div>
                  ) : (
                    getCurrentItems().map((item, index) => (
                      <div className="itemContainer" key={index}>
                        <Link to={`/productdetails/${item.itemID}`}>
                          <img
                            className="item"
                            src="/images/exam.jpeg"
                            alt="상품이미지"
                          />
                        </Link>
                        <div className="item_top_desc">
                          <div className="item_desc">
                            <p className="category_desc">
                              {item.itemGender.toUpperCase()} &gt;{' '}
                              {item.categoryId}
                            </p>
                            <Link
                              to={`/productdetails/${item.itemID}`}
                              className="title_desc"
                            >
                              {item.itemTitle}
                            </Link>
                            <p className="price_desc">{item.itemPrice} 원</p>
                          </div>
                          {/* 하트 추후 수정 */}
                          <div className="heart_icon" onClick={clickHeart}>
                            {heart ? (
                              <FontAwesomeIcon icon={solidHeart} />
                            ) : (
                              <FontAwesomeIcon icon={regularHeart} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="pagination">
                  {getCurrentItems().length > 0 && currentPage >= 1 && (
                    <button
                      className="prevBtn"
                      onClick={previousPage}
                      disabled={currentPage === 1}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                  )}
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`pageNum ${
                        currentPage === index + 1 ? 'select' : 'deselected'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  {currentPage <= totalPages && (
                    <button
                      className="nextBtn"
                      onClick={nextPage}
                      disabled={currentPage >= totalPages}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
