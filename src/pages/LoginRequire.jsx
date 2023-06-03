import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../style/loginRequire.scss';
import { Link } from 'react-router-dom';

export default function LoginRequire() {
  return (
    <>
      <div className="login_require">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          size="4x"
          style={{ color: '#2d2f45' }}
        />
        <p>로그인이 필요한 서비스입니다.</p>
        <div className="login_require_btn">
          <Link to="/login" className="login_require">
            LOGIN
          </Link>
          <Link to="/register" className="join_require">
            JOIN
          </Link>
        </div>
      </div>
    </>
  );
}
