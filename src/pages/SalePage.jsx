import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRef } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Hashtag from '../components/Hashtag';
import '../style/sale.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saleItems } from '../apis/item';
import Address from '../components/Address';
import DaumPostcode from 'react-daum-postcode';

export default function SalePage(props) {
  const genderOptions = [
    { value: 'all', label: 'all' },
    { value: 'man', label: 'man' },
    { value: 'woman', label: 'woman' },
  ];
  const cateArr = [
    { value: '상의', label: '상의' },
    { value: '하의', label: '하의' },
    { value: '신발', label: '신발' },
    { value: '악세사리', label: '악세사리' },
    { value: '기타', label: '기타' },
  ];
  const cateOptions = {
    all: cateArr,
    man: cateArr,
    woman: cateArr,
  };

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCate, setSelectedCate] = useState(null);

  //라디오버튼 클릭
  const [selectedRadio, setSelectedRadio] = useState('중고');
  const [selectedRadio_ex, setSelectedRadio_ex] = useState('가능');

  const userId = sessionStorage.getItem('userId');

  const saleTitleInput = useRef();
  const itemNameInput = useRef();
  const itemPriceInput = useRef();
  const saleTagInput = useRef();
  const editorTextInput = useRef();
  const navigate = useNavigate();
  const addressText = useRef();

  const saveSale = async (e) => {
    e.preventDefault();
    const data = editorTextInput.current.editor.getData();

    if (
      !saleTitleInput.current.value ||
      !itemNameInput.current.value ||
      !itemPriceInput.current.value ||
      !data ||
      !selectedCate ||
      !addressText.current.innerText
    )
      return alert('내용을 입력하세요');

    const cateObject = {
      gender: selectedGender.value,
      cate: selectedCate.value,
    };
    var tag = '';
    tagList.map((el) => {
      tag += String(el + ' ');
    });

    console.log(tag);
    console.log(cateObject);
    console.log(saleTitleInput.current.value);
    console.log(itemNameInput.current.value);
    console.log(itemPriceInput.current.value);
    console.log(tagList[0]);
    console.log('사용자', userId);
    console.log(selectedRadio);
    console.log(selectedRadio_ex);
    console.log(addressText.current.innerText);

    const saleItemInfo = {
      id: userId,
      gender: cateObject.gender,
      categories: cateObject.cate,
      saleTitle: saleTitleInput.current.value,
      itemName: itemNameInput.current.value,
      itemPrice: itemPriceInput.current.value,
      saleTag: tag,
      editorText: data,
      state: selectedRadio,
      exchange: selectedRadio_ex,
      address: addressText.current.innerText,
    };

    // 이미지 전송
    const formData = new FormData();
    showImages.forEach((image) => {
      formData.append('images', image);
    });

    // FormData 객체의 키-값 쌍 출력
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const resSale = await saleItems(saleItemInfo, formData);

      const message = resSale.data.message;
      if (resSale.data.status === '200') {
        alert(message); // 작성완
      } else {
        return alert(message); // 작성실패
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  const cancleSale = async () => {
    if (window.confirm('작성취소')) {
      navigate('/');
    }
  };

  // hashtag
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);

  const onKeyPress = (e) => {
    if (
      e.target.value.length !== 0 &&
      e.key === 'Enter' &&
      !e.target.value.includes(' ')
    ) {
      submitTagItem();
    } else if (e.target.value.includes(' ')) {
      alert('띄어쓰기 x');
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    setTagList(updatedTagList);
    setTagItem('');
    if (
      (!updatedTagList.includes(tagItem) && updatedTagList.length < 10) ||
      updatedTagList.length === 0
    ) {
      updatedTagList.push(tagItem);
    } else if (updatedTagList.length === 10) {
      alert('10개 이상 x');
    } else if (updatedTagList.includes(tagItem)) {
      alert('중복 x');
    }
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem,
    );
    setTagList(filteredTagList);
  };

  const handleChange = (e) => {
    var data = editorTextInput.current.editor.getData({
      removePlugins: 'Paragraph',
      enterMode: 'br',
      entities: false,
      basicEntities: false,
    });
    // const realData = data.split('p');
    console.log(data);
    // var result = data.substr(4, data.length - 4);
    // console.log(result);
  };

  // 이미지 첨부파일
  const [showImages, setShowImages] = useState([]);
  const inputImg = useRef(null);

  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 6) {
      imageUrlLists = imageUrlLists.slice(0, 6);
    }

    setShowImages(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  //주소 토글
  const [showPostcode, setShowPostcode] = useState(false);
  const [fullAddress, setFullAddress] = useState('');

  const handleComplete = (data) => {
    let formattedAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      formattedAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setFullAddress(formattedAddress);
    setShowPostcode(false);
  };

  const handleInputClick = () => {
    setShowPostcode(true);
  };

  const handleCloseClick = () => {
    setShowPostcode(false);
  };

  //숫자만 입력
  const [price, setPrice] = useState('');

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/,/g, ''); // 쉼표 제거
    const regex = /^[0-9\b]+$/; // 숫자만 허용하는 정규식

    if (
      numericValue === '' ||
      (regex.test(numericValue) && numericValue.length <= 9)
    ) {
      const formattedValue = Number(numericValue).toLocaleString(); // 쉼표 추가
      setPrice(formattedValue);
    }
  };

  return (
    <>
      <div className="form_wrapper minMax">
        <div className="gender_cate_input">
          <Select
            className="gender_select_input"
            options={genderOptions}
            value={selectedGender}
            onChange={setSelectedGender}
            placeholder="Select a gender"
            // ref={genderInput}
            theme={(theme) => ({
              ...theme,
              borderRadius: 10,
              colors: {
                ...theme.colors,
                primary25: '#f4f6ff',
                primary: '#3d435f',
              },
            })}
          />
          {selectedGender && (
            <Select
              className="cate_select_input"
              options={cateOptions[selectedGender.value]}
              value={selectedCate}
              onChange={setSelectedCate}
              placeholder="Select an category"
              // ref={itemCateInput}
              theme={(theme) => ({
                ...theme,
                borderRadius: 10,
                colors: {
                  ...theme.colors,
                  primary25: '#f4f6ff',
                  primary: '#3d435f',
                },
              })}
            />
          )}
        </div>
        <input
          className="title_input"
          type="text"
          placeholder="제목"
          ref={saleTitleInput}
        />
        <div className="item">
          <p>상품명 : </p>
          <input className="item_input" type="text" ref={itemNameInput} />
        </div>
        <div className="price">
          <p>가격 : </p>
          <input
            className="price_input"
            type="text"
            ref={itemPriceInput}
            value={price}
            onChange={handlePriceChange}
          />
          {/* <p className="price_text">원</p> */}
        </div>
        <div className="radio_container">
          <div className="state_container">
            <p>상품상태 : </p>
            <input
              id="radio_used"
              type="radio"
              name="state"
              value="used"
              checked={selectedRadio === '중고'}
              onChange={() => setSelectedRadio('중고')}
            />
            <label
              htmlFor="radio_used"
              className={selectedRadio === '중고' ? 'state_checked_radio' : ''}
            >
              중고
            </label>
            <input
              id="radio_new"
              type="radio"
              name="state"
              value="new"
              checked={selectedRadio === '새상품'}
              onChange={() => setSelectedRadio('새상품')}
            />
            <label
              htmlFor="radio_new"
              className={
                selectedRadio === '새상품' ? 'state_checked_radio' : ''
              }
            >
              새상품
            </label>
          </div>
          <div className="exchange_container">
            <p>환불 : </p>
            <input
              id="radio_possible"
              type="radio"
              name="state"
              value="possible"
              checked={selectedRadio_ex === '가능'}
              onChange={() => setSelectedRadio_ex('가능')}
            />
            <label
              htmlFor="radio_possible"
              className={
                selectedRadio_ex === '가능' ? 'exchange_checked_radio' : ''
              }
            >
              가능
            </label>
            <input
              id="radio_impossible"
              type="radio"
              name="state"
              value="impossible"
              checked={selectedRadio_ex === '불가'}
              onChange={() => setSelectedRadio_ex('불가')}
            />
            <label
              htmlFor="radio_impossible"
              className={
                selectedRadio_ex === '불가' ? 'exchange_checked_radio' : ''
              }
            >
              불가
            </label>
          </div>
        </div>
        {/* 주소 */}
        <div className="address_container">
          <div className="address_search">
            <p className="address_show" ref={addressText}>
              {fullAddress}
            </p>
            <button onClick={handleInputClick}>주소검색</button>
          </div>
          {showPostcode && (
            <div className="address_api">
              <DaumPostcode
                style={{ height: '444px', borderRadius: '5px' }}
                onComplete={handleComplete}
                {...props}
              />
              <button onClick={handleCloseClick} className="address_hide">
                닫기
              </button>
            </div>
          )}
        </div>
        {/* hashtag */}
        <div className="WholeBox">
          <div className="TagBox">
            {tagList.map((tagItem, index) => {
              return (
                <div className="TagItem" key={index}>
                  <span ref={saleTagInput}>{tagItem}</span>
                  <button className="TagBtn" onClick={deleteTagItem}>
                    x
                  </button>
                </div>
              );
            })}
            <input
              className="TagInput"
              type="text"
              placeholder="태그입력 후 ENTER"
              tabIndex={2}
              onChange={(e) => setTagItem(e.target.value)}
              value={tagItem}
              onKeyPress={onKeyPress}
            />
          </div>
        </div>
        {/* 이미지 첨부 */}
        <div className="attachment">
          <label
            htmlFor="input-file"
            onChange={handleAddImages}
            className="attach_img_iunput"
          >
            <input type="file" id="input-file" ref={inputImg} />
            {/* <Plus/> */}
            <svg
              fill="#3d435f"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="plus_icon"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            <p className="plus_text">최대 6 장</p>
          </label>

          {/*화면에 이미지 출력 */}
          {showImages.map((image, id) => (
            <div key={id} className="x_container">
              {/* <Delete/> */}
              <svg
                onClick={() => handleDeleteImage(id)}
                className="delete_icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#3d435f"
              >
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
              </svg>
              <div key={id} className="img_container">
                <img
                  src={image}
                  alt={`${image}-${id}`}
                  style={{ height: '150px' }}
                />
              </div>
            </div>
          ))}
        </div>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onChange={handleChange}
          ref={editorTextInput}
        />
      </div>
      <div className="salebar">
        <div className="salebar_btn">
          <button className="salepage_cancel" onClick={cancleSale}>
            취소
          </button>
          <button className="salepage_save" type="submit" onClick={saveSale}>
            저장
          </button>
        </div>
      </div>
    </>
  );
}
