import axios from 'axios';

export const showItems = async () => {
  try {
    const resItems = await axios.get('/main/showItems');
    return resItems;
  } catch (error) {
    console.error(error);
  }
};

export const saleItems = async (saleItemInfo, formData) => {
  try {
    formData.append('data', JSON.stringify(saleItemInfo));
    const resSale = await axios.post('/main/sale', formData);
    return resSale;
  } catch (error) {
    console.error(error);
  }
};
