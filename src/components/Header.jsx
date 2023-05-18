import React, { useState } from 'react';
import '../style/_header.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
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
          {/* 키워드(해시태그) */}
          <div className="keyword">
            <p>#키워드</p>
            <p>#키워드</p>
            <p>#키워드</p>
            {/* 닫기 버튼 */}
            <div className="close" onClick={() => closeSearchWindow()}></div>
          </div>
          {/* 최근 검색어 */}
          <div className="recent-search">
            <ul>
              <li>최근 검색어</li>
              <li>최근 검색어 내역이 없습니다.</li>
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
                <img></img>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
