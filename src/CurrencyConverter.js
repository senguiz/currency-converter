import React, { useState, useEffect } from 'react';
import { getExchangeRates } from '../api/exchangeRates';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getExchangeRates(fromCurrency);
      if (data) {
        setExchangeRate(data.conversion_rates[toCurrency]);
        setCurrencies(Object.keys(data.conversion_rates)); 
      }
    }
    fetchData();
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    return (amount * exchangeRate).toFixed(2);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <span> to </span>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <h2>Converted Amount: {exchangeRate ? handleConvert() : 'Loading...'}</h2>
    </div>
  );
};

export default CurrencyConverter;
