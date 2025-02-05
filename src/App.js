import { useState } from 'react';
import './App.css';
import Payment from './Components/Payment';
import { CURRENCIES } from './Utils/CurrencyUtil';
import { createContext } from 'react';

export const CurrencyContext = createContext("EURO");
export const AmountContext = createContext(0);

const App = () => {

  const [currency, setCurrency] = useState("EURO");
  const [amount, setAmount] = useState(0);

  const enterCurrency = () => {
      setCurrency("EURO");
  }
  const enterAmount = (value) => {
    setAmount(value);
}

  return (
   <>

   <CurrencyContext.Provider value={{currency, enterCurrency}}>
      <AmountContext.Provider value={{amount, enterAmount}}>
      <Payment />
      </AmountContext.Provider>
    </CurrencyContext.Provider>

  
    <select onChange={e => enterCurrency(e.target.value)}>
      {Object.keys(CURRENCIES).map (currency => (
        <option key={currency} value={currency}>{currency}</option>
      ))}
    </select>
    <input onInput={e => enterAmount(e.target.value)} type='number'></input>
 
      

   </>
  );
}

export default App;
