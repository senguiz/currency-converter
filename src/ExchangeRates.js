import axios from 'axios';

const API_KEY = 'f9db03f08ae6078aaea4b03a'; 
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

export const getExchangeRates = async (baseCurrency) => {
  
  try {
    const response = await axios.get(`${BASE_URL}/${baseCurrency}`);
    return response.data;
  } 
  catch (error) {
    console.error("API error:", error);
  }
};
