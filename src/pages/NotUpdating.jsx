import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../style/notUpdating.scss';
import { Link, useNavigate } from 'react-router-dom';

export default function NotUpdating() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };
  return (
    <>
      <div className="not_updating">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          size="4x"
          style={{ color: '#2d2f45' }}
        />
        <p>준비중인 서비스입니다.</p>
        <div className="not_updating_btn">
          <Link to="/" className="home_btn">
            HOME
          </Link>
          <Link to="" onClick={goBack} className="return_btn">
            RETURN
          </Link>
        </div>
      </div>
    </>
  );
}
