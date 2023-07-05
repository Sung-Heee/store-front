import React, { useEffect, useRef, useState } from 'react';
import '../../style/mypage/topbox.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { FaPencilAlt } from 'react-icons/fa';
import { Profile } from '../../apis/mypage';
import axios from 'axios';

export default function TopBox() {
  const [userName, setUserName] = useState();
  const [userImg, setUserImg] = useState();
  const [imageFiles, setImageFiles] = useState([]);
  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const resProfile = await axios.post('/user/profile', formData, {
        params: {
          id: sessionStorage.getItem('userId'),
        },
      });
      const message = resProfile.data.message;
      if (resProfile.data.status === '200') {
        alert(message);
        location.reload();
      } else {
        return alert(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateProfile();
  }, [imageFiles]);

  const getUserInfo = async () => {
    try {
      const resUser = await axios.get('/user/userInfo', {
        params: {
          userId: sessionStorage.getItem('userId'),
        },
      });
      const dbUserInfo = resUser.data;
      setUserName(dbUserInfo[0].user_name);
      setUserImg(dbUserInfo[0].user_img);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="top_container">
        <div className="top_box minMax">
          <div className="top_left">
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
            <div className="edit">
              <input
                type="file"
                style={{ display: 'none' }}
                ref={imageInput}
                onChange={handleImageUpload}
              />

              <FaPencilAlt
                onClick={onClickImageUpload}
                className="pencil_icon"
              />
            </div>
          </div>
          <div className="top_right">
            <div className="member_name">
              <strong>
                <span className="m_name">{userName}</span>
              </strong>
              <span className="store_name">님</span>
            </div>
            <div className="user_store_controller">
              <div className="user_store">
                <Link to="/user_store">
                  내 상점으로 이동
                  <FontAwesomeIcon icon={faStore} className="store_icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
