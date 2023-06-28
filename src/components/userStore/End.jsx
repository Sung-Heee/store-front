import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { getLike } from '../../apis/mypage';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { getMain } from '../../apis/mypage';

export default function Ing() {
  const [items, setItems] = useState([]);
  const [customerId, setCustomerId] = useState();

  const getEndInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resEnd = await getMain(userId);
      const dbEndInfo = resEnd.data;

      const renderedItems = dbEndInfo
        .filter((item) => item.item_status === 1)
        .map((item) => (
          <tr key={item.itemId}>
            <td>{item.item_title}</td>
            <td>{item.item_date}</td>
            <td>{item.item_title}</td>
          </tr>
        ));

      setItems(renderedItems);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEndInfo();
  }, []);

  return (
    <>
      <div className="like">
        <div className="content">
          <table border={0}>
            <thead>
              <tr>
                <th>상품정보</th>
                <th>거래일자</th>
                <th>거래금액</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>

          <div className="button">
            <GoChevronLeft size={50} className="btn" />
            <GoChevronRight size={50} className="btn" />
          </div>
        </div>
      </div>
    </>
  );
}
