import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Like() {
  const [itemLike, setItemsLike] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [checkItems, setCheckItems] = useState(new Set());
  const [isAllChecked, setIsAllChecked] = useState(false);

  const getWishList = async () => {
    try {
      const resLike = await axios.get('/main/allwishlist', {
        params: {
          id: sessionStorage.getItem('userId'),
        },
      });

      const dbLikeInfo = resLike.data;
      const itemIdArr = dbLikeInfo.map((item) => item.itemId);

      const resMyPageWish = await axios.get('/main/mypagewish', {
        params: {
          itemID: itemIdArr.join(','),
        },
      });

      const myPageWish = resMyPageWish.data;

      const itemsPerPage = 4;
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const itemsToShow = myPageWish.slice(startIndex, endIndex);

      setItemsLike(itemsToShow);
      setTotalPages(Math.ceil(myPageWish.length / itemsPerPage));
    } catch (error) {
      console.error(error);
    }
  };

  const checkItemHandler = (id, isChecked) => {
    if (isChecked) {
      setCheckItems((prev) => new Set(prev).add(id));
    } else {
      setCheckItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const checkAllHandler = (isChecked) => {
    if (isChecked) {
      const allItemIDs = itemLike.map((item) => item.itemID);
      setCheckItems(new Set(allItemIDs));
      setIsAllChecked(true);
    } else {
      setCheckItems(new Set());
      setIsAllChecked(false);
    }
  };

  const itemIDs = Array.from(checkItems);

  const cancel = async (e) => {
    const isConfirmed = window.confirm('선택하신 상품을 삭제하시겠습니까?');
    // 선택한 상품의 아이템 ID 배열로 변환
    try {
      if (isConfirmed) {
        if (checkItems.size > 0) {
          console.log(itemIDs);
          const dataToSend = {
            itemIDs: itemIDs,
          };

          // 서버에 데이터 전송
          const resCancel = await axios.post('/cancel', dataToSend);
          // console.log(resCancel.data); // 서버로부터 받은 응답 데이터 확인

          alert('삭제되었습니다 !');
          setCheckItems(new Set());
        } else {
          alert('삭제할 상품이 없습니다.');
        }
      }
    } catch (error) {
      console.log(itemIDs);
      console.error(error);
    }
  };

  const empty = async (e) => {
    const allItemIDs = itemLike.map((item) => item.itemID);
    setCheckItems(new Set(allItemIDs));

    const isConfirmed = window.confirm('관심상품을 비우시겠습니까?');

    try {
      if (isConfirmed) {
        console.log(itemIDs);

        // console.log(checkItems);
        const dataToSend = {
          itemIDs: itemIDs,
        };

        // 서버에 데이터 전송
        const resEmpty = await axios.post('/empty', dataToSend);
        // console.log(resEmpty.data);

        alert('비워졌습니다 !');
      }
    } catch (error) {
      console.log(itemIDs);
      console.error(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const PageNumbers = () => {
    const numbers = [];
    for (let i = 0; i < totalPages; i++) {
      numbers.push(
        <p
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </p>,
      );
    }
    return <div className="page-numbers">{numbers}</div>;
  };

  useEffect(() => {
    getWishList();
  }, [currentPage]);

  useEffect(() => {
    // console.log(checkItems);
    // 모든 체크박스가 선택되어 있는지 확인하고, 상태에 반영
    setIsAllChecked(checkItems.size === itemLike.length);
  }, [checkItems, itemLike]);

  return (
    <>
      <div className="like">
        <div className="content">
          {itemLike.length > 0 ? (
            <div>
              <div className="controller">
                <table border={0}>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onChange={(e) => checkAllHandler(e.target.checked)}
                          checked={isAllChecked}
                        />
                      </th>
                      <th>상품정보</th>
                      <th>상품가격</th>
                      <th>사용자</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemLike.map((item) => (
                      <tr key={item.itemID}>
                        <td>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              checkItemHandler(item.itemID, e.target.checked)
                            }
                            checked={checkItems.has(item.itemID)}
                          />
                        </td>
                        <td>{item.itemTitle}</td>
                        <td>{item.itemPrice}</td>
                        <td>{item.userID}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="like_button">
                <a onClick={cancel}>삭제</a>
                <a onClick={empty}>관심상품 비우기</a>
              </div>
              <PageNumbers />
            </div>
          ) : (
            <p className="msg">관심상품이 없습니다</p>
          )}
        </div>
      </div>
    </>
  );
}
