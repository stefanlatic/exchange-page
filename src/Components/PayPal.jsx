import { useContext } from "react";
import { CURRENCIES } from "../Utils/CurrencyUtil";
import { CurrencyContext, AmountContext } from "../App";

const PayPal = () => {
    
        const currency = useContext(CurrencyContext);
        const amount = useContext(AmountContext);

                return (
                    <>
                    <h1>Exchange office</h1>
                    <p>{currency.currency}, {amount.amount} = {amount.amount * CURRENCIES[currency.currency]} RSD</p>
                </>
                )
}

export default PayPal;