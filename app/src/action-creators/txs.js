import fetch from 'isomorphic-fetch'
import {ALL_TRANSACTIONS, PERSONAL_TXS} from '../constants'
import history from '../history'
import {
  filter,
  propEq,
  prop,
  or,
  reverse,
  sortBy,
  concat
} from "ramda"

const url = process.env.REACT_APP_BASE_URL

export const setAllTransactions = async(dispatch, getState) => {

  console.log("REACT_APP_BASE_URL ", process.env.REACT_APP_BASE_URL)
  const response = await fetch("http://localhost:4000/txs")
    .then(res => res.json())
    .catch(err => console.log('err: ', err));
  if (!response.ok) {
    console.log("the response: ", response)
  }
  const sortByTimeStamp = sortBy(prop('timeStamp'))
  dispatch({
    type: ALL_TRANSACTIONS,
    payload: reverse(sortByTimeStamp(response))
  })
}

export const setPersonalTransactions = user => async(dispatch, getState) => {
  console.log("setPersonalTxs user: ", user)
  const allTxs = getState().allTransactions
  const rec = propEq('recipient', 'user_rcmontgo')
  const sender = propEq('sender', 'user_rcmontgo')
  const sortByTimeStamp = sortBy(prop('timeStamp'));
  const senderTxs = filter(sender, allTxs)

  const recipientTxs = filter(rec, allTxs)
  const personalTxs = concat(senderTxs, recipientTxs)

  console.log("all txs inside setPersonal ", reverse(sortByTimeStamp(personalTxs)))
  dispatch({
    type: PERSONAL_TXS,
    payload: reverse(sortByTimeStamp(personalTxs))
  })
}