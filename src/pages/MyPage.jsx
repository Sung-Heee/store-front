import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../components/myPage/SideBar';
import '../style/myPage.scss';
import MainContent from '../components/myPage/MainContent';
import TopBox from '../components/myPage/TopBox';
import Transction from '../components/myPage/Transction';
import Like from '../components/myPage/Like';
import Update from '../components/myPage/Update';
import Ready from '../components/myPage/Ready';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('main');

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

  return (
    <>
      <div className="all_content">
        <TopBox />
        <div className="bottom_box">
          <div className="left_box">
            <div className="left_controller">
              <div className="my_page">
                <span onClick={() => handleTabClick('main')}>MY PAGE</span>
              </div>

              <ul className="first_ul">
                <li className="first_li">나의 거래 정보</li>
                <li>
                  <a onClick={() => handleTabClick('transaction')}>거래내역</a>
                </li>
                <li>
                  <a onClick={() => handleTabClick('like')}>관심상품</a>
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
                <MainContent />
              </div>
              <div className={getClassName('transaction')}>
                <Transction />
              </div>
              <div className={getClassName('like')}>
                <Like />
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
    </>
  );
}
