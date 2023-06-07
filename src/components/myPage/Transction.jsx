import React, { useState, useEffect } from 'react';
import { getMain } from '../../apis/mypage';

export default function Transction() {
  const [items, setItems] = useState();

  const getItemInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resItem = await getMain(userId);
      const dbresItemInfo = resItem.data;

      console.log(dbresItemInfo);

      const items = dbresItemInfo.map((item) => (
        <tr key={item.itemId}>
          <td>{item.item_title}</td>
          <td>{item.item_content}</td>
          <td>{item.item_price}</td>
          <td>{item.item_status}</td>
        </tr>
      ));

      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getItemInfo();
  }, []);

  return (
    <>
      <div className="transaction ">
        <div className="content">
          <div className="title">거래 내역 조회</div>
          <table border={0}>
            <thead>
              <tr>
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
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
