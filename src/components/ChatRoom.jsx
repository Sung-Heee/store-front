import React, { useState, useEffect, useRef } from 'react';
import SockJsClient from 'react-stomp';
import '../style/chatRoom.scss';
import axios from 'axios';

const ChatRoom = ({ sellerID }) => {
  const [messages, setMessages] = useState([]); // 메시지 목록을 담을 상태 변수
  const [connected, setConnected] = useState(false); // 연결 상태를 담을 상태 변수
  const [userImg, setUserImg] = useState();
  const clientRef = useRef(null); // SockJsClient 컴포넌트의 참조를 담을 변수

  useEffect(() => {
    const getData = async () => {
      try {
        const userResponse = await axios.get('/user/userInfo', {
          params: {
            userId: sessionStorage.getItem('userId'),
          },
        });
        const dbUserInfo = userResponse.data;
        // 프로필 이미지
        setUserImg(dbUserInfo[0].user_img);

        // 채팅 정보 가져오기
        // 채팅 받는 사람 아이디 = 판매자 아이디
        const messageResponse = await axios.get('/chat/messages', {
          params: {
            sellerId: sellerID,
          },
        });
        const dbMessages = messageResponse.data;
        setMessages(dbMessages);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const handleSendMessage = (message) => {
    // connected로 현재 웹소켓 연결 상태를 확인
    if (connected) {
      // 사용자 ID와 입력된 메시지를 담은 newMessage 객체를 생성
      const newMessage = {
        userId: sessionStorage.getItem('userId'),
        message: message,
      };
      // 서버로 메시지를 전송
      // '/app/message'는 백엔드에서 웹소켓 메시지를 처리하는 엔드포인트 주소
      // newMessage 객체를 JSON 문자열로 변환하여 전송
      clientRef.current.sendMessage('/app/message', JSON.stringify(newMessage));
    } else {
      console.log('WebSocket 연결되지 않았습니다.');
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
        <input type="text" name="message" autoComplete="off" />
        <button type="submit">전송</button>
      </form>
      {/* 메시지 입력 폼과 전송 버튼을 포함한 폼 요소 */}

      <SockJsClient
        url="/chat"
        topics={['/topic/chat']}
        onMessage={handleMessageReceive} // 메시지 수신
        onConnect={handleConnect} // 연결 성공
        onDisconnect={handleDisconnect} // 연결 종료
        ref={clientRef}
        debug={false}
      />
      {/* SockJsClient 컴포넌트를 사용하여 WebSocket 통신 설정 */}

      {/* url 속성을 통해 웹소켓 서버의 주소를 설정 */}
      {/* topics 속성은 구독할 웹소켓 토픽(topic)을 설정하고 클라이언트가 메시지를 수신하고자 하는 대상을 지정하는데 사용 */}
      {/* /topic/chat 토픽을 구독하겠다는 의미 */}
    </div>
  );
};

export default ChatRoom;
