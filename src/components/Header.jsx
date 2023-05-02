import React from 'react';
import '../style/_header.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import logo from '../images/logo.png';

export default function Header() {
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
            <img
              src="/images/logo.png"
              alt="로고"
              className="header_logo_img"
            />
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
    </>
  );
}
