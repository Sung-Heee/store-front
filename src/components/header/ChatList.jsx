import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ChatList() {
  const [chatList, setChatList] = useState([]);

  const getChatList = async () => {
    try {
      const response = await axios.get('/chat/request');
      setChatList(response.data); // 데이터를 저장
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChatList();
  }, []);

  // 하다가 아니면 다 지워도 돼 !!!
  return (
    <div className="chat_list_container">
      ChatList
      <ul>
        {chatList.map((list, index) => (
          <li key={index}>{list.userId}</li>
        ))}
      </ul>
    </div>
  );
}
