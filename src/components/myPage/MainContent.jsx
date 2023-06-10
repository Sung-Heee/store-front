import React, { useEffect, useState } from 'react';
import { getMain } from '../../apis/mypage';

export default function MainContent() {
  const [itemNewImg, setItemNewImg] = useState();
  const [itemNewTitle, setItemNewTitle] = useState();
  const [itemNewPrice, setItemNewPrice] = useState();

  const [likeItemImg, setLikeItemImg] = useState();
  const [likeItemTitle, setLikeItemTitle] = useState();
  const [likeItemPrice, setLikeItemPrice] = useState();

  const [ingItemImg, setIngItemImg] = useState();
  const [ingItemTitle, setIngItemTitle] = useState();
  const [ingItemPrice, setIngItemPrice] = useState();

  const [endItemImg, setEndItemImg] = useState();
  const [endItemTitle, setEndItemTitle] = useState();
  const [endItemPrice, setEndItemPrice] = useState();

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
      console.log(dbMainInfo[0].item_content);
      setItemNewImg(dbMainInfo[0].item_content);
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
            <li>
              <p>{itemNewImg}</p>
              <p>{itemNewTitle}</p>
              <p>{itemNewPrice}</p>
            </li>
            <li></li>
            <li></li>
            <li></li>
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
