import { useEffect, useState } from 'react';
import './App.css';
import Payment from './Components/Payment';
import { CURRENCIES } from './Utils/CurrencyUtil';
import { createContext } from 'react';
import { useReducer } from 'react';
import {userReducer, initialUserState, loadUserState} from "./Reducers/Users"

export const CurrencyContext = createContext("EURO");
export const AmountContext = createContext(0);

const App = () => {

  const [userState, dispatch] = useReducer(userReducer, loadUserState());

  const [currency, setCurrency] = useState("EURO");
  const [amount, setAmount] = useState(0);
  

  const enterCurrency = (currency) => {
      setCurrency(currency);
  }
  const enterAmount = (value) => {
    setAmount(value);
}
const saveUser = () => {
    if (userState.username === null || userState.username.trim()==='' || userState.money === null || isNaN(userState.money)) {
      return;
    }  
    dispatch({type:"SET_USER_CREATED", payload:true })
  }
    useEffect(() => {
      if(userState.isUserCreated) {
        localStorage.setItem("userState", JSON.stringify(userState));
      }
    }, [userState])

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
    <input onInput={e => enterAmount(e.target.value)} type='number'></input><br></br>
   {!userState.isUserCreated &&
    <form>
    <input placeholder="Enter your username"onInput={e => dispatch({type:"SET_USERNAME", payload:e.target.value})}></input><br></br>
      <input placeholder="Enter your sum"onInput={e =>  dispatch({type:"SET_MONEY", payload:e.target.value})}></input><br></br>
      <button type='button' onClick={saveUser}>Create User</button>
    </form>
}
   </>
  );
}

export default App;
