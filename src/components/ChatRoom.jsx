import React, { useState, useEffect, useRef } from 'react';
import SockJsClient from 'react-stomp';
import '../style/chatRoom.scss';
import axios from 'axios';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]); // 메시지 목록을 담을 상태 변수
  const [connected, setConnected] = useState(false); // 연결 상태를 담을 상태 변수
  const clientRef = useRef(null); // SockJsClient 컴포넌트의 참조를 담을 변수

  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행될 부수 효과 함수
    fetch('/api/history')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data); // 서버에서 받아온 메시지 목록을 상태에 저장
        }
      });
  }, []);

  const handleSendMessage = (message) => {
    if (connected) {
      // 연결된 상태인 경우에만 메시지를 전송
      const newMessage = {
        user: 'User',
        message: message,
      };
      clientRef.current.sendMessage('/app/message', JSON.stringify(newMessage));
    } else {
      console.log('연결되지 않았습니다.');
    }
  };

  const handleMessageReceive = (message) => {
    // 새로운 메시지를 받았을 때 실행될 콜백 함수
    setMessages((prevMessages) => [...prevMessages, message]); // 새로운 메시지를 상태에 추가
  };

  const handleConnect = () => {
    // WebSocket 연결이 성공했을 때 실행될 콜백 함수
    setConnected(true); // 연결 상태를 true로 설정
  };

  const handleDisconnect = () => {
    // WebSocket 연결이 종료됐을 때 실행될 콜백 함수
    setConnected(false); // 연결 상태를 false로 설정
  };

  //프로필이미지
  const [userImg, setUserImg] = useState();
  const getUserInfo = async () => {
    try {
      const resUser = await axios.get('/user/userInfo', {
        params: {
          userId: sessionStorage.getItem('userId'),
        },
      });
      const dbUserInfo = resUser.data;
      setUserImg(dbUserInfo[0].user_img);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{message.user}: </strong>
          {message.message}
        </div>
      ))}
      {/* 메시지 목록을 반복하여 렌더링 */}

      <form
        className="chat_container"
        onSubmit={(e) => {
          e.preventDefault();
          const message = e.target.elements.message.value;
          handleSendMessage(message);
          e.target.elements.message.value = '';
        }}
      >
        <div className="img_box">
          {userImg ? (
            <img
              className="profile_img"
              src={`/${userImg.replace(
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
        <input type="text" name="message" />
        <button type="submit">전송</button>
      </form>
      {/* 메시지 입력 폼과 전송 버튼을 포함한 폼 요소 */}

      <SockJsClient
        url="http://localhost:8080/chat"
        topics={['/topic/chat']}
        onMessage={handleMessageReceive}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        ref={clientRef}
        debug={false}
      />
      {/* SockJsClient 컴포넌트를 사용하여 WebSocket 통신 설정 */}
    </div>
  );
};

export default ChatRoom;
