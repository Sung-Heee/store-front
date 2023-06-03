import React, { useEffect, useState } from 'react';
import { UserName, getUser } from '../../apis/user';

export default function TopBox() {
  // const [userName, setUserName] = useState();

  // const UserNameInfo = async () => {
  //   try {
  //     const userId = sessionStorage.getItem('userId');
  //     const resUser = await UserName(userId);
  //     const dbUserInfo = resUser.data; // 조회된 사용자 정보 반환
  //     setUserName(dbUserInfo.userInfo.userName);
  //     console.log(dbUserInfo);
  //   } catch (error) {
  //     console.error('error');
  //   }
  // };

  // useEffect(() => {
  //   UserNameInfo();
  // }, []);
  const [userName, setUserName] = useState();

  const getUserInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resUser = await getUser(userId);
      const dbUserInfo = resUser.data; // 조회된 사용자 정보 반환
      setUserName(dbUserInfo[0].userName);
      // console.log(dbUserInfo[0].userName);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="top_box">
        <div className="top_left">
          <div className="img_box"></div>
        </div>
        <div className="top_right">
          <div className="member_name">
            <strong>
              <span className="m_name">{userName}</span>님
            </strong>
          </div>
          <ul className="order">
            <li>
              <li>판매 중</li>
              <strong>
                <li>0</li>
              </strong>
            </li>
            <li>
              <li>판매 완료</li>
              <strong>
                <li>0</li>
              </strong>
            </li>
            <li>
              <li>관심 상품</li>
              <strong>
                <li>0</li>
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}