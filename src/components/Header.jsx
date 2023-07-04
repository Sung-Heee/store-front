import React, { useEffect, useRef, useState } from 'react';
import '../style/_header.scss';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faMagnifyingGlass,
  faXmark,
  faAngleUp,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from './header/Dropdown';
// import logo from '../images/logo.png';

export default function Header() {
  // 검색창 토글을 위한 state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dispatch = useDispatch();

  //드롭다운
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();

  //페이지 이동시 드롭다운 닫기
  // const closeDropDown = () => {
  //   setDropDown(false);
  // };

  // const handleLinkClick = () => {
  //   closeDropDown();
  // };

  // useEffect(() => {
  //   closeDropDown();
  // }, [location]);

  //페이지 이동 외에 다른곳 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const targetClassList = event.target.classList;
      const isDropDownUl = targetClassList.contains('header_dropdown_ul');
      if (!isDropDownUl && dropDown) {
        setDropDown(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [dropDown]);

  // 검색창 토글 함수
  const toggleSearchWindow = () => {
    setIsSearchOpen(true);
  };

  // 검색창 닫기 함수
  const closeSearchWindow = () => {
    setIsSearchOpen(false);
  };

  // 페이지 이동 시 검색창 닫기
  useEffect(() => {
    closeSearchWindow();
  }, [location.pathname]);

  const navigate = useNavigate();

  //검색창 키워드 랜덤 생성
  const [keyWord, setKeyWord] = useState([]);
  const [index, setIndex] = useState([]);
  useEffect(() => {
    const randomKeyWord = ['신발', '상의', '하의', '모자', '직거래'];
    const randomIndex = [];
    randomKeyWord.map(() => {
      let i = Math.floor(Math.random() * randomKeyWord.length);
      if (randomIndex.length === 0 || !randomIndex.includes(i)) {
        randomIndex.push(i);
      }
    });
    setKeyWord(randomKeyWord);
    setIndex(randomIndex);
  }, []);

  // randomIndex.splice(0, Math.floor(Math.random() * 5));

  // 상품 검색 함수
  const searchInputRef = useRef();
  const searchProduct = async () => {
    if (!searchInputRef.current.value) return alert('검색어를 입력하세요');
    try {
      //최근 검색어 로컬스토리지에 저장
      let getLocal = localStorage.getItem('data');
      if (getLocal === null) {
        getLocal = [];
      } else {
        getLocal = JSON.parse(getLocal);
      }
      getLocal.push(searchInputRef.current.value);
      const uniqueData = [...new Set(getLocal)]; // 검색어 중복된거 제거
      localStorage.setItem('data', JSON.stringify(uniqueData));

      console.log('검색 했니', uniqueData);

      //검색어 params로 붙여서 보내기
      const response = await axios.post(
        `/searchproduct/${searchInputRef.current.value}`,
        {
          params: {
            searchProduct: searchInputRef.current.value,
          },
        },
      );
      console.log(response.data.status);
    } catch (error) {
      console.error(error);
      console.log('검색 잘못되었따');
    }
    // 검색어 입력 필드 초기화
    searchInputRef.current.value = '';
  };

  //엔터키
  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      searchProduct();
    }
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

  // 최근 검색어 삭제 함수
  const deleteRecentSearch = () => {
    window.localStorage.removeItem('data');
    setRecentSearches([]); // 최근 검색어 배열 초기화
  };

  // 키워드 클릭했을때 해당 키워드 이동
  const keywordClick = async (clickedKeyword) => {
    try {
      console.log(clickedKeyword);
      const resKeyWord = await axios.get('/keyword', {
        params: {
          clickedKeyword: clickedKeyword,
        },
      });
      console.log(resKeyWord.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  // 최근 본 상품 가져오기
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const storedRecentlyViewed = JSON.parse(
      localStorage.getItem('recentlyViewed'),
    );
    if (storedRecentlyViewed) {
      setRecentlyViewed(storedRecentlyViewed);
    }
  }, []);

  // 로그인 상태
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      setIsLogin(true); // 로컬 스토리지에 유저 아이디가 있으면 로그인 상태로 변경
    } else {
      setIsLogin(false); // 로컬 스토리지에 유저 아이디가 있으면 로그인 상태로 변경
    }
  }, []);

  // 로그아웃
  const logout = () => {
    sessionStorage.removeItem('userId');
    navigate('/');
    window.location.reload();
  };

  // 스크롤시 헤더 scss 변경
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const handleScroll = () => {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const threshold = 120;
    setIsHeaderScrolled(scrollTop > threshold);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`all_container ${isHeaderScrolled ? 'scrolled' : ''}`}>
        <div className="header_sub_container minMax">
          <div className="header_sub_menu">
            <ul className="header_sub_menu_ul">
              {isLogin ? (
                <>
                  <li className="header_sub_menu_li">
                    <Link onClick={logout}>LOGOUT</Link>
                  </li>
                  <li className="header_sub_menu_li">
                    <Link to="/faq">FAQ</Link>
                  </li>
                  <li className="header_dropdown_menu header_sub_menu_li">
                    <ul
                      className="header_dropdown_ul"
                      onClick={() => {
                        setDropDown(!dropDown);
                      }}
                    >
                      임시텍스트{' '}
                      {dropDown ? (
                        <FontAwesomeIcon
                          icon={faAngleUp}
                          className="dropdown_icon"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faAngleDown}
                          className="dropdown_icon"
                        />
                      )}
                      {dropDown && <Dropdown />}
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="header_sub_menu_li">
                    <Link to="/login">LOGIN</Link>
                  </li>
                  <li className="header_sub_menu_li">
                    <Link to="/register">JOIN</Link>
                  </li>
                  <li className="header_dropdown_menu header_sub_menu_li">
                    <ul
                      className="header_dropdown_ul"
                      onClick={() => {
                        setDropDown(!dropDown);
                      }}
                    >
                      임시텍스트{' '}
                      {dropDown ? (
                        <FontAwesomeIcon
                          icon={faAngleUp}
                          className="dropdown_icon"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faAngleDown}
                          className="dropdown_icon"
                        />
                      )}
                      {dropDown && <Dropdown />}
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="header_main_container minMax">
          <div className="header_main_menu">
            <ul>
              <li>
                <Link to="/all_product">ALL</Link>
              </li>
              <li>
                <Link to="/man_product">MAN</Link>
              </li>
              <li>
                <Link to="/woman_product">WOMAN</Link>
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
                <p>
                  <FontAwesomeIcon
                    icon={faComment}
                    className="header_comment_icon"
                  />
                </p>
              </li>
            </ul>
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
                onKeyPress={onKeyPress}
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
              {index.map((el, idx) => (
                <p key={idx} onClick={() => keywordClick(keyWord[el])}>
                  #{keyWord[el]}
                </p>
              ))}

              {/* 닫기 버튼 */}
              <div className="close" onClick={() => closeSearchWindow()}></div>
            </div>
            <div className="recent-container">
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

                  {recentSearches.length > 0 ? (
                    <button className="delete-recent-search">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={deleteRecentSearch}
                      />
                    </button>
                  ) : (
                    ''
                  )}
                </ul>
              </div>
              {/* 최근 본 상품 */}
              <div className="recent-look-product">
                <p>최근 본 상품</p>
                <ul>
                  {recentlyViewed.length > 0 ? (
                    recentlyViewed.map((product, idx) => (
                      <li key={idx}>{product.itemName}</li>
                    ))
                  ) : (
                    <li>최근 본 상품이 없습니다.</li>
                  )}
                </ul>
                <img></img>
                <img></img>
                <img></img>
                <img></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
