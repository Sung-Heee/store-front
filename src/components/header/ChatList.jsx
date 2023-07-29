import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/chatList.scss';
import ChatRoom from '../ChatRoom';
import { Link } from 'react-router-dom';
export default function ChatList() {
  const [selectedChat, setSelectedChat] = useState(); // 선택한 채팅 정보
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  // const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [chatRequestData, setChatRequestData] = useState([]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setIsChatListOpen(false);
  };

  const chatRequest = async () => {
    const userId = sessionStorage.getItem('userId');
    // 로그인 안 하면 X
    if (!userId) {
      return;
    }

    try {
      const resChatReq = await axios.get('/chat/request', {
        params: { sellerID: userId },
      });

      const chatReqData = resChatReq.data;
      setChatRequestData(chatReqData);

      console.log(chatReqData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    chatRequest();
  }, [isChatListOpen]);

  // 맨 위에서부터 최근 알림
  const reverseChatRequestData = [...chatRequestData].reverse();

  return (
    <>
      {isChatListOpen && (
        <div className="chat_list_container">
          <ul>
            {reverseChatRequestData.length === 0 ? (
              <div className="chat_list_empty_div">
                <p>채팅 요청이 없습니다.</p>
              </div>
            ) : (
              reverseChatRequestData.map((list) => (
                <Link
                  to={`/productdetails/${list.item_id}`}
                  state={{
                    isChatModalOpen_seller: true,
                    sender_id: list.sender_id,
                  }}
                  className="chat_list_div"
                  key={list.chat_id}
                  onClick={() => handleChatClick(list)}
                >
                  <div className="img_box">
                    {list.user_img ? (
                      <img
                        className="profile_img"
                        src={`/${list.user_img.replace(
                          /.*[\\/]profile_image[\\/]/,
                          'profile_image/',
                        )}`}
                        alt="프로필사진"
                      />
                    ) : (
                      <img
                        className="profile_img"
                        src={`/images/profile.png`}
                        alt="프로필사진"
                      />
                    )}
                  </div>
                  <div className="chat_list">
                    {' '}
                    <li className="chat_sender_id">
                      <strong>{list.user_nickname}</strong>
                    </li>
                    <li className="chat_message">
                      &quot;{list.item_title}&quot;에 대한 채팅요청입니다.
                    </li>
                  </div>
                </Link>
              ))
            )}
          </ul>
        </div>
      )}
    </>
  );
}
