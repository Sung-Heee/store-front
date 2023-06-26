import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../components/myPage/SideBar';
import '../style/myPage.scss';
import TopBox from '../components/myPage/TopBox';
import Transction from '../components/myPage/Transction';
import Like from '../components/myPage/Like';
import Update from '../components/myPage/Update';
import Ready from '../components/myPage/Ready';
import BottomBtn from '../components/BottomBtn';
import TopBtn from '../components/TopBtn';
import ScrollReset from '../components/ScrollReset';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('main');
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);

  const handleScroll = () => {
    if (ScrollY > 350) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  // console.log(ScrollY);
  // console.log(ScrollActive);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getClassName = (tab) => {
    if (tab === activeTab) {
      return '';
    } else {
      return 'off';
    }
  };
  const leftControllerClassName = `left_controller ${
    ScrollActive ? 'fix' : ''
  }`;
  return (
    <>
      <ScrollReset />
      <div className="all_content">
        <TopBox />
        <div className="bottom_box">
          <div className="left_box">
            <div className="left_controller">
              <div className="my_page">
                <span>MY PAGE</span>
              </div>
              <ul className="first_ul">
                <li className="first_li">나의 거래 정보</li>
                <li
                  onClick={() => {
                    window.scrollTo({
                      top: 350,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <a onClick={() => handleTabClick('main')}>거래내역</a>
                </li>
                <li
                  onClick={() => {
                    window.scrollTo({
                      top: 750,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <a onClick={() => handleTabClick('main')}>관심상품</a>
                </li>
              </ul>
              <ul>
                <li className="first_li">회원정보</li>
                <li>
                  <a onClick={() => handleTabClick('update')}>회원 정보 수정</a>
                </li>
              </ul>
              <ul>
                <li className="first_li">고객센터</li>
                <li>
                  <a onClick={() => handleTabClick('ready1')}>1:1 문의</a>
                </li>
                <li>
                  <a onClick={() => handleTabClick('ready2')}>공지사항</a>
                </li>
                <li>
                  <a onClick={() => handleTabClick('ready3')}>이용안내</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="right_box">
            <div className="right_controller">
              <div className={getClassName('main')}>
                <div className="content">
                  <div className="title">거래내역</div>
                  <Transction />
                </div>
                <div className="content">
                  <div className="title">관심상품</div>
                  <Like />
                </div>
              </div>
              <div className={getClassName('update')}>
                <Update />
              </div>
              <div className={getClassName('ready1')}>
                <div className="content">
                  <div className="title">1:1 문의</div>
                </div>
                <Ready />
              </div>
              <div className={getClassName('ready2')}>
                <div className="content">
                  <div className="title">공지사항</div>
                </div>
                <Ready />
              </div>
              <div className={getClassName('ready3')}>
                <div className="content">
                  <div className="title">이용안내</div>
                </div>
                <Ready />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TopBtn />
      <BottomBtn />
    </>
  );
}
