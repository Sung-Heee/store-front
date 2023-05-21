import React, { useEffect, useRef, useState } from 'react';
import '../style/_header.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
// import logo from '../images/logo.png';

export default function Header() {
  // 검색창 토글을 위한 state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 검색창 토글 함수
  const toggleSearchWindow = () => {
    setIsSearchOpen((isSearchOpen) => !isSearchOpen);
  };

  // 검색창 닫기 함수
  const closeSearchWindow = () => {
    setIsSearchOpen((isSearchOpen) => !isSearchOpen);
  };

  //검색창 키워드 랜덤 생성
  const randomKeyWord = ['신발', '상의', '하의', '모자', '악세사리'];
  const randomIndex = [];
  randomKeyWord.map(() => {
    let i = Math.floor(Math.random() * randomKeyWord.length);
    if (randomIndex.length === 0 || !randomIndex.includes(i)) {
      randomIndex.push(i);
    }
  });
  // randomIndex.splice(0, Math.floor(Math.random() * 5));

  // 상품 검색 함수
  const searchInputRef = useRef();

  const searchProduct = async () => {
    if (!searchInputRef.current.value) return alert('검색어를 입력하세요');

    try {
      console.log('검색 했니');
      // await axios.get('/searchproduct', {
      //   searchProduct: searchInputRef.current.value,
      // });

      // 최근 검색어 저장
      let getLocal = localStorage.getItem('data');
      if (getLocal === null) {
        getLocal = [];
      } else {
        getLocal = JSON.parse(getLocal);
      }
      getLocal.push(searchInputRef.current.value);
      const uniqueData = [...new Set(getLocal)]; // 검색어 중복된거 제거
      localStorage.setItem('data', JSON.stringify(uniqueData));
    } catch (error) {
      console.log(error);
      console.log('검색 잘못되었따');
    }

    // 검색어 입력 필드 초기화
    searchInputRef.current.value = '';
  };

  // 최근 검색어 초기 랜더링 시 가져옴
  const [recentSearches, setRecentSearches] = useState([]);
  useEffect(() => {
    let getLocal = localStorage.getItem('data');
    if (getLocal === null) {
      getLocal = [];
    } else {
      getLocal = JSON.parse(getLocal);
    }
    setRecentSearches(getLocal); //최근 검색어 배열로 담은 state
  }, []);

  return (
    <>
      <div className="all_container">
        <div className="header_sub_container minMax">
          <div className="header_sub_menu">
            <ul>
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
              <li>
                <Link to="/register">JOIN</Link>
              </li>
              <li className="header_dropdown_menu">
                <p>SALE</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="header_main_container minMax">
          <div className="header_main_menu">
            <ul>
              <li>
                <Link to="/man_product">MAN</Link>
              </li>
              <li>
                <Link to="/woman_product">WOMAN</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="header_logo">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="로고"
                className="header_logo_img"
              />
            </Link>
          </div>
          <div className="header_icon_menu">
            <ul>
              <li>
                <Link to="/mypage">
                  <FontAwesomeIcon icon={faUser} className="header_user_icon" />
                </Link>
              </li>
              <li>
                <p>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="header_search_icon"
                    onClick={() => toggleSearchWindow()}
                  />
                </p>
              </li>
              <li>
                <Link to="/mypage">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="header_heart_icon"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* 검색창 토글 */}
      <div className={isSearchOpen ? 'show_search' : 'hide_search'}>
        <div className="search-container">
          {/* 검색창 */}
          <div className="search-div">
            <input
              type="text"
              className="search-input"
              placeholder="상품을 검색하세요"
              ref={searchInputRef}
            />
            <button
              type="button"
              className="search_btn"
              onClick={searchProduct}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="header_search_icon"
              />
            </button>
          </div>
          {/* 키워드(해시태그) */}
          <div className="keyword">
            {randomIndex.map((el, idx) => (
              <Link key={idx}>#{randomKeyWord[el]}</Link>
            ))}
            {/* 닫기 버튼 */}
            <div className="close" onClick={() => closeSearchWindow()}></div>
          </div>
          {/* 최근 검색어 */}
          <div className="recent-search">
            <p>최근 검색어</p>
            <ul>
              {recentSearches.length > 0 ? (
                recentSearches.map((search, index) => (
                  <li key={index}>{search}</li>
                ))
              ) : (
                <li className="no-recent-search">
                  최근 검색어 내역이 없습니다.
                </li>
              )}
            </ul>
          </div>
          {/* 최근 본 상품 */}
          <div className="recent-look-product">
            <ul>
              <li>최근 본 상품</li>
              <li>최근 본 상품이 없습니다.</li>
              <li>
                <img></img>
                <img></img>
                <img></img>
                <img></img>
                <img></img>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
