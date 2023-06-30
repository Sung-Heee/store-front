import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { getLike } from '../../apis/mypage';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { getMain } from '../../apis/mypage';

export default function Ing() {
  const [items, setItems] = useState([]);

  const getIngInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resIng = await getMain(userId);
      const dbIngInfo = resIng.data;
      console.log(dbIngInfo);
      const renderedItems = dbIngInfo
        .filter((item) => item.status === 0)
        .map((item) => (
          <tr key={item.itemId}>
            <td>
              <input type="checkbox"></input>
            </td>
            <td>{item.item_title}</td>
            <td>{item.item_price}</td>
          </tr>
        ));

      setItems(renderedItems);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getIngInfo();
  }, []);

  return (
    <>
      <div className="like">
        <div className="content">
          <div className="title">
            판매중
            <div className="ok_btn">확인</div>
          </div>
          <table border={0}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox"></input>
                </th>
                <th>상품정보</th>
                <th>거래금액</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
