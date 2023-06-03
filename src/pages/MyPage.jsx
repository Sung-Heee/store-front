import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../components/myPage/SideBar';
import '../style/myPage.scss';
import { getUser } from '../apis/user';
import Select from 'react-select';
import MainContent from '../components/myPage/MainContent';
import TopBox from '../components/myPage/TopBox';
import LeftBox from '../components/myPage/LeftBox';
import Transction from '../components/myPage/Transction';
import Like from '../components/myPage/Like';
import Update from '../components/myPage/Update';

export default function MyPage() {
  // const [userName, setUserName] = useState();

  // const getUserInfo = async () => {
  //   try {
  //     const userId = sessionStorage.getItem('userId');
  //     const resUser = await getUser(userId);
  //     const dbUserInfo = resUser.data; // 조회된 사용자 정보 반환
  //     setUserName(dbUserInfo.userInfo.userName);
  //     console.log(dbUserInfo);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  return (
    <>
      <div className="all_content">
        <TopBox />
        <div className="bottom_box">
          <LeftBox />
          <div className="right_box">
            <div className="right_controller">
              <MainContent />
              <Transction />
              <Like />
              <Update />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
