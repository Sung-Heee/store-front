import React from 'react';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import '../../style/userStore/ready.scss';

export default function Ready() {
  return (
    <>
      <div className="ready_controller">
        <BsFillEmojiSmileFill size={70} className="emo" />
        <p className="msg">준비 중 입니다</p>
      </div>
    </>
  );
}
