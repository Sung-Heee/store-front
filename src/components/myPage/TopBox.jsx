import React, { useEffect, useState } from 'react';
import { getUser } from '../../apis/user';
import '../../style/mypage/topbox.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';

export default function TopBox() {
  const [userName, setUserName] = useState();

  const getUserInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resUser = await getUser(userId);
      const dbUserInfo = resUser.data; // 조회된 사용자 정보 반환
      setUserName(dbUserInfo[0].user_name);
      // console.log(dbUserInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="top_container">
        <div className="top_box minMax">
          <div className="top_left">
            <div>
              <img
                className="img_box"
                src="C:\Users\user\OneDrive\바탕 화면\store-front\src\img\프로필사진.png"
                alt="이미지사진"
              />
            </div>
          </div>
          <div className="top_right">
            <div className="member_name">
              <strong>
                <span className="m_name">{userName}</span>
              </strong>
              <span className="store_name">님</span>
            </div>
            <div className="user_store_controller">
              <div className="user_store">
                <Link to="/user_store">
                  내 상점으로 이동
                  <FontAwesomeIcon icon={faStore} className="store_icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
