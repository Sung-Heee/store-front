import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { getLike } from '../../apis/mypage';

export default function Like() {
  const [userTitle, setUserTitle] = useState();
  const [userDate, setUserDate] = useState();
  const [userPrice, setUserPrice] = useState();

  const getLikeInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resLike = await getLike(userId);
      const dbLikeInfo = resLike.data;
      setUserTitle(dbLikeInfo[0].item_title);
      setUserDate(dbLikeInfo[0].item_date);
      setUserPrice(dbLikeInfo[0].item_price);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getLikeInfo();
  }, []);

  return (
    <>
      <div className="like">
        <div className="content">
          <div className="title">관심상품</div>
          <table border={0}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox"></input>
                </th>
                <th>상품정보</th>
                <th>거래일자</th>
                <th>거래금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox"></input>
                </td>
                <td>{userTitle}</td>
                <td>{userDate}</td>
                <td>{userPrice}</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox"></input>
                </td>
                <td>제목</td>
                <td>날자</td>
                <td>금액</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox"></input>
                </td>
                <td>제목</td>
                <td>날자</td>
                <td>금액</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox"></input>
                </td>
                <td>제목</td>
                <td>날자</td>
                <td>금액</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
