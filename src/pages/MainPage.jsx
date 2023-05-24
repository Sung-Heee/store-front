import React from 'react';
import '../style/mainPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MainSwiper from '../components/mainPage/MainSwiper';
import NewItems from '../components/mainPage/NewItems';
import Category from '../components/mainPage/Category';
import { useSelector } from 'react-redux';

export default function MainPage() {
  const userId = useSelector((state) => state.user.userID);
  console.log(userId);
  return (
    <>
      <MainSwiper />
      <Link className="view-more">
        자세히 보기
        <FontAwesomeIcon className="view-more-arrow" icon={faArrowRightLong} />
      </Link>

      <NewItems />
      <Category />

      <div className="top_btn">
        <FontAwesomeIcon className="top_btn_arrow" icon={faChevronUp} />
      </div>
    </>
  );
}
