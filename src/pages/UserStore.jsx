import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../components/myPage/SideBar';
import '../style/userStore.scss';
import TopBox from '../components/userStore/TopBox';
import Ready from '../components/userStore/Ready';
import Footer from '../components/Footer';
import ScrollReset from '../components/ScrollReset';
import TopBtn from '../components/TopBtn';
import BottomBtn from '../components/BottomBtn';
import Ing from '../components/userStore/Ing';
import End from '../components/userStore/End';
import { getMain } from '../apis/mypage';

export default function UserStore() {
  const [activeTab, setActiveTab] = useState('main');
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);
  const [totalIngItems, setTotalIngItems] = useState(0);
  const [totalEndItems, setTotalEndItems] = useState(0);
  const [dbIngInfo, setdbIngInfo] = useState([]);

  const getIngInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resIng = await getMain(userId);
      const dbIngInfo = resIng.data;
      setdbIngInfo(dbIngInfo);

      const filteredItems = dbIngInfo.filter((item) => item.status === 0);
      setTotalIngItems(filteredItems.length);
      const filteredEndItems = dbIngInfo.filter((item) => item.status === 1);
      console.log(filteredEndItems);
      console.log(filteredEndItems.length);
      setTotalEndItems(filteredEndItems.length);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getIngInfo();
  }, []);

  const handleScroll = () => {
    if (ScrollY > 350) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  };

  // useEffect(() => {
  //   const scrollListener = () => {
  //     window.addEventListener('scroll', handleScroll);
  //   }; //  window 에서 스크롤을 감시 시작
  //   scrollListener(); // window 에서 스크롤을 감시
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   }; //  window 에서 스크롤을 감시를 종료
  // });

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
  // const leftControllerClassName = `left_controller ${
  //   ScrollActive ? 'fix' : ''
  // }`;
  return (
    <>
      <ScrollReset />
      <div className="all_content">
        <TopBox totalIngItems={totalIngItems} totalEndItems={totalEndItems} />
        <div className="bottom_box">
          <div className="left_box">
            <div className="left_controller">
              <div className="my_page">
                <span>STORE</span>
              </div>
              <ul className="first_ul">
                <li className="first_li">판매정보</li>
                <li>
                  <a onClick={() => handleTabClick('main')}>판매중</a>
                </li>
                <li>
                  <a onClick={() => handleTabClick('main')}>판매완료</a>
                </li>
              </ul>
              <ul>
                <li className="first_li">거래후기(임시)</li>
                <li>
                  <a onClick={() => handleTabClick('ready')}>후기</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="right_box">
            <div className="right_controller">
              <div className={getClassName('main')}>
                <div className="content">
                  <Ing totalIngItems={totalIngItems} />
                </div>
                <div className="content">
                  <End totalEndItems={totalEndItems} />
                </div>
              </div>
              <div className={getClassName('ready')}>
                <div className="content">
                  <div className="title">거래후기</div>
                </div>
                <Ready />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TopBtn />
      <BottomBtn />
      {/* <Footer /> */}
    </>
  );
}
