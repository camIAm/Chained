import {SINGLE_TX} from '../../constants'
/*
{
"_id": "9bcdd940c2777d4a2b0435c49500698e",
"_rev": "1-f6000b8e7d9f3380a6efa84efab7a86f",
"sender": "user_rcmontgo",
"recipient": "user_miguel_fernandez",
"amount": "10.00",
"currency": "USD",
"description": "Pizza",
"timeStamp": "Wed Oct 18 2017 12:41:34 GMT+0000 (UTC)"
}
*/
const singleTxDefault = {
  sender: "",
  recipient: "",
  amount: "",
  currency: "",
  description: "",
  timeStamp: ""
}
// maybe clear singleTx when leaving receipt view
export const singleTransaction = (state = singleTxDefault, action) => {
  
  switch (action.type) {
    case SINGLE_TX:
      return action.payload
    default:
      return state
  }
}