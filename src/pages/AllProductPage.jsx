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
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AllProductPage() {
  const { itemID } = useParams();
  const [allOpen, setAllOpen] = useState(false);
  const [manOpen, setManOpen] = useState(false);
  const [womanOpen, setWomanOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGender, setSelectedGender] = useState('');
  const [category, setCategory] = useState('');
  const [heart, setHeart] = useState(false);

  const itemsPerPage = 16;

  // 왼쪽 메뉴바
  const clickAll = () => {
    setAllOpen(!allOpen);
    setManOpen(false);
    setWomanOpen(false);
    setCategory('');
    setSelectedGender('all');
  };
  const clickMan = () => {
    setManOpen(!manOpen);
    setAllOpen(false);
    setWomanOpen(false);
    setCategory('');
    setSelectedGender('man');
  };
  const clickWoman = () => {
    setWomanOpen(!womanOpen);
    setAllOpen(false);
    setManOpen(false);
    setCategory('');
    setSelectedGender('woman');
  };

  // // 하트 누르기
  // const clickHeart = () => {
  //   setHeart(!heart);
  // };

  // 위시리스트에 추가 했는지 체크 (하트)
  const wishListCheck = async () => {
    try {
      const resWishCheck = await axios.get('/main/allwishlist', {
        params: {
          id: sessionStorage.getItem('userId'),
        },
      });

      const wishListData = resWishCheck.data;
      setWishListItems(wishListData);
      console.log(wishListData);
    } catch (error) {
      console.error(error);
    }
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
      // 그냥 all_product 페이지 들어갔을 땐 전부 다 보이게!
      if (selectedGender === '' && category === '') {
        return true;
      } else if (
        (selectedGender === 'all' && item.categoryId === category) ||
        (selectedGender === 'man' && item.categoryId === category) ||
        (selectedGender === 'woman' && item.categoryId === category)
      ) {
        return (
          item.itemGender === selectedGender && item.categoryId === category
        );
      } else if (selectedGender && category === '') {
        return item.itemGender === selectedGender;
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
  const filteredItems = items.filter((item) => {
    // 그냥 all_product 페이지 들어갔을 땐 전부 다 보이게!
    if (selectedGender === '' && category === '') {
      return true;
    } else if (
      (selectedGender === 'all' && item.categoryId === category) ||
      (selectedGender === 'man' && item.categoryId === category) ||
      (selectedGender === 'woman' && item.categoryId === category)
    ) {
      return item.itemGender === selectedGender && item.categoryId === category;
    } else if (selectedGender && category === '') {
      return item.itemGender === selectedGender;
    }
  });

  // console.log(items);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  //최근 본 상품 추가 ()
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // 상품 클릭 시 최근 본 상품에 추가
  const handleProductClick = (product) => {
    console.log('all 최근 본 상품');
    const updatedRecentlyViewed = [product, ...recentlyViewed.slice(0, 4)];
    const uniqueRecentlyViewed = [...new Set(updatedRecentlyViewed)]; //상품 중복처리
    setRecentlyViewed(uniqueRecentlyViewed);
    localStorage.setItem(
      'recentlyViewed',
      JSON.stringify(uniqueRecentlyViewed),
    );
  };

  useEffect(() => {
    getAllItems();
    wishListCheck();
    const storedRecentlyViewed = JSON.parse(
      localStorage.getItem('recentlyViewed'),
    );
    if (storedRecentlyViewed) {
      setRecentlyViewed(storedRecentlyViewed);
    }
  }, []);

  return (
    <>
      <div className="product_container">
        <div className="bottom_box">
          <div className="left_menu_box">
            <div className="left_menu">
              <div className="product">
                <span>ALL PRODUCT</span>
              </div>
              <div className="category_menu" onClick={clickAll}>
                <p className="category">ALL</p>
                <FontAwesomeIcon
                  className={allOpen ? 'slide_down' : 'slide_up'}
                  icon={faAngleUp}
                />
              </div>

              <ul className={allOpen ? 'show' : 'hide'}>
                {allOpen && (
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

              <div className="category_menu" onClick={clickMan}>
                <p className="category">MAN</p>
                <FontAwesomeIcon
                  className={manOpen ? 'slide_down' : 'slide_up'}
                  icon={faAngleUp}
                />
              </div>
              <ul className={manOpen ? 'show' : 'hide'}>
                {manOpen && (
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
              <div className="category_menu" onClick={clickWoman}>
                <p className="category">WOMAN</p>
                <FontAwesomeIcon
                  className={womanOpen ? 'slide_down' : 'slide_up'}
                  icon={faAngleUp}
                />
              </div>
              <ul className={womanOpen ? 'show' : ''}>
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
                    getCurrentItems().map((item, index) => {
                      const isWishList = wishListItems.some(
                        (wishListItem) =>
                          wishListItem.itemId === String(item.itemID),
                      );

                      return (
                        <div className="itemContainer" key={index}>
                          <Link
                            to={`/productdetails/${item.itemID}`}
                            onClick={() => handleProductClick(item)}
                          >
                            {item.imagePath1 ? (
                              <img
                                className="item"
                                src={`/${item.imagePath1.replace(
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
                          <div className="item_top_desc">
                            <div className="item_desc">
                              <p className="category_desc">
                                {item.itemGender.toUpperCase()} &gt;{' '}
                                {item.categoryId}
                              </p>
                              <Link
                                to={`/productdetails/${item.itemID}`}
                                className="title_desc"
                                onClick={() => handleProductClick(item)}
                              >
                                {item.itemTitle}
                              </Link>
                              <p className="price_desc">{item.itemPrice} 원</p>
                            </div>
                            {/* 하트 추후 수정 */}
                            {/* 통신 후 하트 수정 */}
                            {/* <div className="heart_icon" onClick={clickHeart}> */}
                            <div className="heart_icon">
                              {isWishList ? (
                                <FontAwesomeIcon icon={solidHeart} />
                              ) : (
                                <FontAwesomeIcon icon={regularHeart} />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
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
