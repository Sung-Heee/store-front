import React, { useEffect, useState } from 'react';
import '../../style/userStore/storeTop.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function TopBox({ totalIngItems, totalEndItems }) {
  const [userName, setUserName] = useState();
  const [userImg, setUserImg] = useState();

  const getUserInfo = async () => {
    try {
      const resUser = await axios.get('/user/userInfo', {
        params: {
          userId: sessionStorage.getItem('userId'),
        },
      });
      const dbUserInfo = resUser.data;
      setUserName(dbUserInfo[0].user_name);
      setUserImg(dbUserInfo[0].user_img);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(totalEndItems);
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="top_container">
        <div className="top_box minMax">
          <div className="top_left">
            <div className="img_box">
              {userImg ? (
                <img
                  className="profile_img"
                  src={`/${userImg.replace(
                    /.*[\\/]profile_image[\\/]/,
                    'profile_image/',
                  )}`}
                  alt="프로필사진"
                />
              ) : (
                <img
                  className="profile_img"
                  src={`/images/profile.png`}
                  alt="프로필사진"
                />
              )}
            </div>
          </div>
          <div className="top_right">
            <div className="member_name">
              <strong>
                <span className="m_name">{userName}</span>
              </strong>
              <span className="store_name">의 상점</span>
              <div className="user_store">
                <Link to="/sale">
                  상품등록
                  <FontAwesomeIcon icon={faPlus} className="store_icon" />
                </Link>
              </div>
            </div>
            <div className="order_controller">
              <ul className="order">
                <li>
                  <li>판매중</li>
                  <strong>
                    <li>{totalIngItems}</li>
                  </strong>
                </li>
                <li>
                  <li>판매완료</li>
                  <strong>
                    <li>{totalEndItems}</li>
                  </strong>
                </li>
                <li>
                  <li>후기</li>
                  <strong>
                    <li>0</li>
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
