import axios from 'axios';

export const showItems = async () => {
  try {
    const resItems = await axios.get('/main/showItems');
    return resItems;
  } catch (error) {
    console.error(error);
  }
};

export const saleItems = async (saleItemInfo) => {
  try {
    const resSale = await axios.post('/main/sale', saleItemInfo);
    return resSale;
  } catch (error) {
    console.error(error);
  }
};
