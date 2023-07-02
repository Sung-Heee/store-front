import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { getLike } from '../../apis/mypage';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

export default function Like() {
  const [itemLike, setItemsLike] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getLikeInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resLike = await getLike(userId);
      const dbLikeInfo = resLike.data;

      const itemsPerPage = 4;
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      console.log(dbLikeInfo);

      let filteredItems = dbLikeInfo;

      const itemsToShow = filteredItems.slice(startIndex, endIndex);

      const renderedItems = itemsToShow.map((item) => (
        <tr key={item.itemId}>
          <th>
            <input type="checkbox"></input>
          </th>
          <th>{item.title}</th>
          <th>{item.price}</th>
          <th>{item.user}</th>
        </tr>
      ));

      setItemsLike(renderedItems);
      setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLikeInfo();
  }, []);

  const PageNumbers = () => {
    const numbers = [];
    for (let i = 0; i < totalPages; i++) {
      numbers.push(
        <p
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </p>,
      );
    }
    return <div className="page-numbers">{numbers}</div>;
  };

  return (
    <>
      <div className="like">
        <div className="content">
          {itemLike.length > 0 ? (
            <table border={0}>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox"></input>
                  </th>
                  <th>상품정보</th>
                  <th>상품가격</th>
                  <th>사용자</th>
                </tr>
              </thead>
              <tbody>{itemLike}</tbody>
            </table>
          ) : (
            <p className="msg">관심상품이 없습니다</p>
          )}

          {itemLike.length > 0 && <PageNumbers />}
        </div>
      </div>
    </>
  );
}
