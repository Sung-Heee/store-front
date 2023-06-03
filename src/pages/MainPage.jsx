import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MainSwiper from '../components/mainPage/MainSwiper';
import NewItems from '../components/mainPage/NewItems';
import Category from '../components/mainPage/Category';
import TopBtn from '../components/TopBtn';
import BottomBtn from '../components/BottomBtn';
import Footer from '../components/Footer';
import '../style/mainPage.scss';

export default function MainPage() {
  return (
    <>
      <MainSwiper />
      {/* <Link className="view-more">
        자세히 보기
        <FontAwesomeIcon className="view-more-arrow" icon={faArrowRightLong} />
      </Link> */}

      <NewItems />
      <Category />
      <TopBtn />
      <BottomBtn />
      <Footer />
    </>
  );
}
