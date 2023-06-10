import React, { useEffect, useState } from 'react';
import { getUser } from '../../apis/user';
import '../../style/mypage/topbox.scss';

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
            <div className="img_box"></div>
          </div>
          <div className="top_right">
            <div className="member_name">
              <strong>
                <span className="m_name">{userName}</span>님
              </strong>
            </div>
            <div className="order_controller">
              <ul className="order">
                <li>
                  <li>판매중</li>
                  <strong>
                    <li>0</li>
                  </strong>
                </li>
                <li>
                  <li>판매완료</li>
                  <strong>
                    <li>0</li>
                  </strong>
                </li>
                <li>
                  <li>관심상품</li>
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
