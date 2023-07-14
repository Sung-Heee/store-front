import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { getLike } from '../../apis/mypage';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import axios from 'axios';

export default function Like() {
  const [itemLike, setItemsLike] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getWishList = async () => {
    try {
      const resLike = await axios.get('/main/allwishlist', {
        params: {
          id: sessionStorage.getItem('userId'),
        },
      });

      const dbLikeInfo = resLike.data;

      // 로그인한 유저가 위시리스트에 담은 itemId가 들어있는 배열
      const itemIdArr = dbLikeInfo.map((item) => item.itemId);

      const resMyPageWish = await axios.get('/main/mypagewish', {
        params: {
          itemID: itemIdArr.join(','),
        },
      });

      const myPageWish = resMyPageWish.data;
      console.log(myPageWish);

      const itemsPerPage = 4;
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const itemsToShow = myPageWish.slice(startIndex, endIndex);

      const renderedItems = itemsToShow.map((item) => (
        <tr key={item.itemID}>
          <th>
            <input type="checkbox"></input>
          </th>
          <th>{item.itemTitle}</th>
          <th>{item.itemPrice}</th>
          <th>{item.userID}</th>
        </tr>
      ));
      setItemsLike(renderedItems);
      setTotalPages(Math.ceil(myPageWish.length / itemsPerPage));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWishList();
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
