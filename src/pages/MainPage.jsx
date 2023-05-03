import React from 'react';
import '../style/mainPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MainSwiper from '../components/mainPage/MainSwiper';

export default function MainPage() {
  return (
    <>
      <MainSwiper />
      <Link className="view-more">
        자세히 보기
        <FontAwesomeIcon className="view-more-arrow" icon={faArrowRightLong} />
      </Link>

      <div className="top_btn">
        <FontAwesomeIcon className="top_btn_arrow" icon={faChevronUp} />
      </div>
    </>
  );
}
