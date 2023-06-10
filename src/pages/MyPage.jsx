import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../components/myPage/SideBar';
import '../style/myPage.scss';
import MainContent from '../components/myPage/MainContent';
import TopBox from '../components/myPage/TopBox';
import LeftBox from '../components/myPage/LeftBox';
import Transction from '../components/myPage/Transction';
import Like from '../components/myPage/Like';
import Update from '../components/myPage/Update';

export default function MyPage() {
  return (
    <>
      <div className="all_content">
        <TopBox />
        <div className="bottom_box">
          <LeftBox />
          <div className="right_box">
            <div className="right_controller">
              <div className="off">
                <MainContent />
              </div>
              <div className="off">
                <Transction />
              </div>
              <div className="off">
                <Like />
              </div>
              <div className="">
                <Update />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
