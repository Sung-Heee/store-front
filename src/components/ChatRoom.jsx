import React, { useState, useEffect, useRef } from 'react';
import SockJsClient from 'react-stomp';
import '../style/chatRoom.scss';
import axios from 'axios';
import CryptoJS, { SHA256 } from 'crypto-js';

const ChatRoom = ({ sellerID, itemID, senderID }) => {
  const [messages, setMessages] = useState([]); // 메시지 목록을 담을 상태 변수
  const [connected, setConnected] = useState(false); // 연결 상태를 담을 상태 변수
  const [userImg, setUserImg] = useState();
  const [userNickName, setUserNickName] = useState();
  const [roomId, setRoomId] = useState(null); // 채팅방 식별자를 담을 상태 변수
  const clientRef = useRef(null); // SockJsClient 컴포넌트의 참조를 담을 변수
  const container_scroll = useRef();

  // 아이디 암호화
  const aes128Encode = (secretKey, Iv, data) => {
    const cipher = CryptoJS.AES.encrypt(
      data,
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: CryptoJS.enc.Utf8.parse(Iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      },
    );
    return cipher.toString();
  };

  const senderIdEncode = aes128Encode(
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_EMAIL_AES_SECRET_KEY,
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_AES_SECRET_IV,
    senderID,
  );

  useEffect(() => {
    const getData = async () => {
      try {
        // 채팅방 생성 또는 입장 요청
        const response = await axios.post('/chat/room', {
          senderId:
            senderID == null
              ? sessionStorage.getItem('userId').split('/')[0]
              : senderIdEncode.split('/')[0],
          itemId: itemID,
        });
        setRoomId(response.data.roomId);
        console.log(roomId);

        const userResponse = await axios.get('/user/userInfo', {
          params: {
            userId: sessionStorage.getItem('userId'),
          },
        });
        const dbUserInfo = userResponse.data;

        setUserImg(dbUserInfo[0].user_img);
        setUserNickName(dbUserInfo[0].user_nickname);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [itemID]);

  useEffect(() => {
    // 새로운 메시지가 추가될 때마다 스크롤을 아래로 이동
    if (container_scroll.current) {
      container_scroll.current.scrollTop =
        container_scroll.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (message) => {
    // connected로 현재 웹소켓 연결 상태를 확인
    if (connected) {
      // 사용자 ID와 입력된 메시지를 담은 newMessage 객체를 생성
      const newMessage = {
        userId: userNickName,
        message: message,
        userProfile: userImg,
      };
      // 서버로 메시지를 전송
      console.log('웹소캣이 연결되었습니다.');

      clientRef.current.sendMessage(
        `/app/message/${roomId}`,
        JSON.stringify(newMessage),
      );
    } else {
      console.log('WebSocket 연결되지 않았습니다.');
    }
  };

  const handleMessageReceive = (message) => {
    // 새로운 메시지를 받았을 때 실행될 콜백 함수
    console.log('메시지:', message);
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

  return (
    <div className="chat_container">
      <div className="chat_message_container" ref={container_scroll}>
        {messages.map((message, index) => (
          <div
            className={message.userId === userNickName ? 'me' : 'you'}
            key={index}
          >
            <div className="user_profile">
              {/* <strong>{message.userId}</strong> */}
              {message.userProfile ? (
                <img
                  className="profile_img"
                  src={`/${message.userProfile.replace(
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
            <div className="chat_content">
              <p className="message">{message.message}</p>
            </div>
          </div>
        ))}
        {/* 메시지 목록을 반복하여 렌더링 */}
      </div>
      <form
        className="chat_form"
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
        <input type="text" name="message" autoComplete="off" />
        <button type="submit">전송</button>
      </form>
      {/* 메시지 입력 폼과 전송 버튼을 포함한 폼 요소 */}
      {roomId && ( // roomId가 존재할 때만 WebSocket을 연결
        <SockJsClient
          url="http://localhost:8080/ws"
          topics={[`/topic/chat/${roomId}`]} // 채팅방별로 토픽을 구분
          onMessage={handleMessageReceive} // 메시지 수신
          onConnect={handleConnect} // 연결 성공
          onDisconnect={handleDisconnect} // 연결 종료
          ref={clientRef}
          debug={false}
        />
      )}
      {/* SockJsClient 컴포넌트를 사용하여 WebSocket 통신 설정 */}
    </div>
  );
};

export default ChatRoom;
