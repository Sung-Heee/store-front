import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import '../style/address.scss';

export default function Address(props) {
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
    console.log(formattedAddress);
  };

  const handleInputClick = () => {
    setShowPostcode(true);
  };

  return (
    <>
      <div className="address_container">
        <div className="address_search">
          <p className="address_show">{fullAddress}</p>
          <button onClick={handleInputClick}>주소검색</button>
        </div>

        {showPostcode && (
          <DaumPostcode onComplete={handleComplete} {...props} />
        )}
      </div>
    </>
  );
}
