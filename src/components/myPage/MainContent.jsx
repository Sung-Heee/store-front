import React, { useEffect, useState } from 'react';
import { getMain } from '../../apis/mypage';

export default function MainContent() {
  const [itemNewList, setItemNewList] = useState([]);
  const [itemLikeList, setItemLikeList] = useState([]);
  const [itemIngList, setItemIngList] = useState([]);
  const [itemEndList, setItemEndList] = useState([]);

  const getMaininfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resUser = await getMain(userId);
      const dbMainInfo = resUser.data;

      // if (Array.isArray(resUser.data) && resUser.data.length > 0) {
      //   // 데이터가 있는 경우에만 처리
      //   dbMainInfo;
      //   console.log(dbMainInfo);
      // } else {
      //   // 데이터가 없는 경우 처리
      //   console.log('데이터가 없습니다.');
      // }
      // dbMainInfo에 4개의 데이터만 넣어둠
      setItemNewList(dbMainInfo.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMaininfo();
  }, []);

  return (
    <>
      <div className="main_content">
        <div className="content">
          <div className="title">최근 거래상품</div>
          {/* {/* <p className="msg">최근 거래 내역이 없습니다</p>  */}
          <ul>
            {itemNewList.length > 0 ? (
              itemNewList.map((item, index) => (
                <li key={index}>
                  <p>이미지 {item.item_content}</p>
                  <p>이름 {item.item_title}</p>
                  <p>가격 {item.item_price}</p>
                </li>
              ))
            ) : (
              <p className="msg">최근 거래 내역이 없습니다</p>
            )}
          </ul>
        </div>
        <div className="content">
          <div className="title">관심상품</div>
          <p className="msg">관심상품이 없습니다</p>
        </div>
        <div className="content">
          <div className="title">판매 중</div>
          <p className="msg">판매 중인 상품이 없습니다</p>
        </div>
        <div className="content">
          <div className="title">판매 완료</div>
          <p className="msg">판매 완료된 상품이 없습니다</p>
        </div>
      </div>
    </>
  );
}
