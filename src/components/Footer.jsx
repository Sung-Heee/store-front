import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../style/_footer.scss';

export default function Footer() {
  const [testing, setTesting] = useState([]);

  const showName = async () => {
    console.log('sd');
    try {
      const resShowName = await axios.get('/api/test');
      console.log(resShowName.data);
    } catch (error) {
      console.error(error);
      console.log('testing 실패');
    }
  };

  useEffect(() => {
    showName();
  }, []);

  return <div>Footer</div>;
}
