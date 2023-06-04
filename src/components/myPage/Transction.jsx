import React, { useState, useEffect } from 'react';
import { getItem } from '../../apis/mypage';

export default function Transction() {
  const [userTitle, setUserTitle] = useState();
  const [userDate, setUserDate] = useState();
  const [userPrice, setUserPrice] = useState();
  const [userState, setUserState] = useState();

  const getItemInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resItem = await getItem(userId);
      const dbresItemInfo = resItem.data;
      setUserTitle(dbresItemInfo[0].item_title);
      setUserDate(dbresItemInfo[0].item_date);
      setUserPrice(dbresItemInfo[0].item_price);
      setUserPrice(dbresItemInfo[0].item_state);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getItemInfo();
  }, []);

  return (
    <>
      <div className="transaction off">
        <div className="content">
          <div className="title">거래 내역 조회</div>
          <table border={0}>
            <thead>
              <th>상품정보</th>
              <th>거래일자</th>
              <th>거래금액</th>
              <th>
                <select>
                  <option selected>상태</option>
                  <option>판매중</option>
                  <option>판매완료</option>
                </select>
              </th>
            </thead>
            <tbody>
              <tr>
                <td>{userTitle}</td>
                <td>{userDate}</td>
                <td>{userPrice}</td>
                <td>{userState}</td>
              </tr>
              <tr>
                <td>내용</td>
                <td>날자</td>
                <td>금액</td>
                <td>판매완료</td>
              </tr>
              <tr>
                <td>내용</td>
                <td>날자</td>
                <td>금액</td>
                <td>판매중</td>
              </tr>
              <tr>
                <td>내용</td>
                <td>날자</td>
                <td>금액</td>
                <td>판매중</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
